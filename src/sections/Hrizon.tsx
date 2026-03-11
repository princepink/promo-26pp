import { useRef } from 'react';
import { useViewportSize } from '@mantine/hooks';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Title, Text } from '@mantine/core';
import styles from './Horizon.module.scss';

export default function HorizonSection() {
  const { width: vw } = useViewportSize();
  const { tl } = useTimeline();
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);
  const { t } = useTranslation();
  // Pre-translate all Vistas - to loop the array of contents
  const subsections = t('vistas', { returnObjects: true }) as Array<{
    title: string;
    content: string;
  }>;
  const count = subsections.length;
  const subw = vw < 768 ? vw : 640;
  const tankw = count * subw;
  // const tankw = 'auto';
  const shift = vw - tankw;
  // const shift = sectionRef.current.offsetWidth;

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
          // translateX: sectionRef.current.offsetWidth * -1,
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
          {subsections.map((subsection, index) => (
            <Box key={index} className={styles.subsection}>
              <Title c="white" order={2}>
                {subsection.title}
              </Title>
              <Text size="xl">{subsection.content}</Text>
            </Box>
          ))}
        </Flex>
      </div>
    </Box>
  );
}
