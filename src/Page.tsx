import { Box } from '@mantine/core';
import HeroSection from './sections/Hero';
import ZoomyDepthSection from './sections/ZoomyDepth';
import HorizonSection from './sections/Hrizon';
import ParadeSection from './sections/Parade';
import PokerSection from './sections/Poker';
import FlamboyantSection from './sections/Flamboyant';

export default function Page() {
  return (
    <Box id="page-root" component="main">
      <HeroSection />
      <PokerSection />
      <FlamboyantSection />
      <ZoomyDepthSection />
      <HorizonSection />
      <ParadeSection />
    </Box>
  );
}
