import { useRef } from 'react';
import { useViewportSize } from '@mantine/hooks';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { useCareers } from '../hooks/useCareers';
import { Box, Flex } from '@mantine/core';
import { RecursiveCareer } from '../components/RecursiveCareer';
import styles from './Horizon.module.scss';

export default function HorizonSection() {
  const { width: vw } = useViewportSize();
  const { tl } = useTimeline();
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);
  const careers = useCareers();
  const count = careers.filter((career) => career.title).length;
  const subw = vw < 768 ? vw : 640;
  const tankw = count * subw;
  const shift = vw - tankw;
  const currentFromY = careers.find((career) => career.toY === -1)?.fromY;

  useGSAP(
    () => {
      if (!tl) return;

      const localTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: 0.6,
          pin: true,
        },
      });

      localTl.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: shift,
          ease: 'none',
        },
      );
    },
    {
      scope: triggerRef,
      dependencies: [tl],
    },
  );

  return (
    <Box id="horizon" component="section" ref={triggerRef}>
      <div className={styles.liner}>
        <Flex
          ref={sectionRef}
          className={styles.tanker}
          style={{ width: tankw }}
        >
          {careers.map((career, index) => (
            <RecursiveCareer
              key={index}
              career={career}
              currentFromY={currentFromY}
            />
          ))}
        </Flex>
      </div>
    </Box>
  );
}
