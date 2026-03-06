/**
 *  src/contexts/TimelineContext.tsx
 *  Aggregating Types, Contexts, Providers, and Hooks
 */

import React, { createContext, useContext, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// 1. Type declaration
interface TimelineContextType {
  tl: gsap.core.Timeline | null;
}

const TimelineContext = createContext<TimelineContextType | undefined>(
  undefined,
);

// 2. Provider component
export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Creating a Master Timeline (where you can manage all ScrollTriggers)
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: '#page-root', // Container of whole page
        start: 'top top',
        end: '+=3000', // scroll length
        scrub: true,
        pin: false,
      },
    });
    setTimeline(master);
  });

  return (
    <TimelineContext.Provider value={{ tl: timeline }}>
      {children}
    </TimelineContext.Provider>
  );
};

// 3. Custom hook to reuse
export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
};
