'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    gtag: any;
  }
}

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
    
    // Enable Google Analytics and Ads after consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
    
    // Reload page to initialize ads
    router.refresh();
  };

  const declineCookies = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p className="font-medium">Cookie & Iklan</p>
          <p>Kami menggunakan cookie dan layanan iklan pihak ketiga untuk meningkatkan pengalaman Anda dan menampilkan iklan yang relevan.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={declineCookies}
            className="text-white border-white hover:bg-white/10"
          >
            Tolak
          </Button>
          <Button 
            onClick={acceptCookies}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Terima
          </Button>
        </div>
      </div>
    </div>
  );
}