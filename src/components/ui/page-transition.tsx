'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingSpinner } from './loading-spinner';

export const PageTransition: React.FC = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loading when route changes
    setIsLoading(true);
    
    // Hide loading after content has time to render
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <LoadingSpinner size="xl" variant="primary" text="Carregando página..." />
      </div>
    </div>
  );
}; 