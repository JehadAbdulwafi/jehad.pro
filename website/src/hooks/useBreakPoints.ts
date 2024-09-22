import React, { useState, useEffect } from 'react';

const useBreakPoints = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 568px)');
    const ipadQuery = window.matchMedia('(min-width: 569px)');
    const desktopQuery = window.matchMedia('(min-width: 769px)');

    // Define the event handlers
    const handleMobileQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    const handleIpadQueryChange = (event) => {
      setIsTablet(event.matches);
    };
    const handleDesktopQueryChange = (event) => {
      setIsDesktop(event.matches);
    };

    // Add event listeners only if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      setIsMobile(mediaQuery.matches);
      setIsTablet(ipadQuery.matches);
      setIsDesktop(desktopQuery.matches);

      mediaQuery.addEventListener('change', handleMobileQueryChange);
      ipadQuery.addEventListener('change', handleIpadQueryChange);
      desktopQuery.addEventListener('change', handleDesktopQueryChange);
    }

    // Clean up event listeners
    return () => {
      mediaQuery.removeEventListener('change', handleMobileQueryChange);
      ipadQuery.removeEventListener('change', handleIpadQueryChange);
      desktopQuery.removeEventListener('change', handleDesktopQueryChange);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useBreakPoints;