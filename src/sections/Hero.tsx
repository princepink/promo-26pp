import { Box, Container, Center, Title, Text } from '@mantine/core';
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
    },
    {
      key: 'jobs.gain',
      col: 'teal',
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
            <Text size="lg">
              <IconArrowBigDownLines className="icon-pulse" />
              <Trans i18nKey="hero.stimulate" />
            </Text>
          </Box>
        </Center>
      </Container>
      <Trailer />
    </Box>
  );
}
