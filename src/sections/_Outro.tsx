import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { Container } from '@mantine/core';
import CreditRoll from '../components/CreditRoll';
import styles from './Outro.module.scss';

export default function OutroSection() {
  const { tl } = useTimeline();
  const rollRef = useRef<HTMLElement>(null);
  const containerRef = useRef(null);
  const ch = 'var(--creditroll-height)';
  // const ch = 720;

  useGSAP(
    () => {
      // if (!tl) return;
      const el = rollRef.current;
      if (!tl || !el) return;

      const eh = el.offsetHeight;

      const localTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center 70%',
          end: 'top bottom',
        },
        repeat: -1,
      });

      localTl
        .set(el, { y: 0, opacity: 1 }) // initial reset
        .to(el, {
          // y: ch - eh,
          y: `calc(${ch} - ${eh}px)`, // distance to move up (container height - content height)
          duration: 15, // rolling speed
          ease: 'none',
          delay: 1, // pose befor starting
        })
        .to(
          el,
          {
            opacity: 0,
            duration: 1, // fade out
          },
          '+=0.5', // pose before next
        )
        .set(el, { y: 0 }) // rewind to start point
        .to(el, {
          opacity: 1,
          duration: 1, // fade in
        });
    },
    {
      scope: containerRef,
      dependencies: [tl],
    },
  );

  return (
    <Container
      id="outro"
      className={styles.container}
      component="section"
      ref={containerRef}
      h={ch}
    >
      <CreditRoll ref={rollRef} />
    </Container>
  );
}
