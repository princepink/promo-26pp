import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { Text, Group, Box } from '@mantine/core';
import styles from './Terminator.module.scss';

// gsap.registerPlugin(SplitText);

export const Terminator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const words = ['Hypre Designer.', 'Full-stack Web Developer.'];
  const [index, setIndex] = useState(0);

  useGSAP(
    () => {
      // Executed immediately after the index of a dependency array changes
      if (!textRef.current || !cursorRef.current) return;

      // --- 1. Run SplitText ---
      // Split new text, cleaning up the previous remnants
      const split = new GSAPSplitText(textRef.current, { type: 'chars' });
      const chars = split.chars as HTMLElement[];

      // --- 2. Set initial state ---
      gsap.set(chars, { opacity: 0 });
      gsap.set(cursorRef.current, { x: 0, opacity: 0.69 });

      const tl = gsap.timeline({
        // Update index when the timeline ends (triggering a React re-render)
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);
        },
      });

      // Blinking cursor (separate Tween)
      const blink = gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)',
      });

      // --- 3. Animation assembly ---
      // Typing
      chars.forEach((char) => {
        tl.to(char, { opacity: 1, duration: 0.05 }, '+=0.05').to(
          cursorRef.current,
          {
            x: char.offsetLeft + char.offsetWidth,
            duration: 0,
          },
          '<',
        );
      });

      // pose 2 sec.
      tl.to({}, { duration: 2 });

      // Delete (from right to left)
      [...chars].reverse().forEach((char) => {
        tl.to(char, { opacity: 0, duration: 0.03 }, '+=0.03').to(
          cursorRef.current,
          {
            x: char.offsetLeft,
            duration: 0,
          },
          '<',
        );
      });

      // --- 4. Cleanup ---
      return () => {
        blink.kill();
        split.revert();
      };
    },
    {
      dependencies: [index], // Every time the index changes, the entire function is re-executed
      scope: containerRef,
      revertOnUpdate: true, // Reset everything to blank when updating the index
    },
  );

  return (
    <Box className={styles.typewriter} ref={containerRef} p="xl">
      <Group className={styles.typeline} gap={12} align="center">
        <Text
          className={styles.fold}
          // size="32px"
          fw={400}
          c="gray.0"
          ff="monospace"
        >
          I'm a
        </Text>

        <Box className={styles.terminal}>
          {/* 
            Using key={index} will cause React to completely discard the old 
            DOM element and create a new one with words[index] , 
            which GSAP will find and apply SplitText to again.
          */}
          <Text
            className={styles.typing}
            key={index}
            ref={textRef}
            fw={900}
            c="lime.3"
            ff="monospace"
          >
            {words[index]}
          </Text>

          <Box className={styles.caret} ref={cursorRef} />
        </Box>
      </Group>
    </Box>
  );
};
