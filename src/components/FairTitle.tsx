import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { Center, Title } from '@mantine/core';

interface FairTitleProps {
  children: React.ReactNode;
  scopeRef: React.RefObject<HTMLElement | null>;
}

export default function FairTitle({ children, scopeRef }: FairTitleProps) {
  const { tl } = useTimeline();
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!tl) return;

      const localTl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      });

      localTl.from(ref.current, {
        y: 72,
        opacity: 0,
        duration: 3,
        ease: 'power2.out',
      });
    },
    {
      scope: scopeRef,
      dependencies: [tl],
    },
  );

  return (
    <Center py="xl">
      <Title ref={ref} order={2} size={36}>
        {children}
      </Title>
    </Center>
  );
}
