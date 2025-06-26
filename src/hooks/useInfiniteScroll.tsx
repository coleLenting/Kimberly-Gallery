
import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Trigger when user is 300px from bottom for smoother experience
    if (scrollHeight - scrollTop - clientHeight > 300 || isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    callback();
  }, [callback, isLoading, hasMore]);

  useEffect(() => {
    if (isLoading) {
      // Wait for new content to load, then stop loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  return isLoading;
};
