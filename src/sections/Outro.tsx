import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { useTranslation } from 'react-i18next';
import { Box, Title, Text } from '@mantine/core';
// import FairTitle from '../components/FairTitle';

export default function OutroSection() {
  const { t } = useTranslation();
  const endroll = t('endroll.crew', { returnObjects: true });
  const { tl } = useTimeline();
  const rollRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!tl) return;

      const el = rollRef.current;
      const totalHeight = el ? el.offsetHeight : 100;

      const localTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'top bottom',
        },
        repeat: -1,
      });

      localTl
        .set(el, { y: 0, opacity: 1 }) // 初期状態リセット
        .to(el, {
          y: 400 - totalHeight,
          duration: 10, // スクロール速度
          ease: 'none',
          delay: 1, // 開始前のタメ
        })
        .to(
          el,
          {
            opacity: 0,
            duration: 1, // 終わりのフェードアウト
          },
          '+=0.5',
        ) // 到着後0.5秒待ってから実行
        .set(el, { y: 0 }) // こっそり位置を上に戻す
        .to(el, {
          opacity: 1,
          duration: 1, // 始まりのフェードイン
        });
    },
    {
      scope: containerRef,
      dependencies: [tl],
    },
  );

  return (
    <Box
      id="outro"
      component="section"
      ref={containerRef}
      style={{ height: '400px', overflow: 'hidden', position: 'relative' }}
    >
      <Box ref={rollRef}>
        {endroll.map((crew) => (
          <Box key={crew.role}>
            <Title>{crew.role}</Title>
            <Text>{crew.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
