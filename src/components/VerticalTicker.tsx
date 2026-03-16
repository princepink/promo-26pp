import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trans } from 'react-i18next';
import { ParseKeys } from 'i18next';
import { Center, Badge } from '@mantine/core';
import styles from './VerticalTicker.module.scss';

export interface Palette {
  key: ParseKeys;
  col: string;
  class: string;
}

interface VerticalTickerProps {
  ticks: Palette[];
}

export default function VerticalTicker({ ticks }: VerticalTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ticks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Center className={styles.root}>
      <AnimatePresence initial={false}>
        <motion.div
          key={ticks[index].key}
          className={`${styles[ticks[index].class]} ${styles.tick}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.75 }}
        >
          <Badge
            className={styles.badge}
            size="xl"
            radius="xl"
            p="lg"
            data-bg={ticks[index].col}
          >
            <Trans i18nKey={ticks[index].key} />
          </Badge>
        </motion.div>
      </AnimatePresence>
    </Center>
  );
}
