import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider, Box } from '@mantine/core';
import { ReactLenis } from 'lenis/react';
import { TimelineProvider } from './contexts/TimelineContext';
import Waves from './components/ReactBits/Waves'; // depends on GSAP
import Page from './Page';
import { useTranslation } from 'react-i18next';
import devicon from './assets/devicon.svg';

export default function App() {
  const { t } = useTranslation();
  const appTitle = t('meta.title');
  const favicon = import.meta.env.PROD ? '/favicon.svg' : devicon;

  return (
    <MantineProvider defaultColorScheme="dark">
      <title>{appTitle}</title>
      <meta name="description" content={t('meta.description')} />
      <link rel="icon" type="image/svg+xml" href={favicon} sizes="any" />
      <ReactLenis root options={{ lerp: 0.2, duration: 1.5 }}>
        <TimelineProvider>
          <Box id="app-root">
            <Box id="bg-wave">
              <Waves
                lineColor="cyan"
                backgroundColor="transparent"
                waveSpeedX={0.02}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
              />
            </Box>
            <Page />
          </Box>
        </TimelineProvider>
      </ReactLenis>
    </MantineProvider>
  );
}
