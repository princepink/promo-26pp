import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { useTranslation } from 'react-i18next';
import { Box, Card, Title, Text } from '@mantine/core';
import gsap from 'gsap';
import styles from './Poker.module.scss';

export default function PokerSection() {
  const { tl } = useTimeline();
  const triggerRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();
  const pokes = t('pokes', { returnObjects: true }) as Array<{
    title: string;
    content: string;
  }>;

  useGSAP(
    () => {
      if (!tl) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        `.${styles.card}`,
        triggerRef.current,
      );

      const localTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=5000',
          scrub: 0.7,
          pin: true,
        },
      });

      cards.forEach((card, i) => {
        localTl.to(
          card,
          {
            top: '2rem',
            left: i + 2 + 'rem',
            ease: 'slow',
            onUpdate() {
              // this = 個別 tween なので progress() が正確に取れる
              const p = this.progress();
              let z: number;
              if (p < 0.3) {
                z = cards.length - i; // 未到着：元の重なり順
              } else if (p <= 0.7) {
                z = cards.length * 2; // 中央付近：最前面
              } else {
                z = 0; // 通過済み：最背面
              }
              gsap.set(card, { zIndex: z });
            },
          },
          // stagger 相当のオフセット：前のカードと 0.3 ずらして追加
          i * 0.3,
        );
      });
    },
    { scope: triggerRef, dependencies: [tl] },
  );

  return (
    <Box ref={triggerRef} component="section" className={styles.container}>
      {pokes.map((poke, index) => (
        <Card key={index} className={styles.card} withBorder>
          <Title order={2}>{poke.title}</Title>
          <Text>{poke.content}</Text>
        </Card>
      ))}
    </Box>
  );
}
