'use client';

import { useEffect, useState } from 'react';

interface GoogleAdProps {
  slot: string;
  format?: string;
  responsive?: string;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function GoogleAd({ 
  slot, 
  format = 'auto', 
  responsive = 'true',
  style,
  className 
}: GoogleAdProps) {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    // Check for cookie consent
    const cookieConsent = localStorage.getItem('cookie_consent');
    setConsent(cookieConsent);
    
    // Initialize ads if consent is given
    if (cookieConsent === 'accepted') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('Google AdSense error:', err);
      }
    }
  }, []);

  // Don't render ad if no consent or declined
  if (consent !== 'accepted') {
    return null;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-7772944871292494'} // Anda perlu menambahkan ID AdSense Anda di .env.local
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}