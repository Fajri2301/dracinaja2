'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoAdProps {
  bookId: string;
  currentEpisode: number;
  totalEpisodes: number;
  onAdComplete: () => void;
  onAdSkip?: () => void;
  showAd: boolean;
  onClose: () => void;
}

export function VideoAd({
  bookId,
  currentEpisode,
  totalEpisodes,
  onAdComplete,
  onAdSkip,
  showAd,
  onClose
}: VideoAdProps) {
  const [skipAvailable, setSkipAvailable] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown before skip becomes available
  const [adProgress, setAdProgress] = useState(0); // Progress of the ad (0-100)
  const adTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Simulate ad playback
  useEffect(() => {
    if (!showAd) {
      // Cleanup timers when ad is not shown
      if (adTimerRef.current) clearInterval(adTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      return;
    }

    // Reset state when ad starts
    setSkipAvailable(false);
    setCountdown(5);
    setAdProgress(0);

    // Start countdown to enable skip button
    countdownTimerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            setSkipAvailable(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate ad progress
    adTimerRef.current = setInterval(() => {
      setAdProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          if (adTimerRef.current) clearInterval(adTimerRef.current);
          onAdComplete();
          return 100;
        }
        return newProgress;
      });
    }, 100); // Ad completes in 10 seconds (100 * 100ms)

    // Cleanup on unmount or when ad finishes
    return () => {
      if (adTimerRef.current) clearInterval(adTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [showAd, onAdComplete]);

  // Check if ad should be shown based on episode number
  const shouldShowAd = () => {
    // Show ad every 10 episodes, but not on the last episode
    if (currentEpisode >= totalEpisodes) return false;
    
    // Check if this episode number is divisible by 10
    return currentEpisode % 10 === 0 && currentEpisode !== 0;
  };

  if (!showAd || !shouldShowAd()) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <div className="w-full h-full max-w-4xl max-h-4xl flex flex-col items-center justify-center relative">
        {/* Simulated Ad Content */}
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="text-white text-center">
            <div className="text-2xl font-bold mb-4">Iklan Video</div>
            <div className="text-lg mb-8">Menonton iklan membantu kami menyediakan konten gratis</div>
            
            {/* Ad Progress Bar */}
            <div className="w-64 h-1.5 bg-gray-700 rounded-full mb-8 mx-auto overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-100 ease-linear" 
                style={{ width: `${adProgress}%` }}
              />
            </div>
            
            {/* Skip Button - Following Google AdSense policy: visible after 5 seconds */}
            <div className="mt-8">
              {skipAvailable ? (
                <button
                  onClick={() => {
                    if (onAdSkip) onAdSkip();
                    else onAdComplete();
                  }}
                  className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors border border-white/30"
                >
                  Lewati Iklan
                </button>
              ) : (
                <div className="text-white/70">
                  Lewati iklan dalam {countdown}s
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Close Button - Only for emergency, not primary skip method */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-xl"
        >
          ✕
        </button>
        
        {/* Episode Info */}
        <div className="absolute bottom-4 left-4 text-white/70 text-sm">
          Episode {currentEpisode} dari {totalEpisodes}
        </div>
      </div>
    </div>
  );
}