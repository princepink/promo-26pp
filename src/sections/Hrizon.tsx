import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Title, Text } from '@mantine/core';
import styles from './Horizon.module.scss';

export default function HorizonSection() {
  const { tl } = useTimeline();
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);
  const { t } = useTranslation();
  // Pre-translate all Vistas - to loop the array of contents
  const vistas = t('vistas', { returnObjects: true }) as Array<{
    title: string;
    content: string;
  }>;
  const count = vistas.length;
  const tankw = count * 100 + 'vw';
  const shift = (count - 1) * -100 + 'vw';

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
          {vistas.map((vista, index) => (
            <Box key={index} className={styles.vista}>
              <Title c="white" order={2}>
                {vista.title}
              </Title>
              <Text size="xl">{vista.content}</Text>
            </Box>
          ))}
        </Flex>
      </div>
    </Box>
  );
}
