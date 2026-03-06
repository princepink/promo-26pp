import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { Box, Center, Text } from '@mantine/core';
import { Trans } from 'react-i18next';

export default function FlamboyantSection() {
  const { tl } = useTimeline();
  const triggerRef = useRef(null);
  const targetRef = useRef(null);

  useGSAP(
    () => {
      if (!tl) return;

      const localTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=5000',
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      localTl
        .fromTo(
          targetRef.current,
          {
            filter: 'blur(4px)',
          },
          {
            filter: 'none',
            scale: 3,
            rotate: 360,
            ease: 'none',
            duration: 2, // ratio against others
          },
        )
        .to(targetRef.current, {
          scale: 100,
          // filter: 'none',
          ease: 'power2.inOut',
          duration: 3,
        });
    },
    { scope: triggerRef, dependencies: [tl] },
  );

  return (
    <Box
      ref={triggerRef}
      component="section"
      w="100vw"
      h="100vh"
      // bg="dark"
      style={{ overflow: 'hidden' }}
    >
      <Center ref={targetRef} h="stretch">
        <Text ta="center" fw="bold" tt="uppercase">
          <Trans i18nKey="flamboyant" />
        </Text>
      </Center>
    </Box>
  );
}
