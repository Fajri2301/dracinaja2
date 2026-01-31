import { NextRequest, NextResponse } from "next/server"; 
import https from "https";
import http from "http";

// Create a custom agent to ignore SSL errors (reused if needed)
const agent = new https.Agent({
  rejectUnauthorized: false
});

// Helper to fetch using native modules (ignores SSL errors, follows redirects)
function insecureFetch(url: string, headers: any, redirectCount = 5): Promise<{ buffer: Buffer; headers: any; status: number; statusText: string; url: string }> {
  return new Promise((resolve, reject) => {
    if (redirectCount <= 0) {
        return reject(new Error("Too many redirects"));
    }

    const isHttp = url.startsWith("http:");
    const requestModule = isHttp ? http : https;
    
    // Parse URL to ensure options work for both modules
    // http.request(url, options...) works in Node 10+
    
    const options = {
        headers: headers,
        rejectUnauthorized: false, 
        method: 'GET'
    };

    const req = requestModule.request(url, options, (res) => {
        // Handle Redirects (301, 302, 303, 307, 308)
        if (res.statusCode && [301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
             const newUrl = new URL(res.headers.location, url).href;
             res.resume(); // Consume/discard response data to free 'socket'
             return resolve(insecureFetch(newUrl, headers, redirectCount - 1));
        }

        const chunks: any[] = [];
        res.on('data', (d) => chunks.push(d));
        res.on('end', () => {
            resolve({
                buffer: Buffer.concat(chunks),
                headers: res.headers,
                status: res.statusCode || 200,
                statusText: res.statusMessage || "",
                url: url // This is the final URL after redirects
            });
        });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
}

export async function GET(req: NextRequest) {
  const urlParams = req.nextUrl.searchParams;
  const url = urlParams.get("url");

  if (!url) {
    return new NextResponse("Missing URL parameter", { status: 400 });
  }

  try {
    const range = req.headers.get("range");
    const headers: any = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "*/*",
      "Referer": new URL(url).origin + "/", 
      "Origin": new URL(url).origin,
    };

    if (range) {
      headers["Range"] = range;
    }

    // Use native request helper
    const response = await insecureFetch(url, headers);

    if (response.status >= 400) {
       console.error(`Proxy fetch failed for ${url}: ${response.status} ${response.statusText}`);
       return new NextResponse(`Upstream Error: ${response.statusText}`, { status: response.status });
    }

    const buffer = response.buffer;
    const decoder = new TextDecoder();
    
    // Safety check small buffer
    const firstChunk = decoder.decode(buffer.slice(0, 100)); 
    const looksLikeLiveStream = firstChunk.includes("#EXTM3U");
    const looksLikeVtt = firstChunk.includes("WEBVTT");

    const contentType = (response.headers['content-type'] || "").toLowerCase();
    const lowUrl = url.toLowerCase();
    const isM3u8 = looksLikeLiveStream || 
                   contentType.includes("application/vnd.apple.mpegurl") || 
                   contentType.includes("application/x-mpegurl") ||
                   lowUrl.includes(".m3u8");

    if (isM3u8) {
      const text = decoder.decode(buffer);
      const baseUrl = new URL(response.url); // Use final URL
    // Determine valid origin from request headers (critical for VPS/Reverse Proxy)
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || "https"; 
    const origin = `${proto}://${host}`;

      const subUrl = urlParams.get("sub");
      const isMasterPlaylist = text.includes("#EXT-X-STREAM-INF");

      let rewritten = text.split(/\r?\n/).map(line => {
        const trimmed = line.trim();
        if (!trimmed) return line;

        if (trimmed.startsWith('#')) {
            return line.replace(/URI="([^"]+)"/g, (match, uri) => {
                 try {
                     const absoluteUrl = new URL(uri, baseUrl.href).href;
                     return `URI="${origin}/api/proxy/video?url=${encodeURIComponent(absoluteUrl)}"`;
                 } catch (e) {
                     return match;
                 }
            });
        }
        
        try {
          const absoluteUrl = new URL(trimmed, baseUrl.href).href;
          return `${origin}/api/proxy/video?url=${encodeURIComponent(absoluteUrl)}`;
        } catch (e) {
          return line;
        }
      }).join('\n');

      if (isMasterPlaylist && subUrl) {
          const proxiedSubUrl = `${origin}/api/proxy/video?url=${encodeURIComponent(subUrl)}`;
          const mediaLine = `#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="Indonesia",DEFAULT=YES,AUTOSELECT=YES,LANGUAGE="id",URI="${proxiedSubUrl}"`;
          rewritten = rewritten.replace("#EXTM3U", "#EXTM3U\n" + mediaLine);
          rewritten = rewritten.replace(/#EXT-X-STREAM-INF:(.*)/g, (match, attrs) => {
               if (attrs.includes("SUBTITLES=")) return match; 
               return `#EXT-X-STREAM-INF:${attrs},SUBTITLES="subs"`;
          });
      }

      return new NextResponse(rewritten, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        }
      });
    }

    // VTT / SRT Logic
    const isSrt = lowUrl.includes(".srt");

    if (looksLikeVtt || isSrt) {
       let vttContent = decoder.decode(buffer);
       
       if (isSrt && !looksLikeVtt) {
           vttContent = vttContent.replace(/\r\n/g, '\n');
           vttContent = vttContent.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
           if (!vttContent.trim().startsWith("WEBVTT")) {
               vttContent = "WEBVTT\n\n" + vttContent;
           }
       }
       
       // Force subtitle position via VTT line setting (line:70% for fit)
       vttContent = vttContent.replace(
           /((?:\d{2}:)?\d{2}:\d{2}\.\d{3} --> (?:\d{2}:)?\d{2}:\d{2}\.\d{3})(.*)/g, 
           (match, time, rest) => {
               if (rest.includes("line:")) return match; 
               return `${time} line:75%${rest}`;
           }
       );

       return new NextResponse(vttContent, {
         status: 200,
         headers: {
           "Content-Type": "text/vtt",
           "Access-Control-Allow-Origin": "*",
           "Cache-Control": "no-store",
         }
       });
    }

    // Binary / Segment content
    return new NextResponse(buffer as any, {
        status: response.status,
        statusText: response.statusText,
        headers: {
            // @ts-ignore
            "Content-Type": contentType || "video/mp4",
            "Access-Control-Allow-Origin": "*",
            "Accept-Ranges": "bytes",
            "Content-Length": String(buffer.byteLength),
        }
    });

  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
