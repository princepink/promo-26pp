import { useEffect, useRef } from 'react';
import { Box, Container, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Trans } from 'react-i18next';
import AutoScroll from 'embla-carousel-auto-scroll';
import SvgLogo from '../components/SvgLogo';
import { getSVGModulesInDir } from '../utils';
import { logoWorksDir } from '../../pearlpuppy-config';
import styles from './Parade.module.scss';

const logoModules = getSVGModulesInDir(logoWorksDir(0));

const logoNames = Object.keys(logoModules).map((path) => {
  return path.split('/').pop()?.replace('.svg', '') || '';
});

export default function ParadeSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // continuous auto scroll plugin
  const autoScroll = useRef(
    AutoScroll({
      speed: 1.2,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      playOnInit: false, // control via IntersectionObserver
    }),
  );

  /**
   *  start / stop by crossing viewport ratio
   */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.05) {
          autoScroll.current.play();
        } else {
          autoScroll.current.stop();
        }
      },
      { threshold: [0, 0.05] },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  /**
   *  Mantine Carousel
   *    slideSize - slideGap = view space for the slide
   *  @prop styles  Styles API https://mantine.dev/x/carousel/?t=styles-api
   */
  return (
    <Box component="section" className={styles.parade}>
      <Title order={2}>
        <Trans i18nKey="parade.title" />
      </Title>
      <Container ref={containerRef} size="100%" className={styles.container}>
        <Carousel
          className={styles.carousel}
          withControls={false}
          withIndicators={false}
          slideSize={128}
          slideGap={64}
          plugins={[autoScroll.current]}
          emblaOptions={{
            loop: true,
            dragFree: true,
            align: 'start',
          }}
          styles={{
            viewport: {
              overflow: 'visible',
            },
          }}
        >
          {logoNames.map((name) => (
            <Carousel.Slide key={name}>
              <SvgLogo name={name} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
