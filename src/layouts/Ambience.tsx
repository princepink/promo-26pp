import { Box, Image } from '@mantine/core';
import bg from '../assets/lustred_mantle_5.jpg';
import styles from './Ambience.module.scss';

export default function Ambience() {
  return (
    <Box className={styles.ambox}>
      <Image className={styles.bg} src={bg} />
    </Box>
  );
}
