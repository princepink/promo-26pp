import { useEffect, useRef } from 'react';
import { Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
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

  return (
    <Box ref={containerRef} w="100%" miw={720} className={styles.container}>
      <Carousel
        className={styles.carousel}
        withControls={false}
        withIndicators={false}
        slideSize="72px"
        slideGap="md"
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
          // display: 'flex',
        }}
      >
        {logoNames.map((name) => (
          <Carousel.Slide key={name}>
            <div style={{ padding: '10px', textAlign: 'center' }}>
              <SvgLogo
                name={name}
                style={{
                  width: '80px',
                  height: 'auto',
                  opacity: 0.7,
                }}
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
