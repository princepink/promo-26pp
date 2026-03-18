import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useTimeline } from '../contexts/TimelineContext';
import { useTranslation } from 'react-i18next';
import { Box } from '@mantine/core';
import { Trans } from 'react-i18next';
import SkillCard, { SkillData } from '../components/SkillCard';
import gsap from 'gsap';
import styles from './Poker.module.scss';
import FairTitle from '../components/FairTitle';

export default function PokerSection() {
  const { tl } = useTimeline();
  const triggerRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();
  const skills = t('skills', { returnObjects: true }) as Array<SkillData>;

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
              // this = independent `tween` -> available precise progress()
              const p = this.progress();
              let z: number;
              if (p < 0.3) {
                z = cards.length - i;
              } else if (p <= 0.7) {
                z = cards.length * 2;
              } else {
                z = 0;
              }
              gsap.set(card, { zIndex: z });
            },
          },
          // alternative `stagger`
          i * 0.3,
        );
      });
    },
    { scope: triggerRef, dependencies: [tl] },
  );

  return (
    <Box ref={triggerRef} component="section" className={styles.container}>
      <FairTitle scopeRef={triggerRef}>
        <Trans i18nKey="titles.skill" />
      </FairTitle>
      {skills.map((skill) => (
        <SkillCard key={skill.id} classViaCaller={styles.card} skill={skill} />
      ))}
    </Box>
  );
}
