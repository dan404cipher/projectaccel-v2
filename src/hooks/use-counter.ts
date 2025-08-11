import { useState, useEffect } from 'react';

interface UseCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
}

export const useCounter = ({ end, start = 0, duration = 2000, delay = 0 }: UseCounterProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const difference = end - start;

      const updateCounter = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(start + difference * easeOutQuart);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setCount(end);
        }
      };

      updateCounter();
    }, delay);

    return () => clearTimeout(timer);
  }, [end, start, duration, delay]);

  return count;
};
