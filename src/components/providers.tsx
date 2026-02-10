"use client";

import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ConsentBanner } from './ConsentBanner';

declare global {
  interface Window {
    adsbygoogle: any[];
    gtag: any;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
            onError: (error: any) => {
                if (error?.response?.status === 429 || error?.status === 429) {
                    toast.error("Terlalu Cepat!", {
                        description: "Mohon tunggu sebentar sebelum request lagi.",
                        duration: 5000,
                    });
                }
            },
        }),
        defaultOptions: {
          queries: {
            // staleTime: 60 * 1000, // sebelumnya cuma ini sendiri
            staleTime: 5 * 60 * 1000, // Increased to 5 mins
            refetchOnWindowFocus: false, // Disable auto refresh on focus
            refetchOnMount: false, // Disable auto refresh on mount
            refetchOnReconnect: false, // Disable auto refresh on network reconnect
          },
        },
      })
  );

  useEffect(() => {
    const loadAds = () => {
      const consent = localStorage.getItem('cookie_consent');
      if (consent === 'accepted') {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error('Google AdSense error:', err);
        }
      }
    };

    // Load ads when consent is given
    const handleConsentChange = () => {
      loadAds();
    };

    // Listen for consent changes
    window.addEventListener('storage', handleConsentChange);

    return () => {
      window.removeEventListener('storage', handleConsentChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          {children}
          <ConsentBanner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
