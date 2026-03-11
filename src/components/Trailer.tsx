import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { Box, Image } from '@mantine/core';
import car from '../assets/cyber_limo.png';
import styles from './Trailer.module.scss';

export default function Trailer() {
  const { tl } = useTimeline();
  const ref = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!tl) return;

      const localTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          // end: 'bottom top',
          // end: '+=1600',
          scrub: 3,
          // pin: true,
        },
      });

      localTl
        .to(ref.current, {
          scale: 0.3,
          opacity: 1,
          // y: '5vh',
          rotate: 180,
          duration: 3,
        })
        .to(ref.current, {
          y: '20vh',
          duration: 1,
        })
        // .to(ref.current, {
        //   rotate: 0,
        //   duration: 3,
        // })
        .to(ref.current, {
          y: '-30vh',
          // rotate: -180,
          duration: 1,
        });
    },
    {
      scope: containerRef,
      dependencies: [tl],
    },
  );

  return (
    <Box ref={containerRef} className={styles.container}>
      <Image ref={ref} src={car} className={styles.car} />
    </Box>
  );
}
