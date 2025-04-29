'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        setShowBanner(false);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // If localStorage is not available, we'll show the banner
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookieConsent', 'accepted');
    } catch (error) {
      console.error('Error setting cookie consent:', error);
    }
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('cookieConsent', 'declined');
    } catch (error) {
      console.error('Error setting cookie consent:', error);
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="text-sm"
          >
            Decline
          </Button>
          <Button
            onClick={handleAccept}
            className="text-sm"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
} 