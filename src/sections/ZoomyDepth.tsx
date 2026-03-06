import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { Container, SimpleGrid, Box, Title, Paper, Text } from '@mantine/core';
import styles from './ZoomyDepth.module.scss';

export default function ZoomyDepthSection() {
  const { tl } = useTimeline();
  const rotorRef = useRef(null);
  const floatCardRef = useRef(null);
  const fanRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(
    () => {
      if (!tl) return;

      const rotorTl = gsap.timeline({
        scrollTrigger: {
          trigger: rotorRef.current,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });
      const floatCardTl = gsap.timeline({
        scrollTrigger: {
          trigger: floatCardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      const fanTl = gsap.timeline({
        scrollTrigger: {
          trigger: fanRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      rotorTl.to(rotorRef.current, {
        rotate: 360,
        scale: 1.5,
        borderRadius: '50%',
      });
      fanTl.to(fanRef.current, {
        rotate: 360,
        scale: 1.5,
        borderRadius: '50%',
        duration: 1,
      });
      fanTl.to(fanRef.current, {
        scale: 5,
        duration: 3,
      });
      floatCardTl.to(floatCardRef.current, {
        y: -500,
      });
    },
    {
      scope: bgRef,
      dependencies: [tl],
    },
  );

  return (
    <Container
      ref={bgRef}
      id="zoomy-depth"
      component="section"
      size="md"
      h="100vh"
    >
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={100}
        style={{ minHeight: '100vh', alignItems: 'center' }}
      >
        <Box>
          <Title order={2} mb="xl">
            Transform Sync
          </Title>
          <Paper className={styles.sync} ref={rotorRef} shadow="xl">
            Sync Box
          </Paper>
        </Box>

        <Box className={styles.float}>
          <Title order={2} mb="xl">
            Floating Layer
          </Title>
          <Text mb="lg">
            右側の青いカードは、スクロールに対して敏感に反応し、浮き上がるように動きます。
          </Text>

          <Paper
            className={styles.paracard}
            ref={floatCardRef}
            p="xl"
            shadow="dark-md"
            withBorder
          >
            <Title order={3} c="blue.4">
              Parallax Card
            </Title>
            <Text mt="sm" size="sm">
              Scrub値を変えることで、物体ごとに重さを演出できます。
            </Text>
          </Paper>
        </Box>

        <Box className={styles.sync2} ref={fanRef} />
      </SimpleGrid>
    </Container>
  );
}
