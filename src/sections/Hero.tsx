import { Box, Container, Center, Title, Text, Badge } from '@mantine/core';
import { IconArrowBigDownLines } from '@tabler/icons-react';
import { Trans } from 'react-i18next';
import Ambience from '../layouts/Ambience';
import VerticalTicker, { Palette } from '../components/VerticalTicker';
import Trailer from '../components/Trailer';
import styles from './Hero.module.scss';

export default function HeroSection() {
  const tickers: Palette[] = [
    {
      key: 'jobs.domain',
      col: 'mediumvioletred',
      class: 'alpha',
    },
    {
      key: 'jobs.gain',
      col: 'teal',
      class: 'beta',
    },
  ];

  return (
    <Box id="hero" component="section">
      <Ambience />
      <Container size="md">
        <Center className={styles.box}>
          <Title order={1} className={styles.title}>
            <Trans i18nKey="author" />
          </Title>
          <Box className={styles.ticker}>
            <VerticalTicker ticks={tickers} />
          </Box>
          <Box className={styles.message}>
            <Badge size="xl" p="xl" classNames={{ label: styles.badgeLabel }}>
              <span className={styles.circle}>
                <IconArrowBigDownLines className="icon-pulse" size={24} />
              </span>
              <Trans i18nKey="hero.stimulate" />
            </Badge>
          </Box>
        </Center>
      </Container>
      <Trailer />
    </Box>
  );
}
