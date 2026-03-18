import { Card, List, Title, Text } from '@mantine/core';
// import styles from './SkillContent.module.scss';

type SkillItem = string | SkillData;

type SkillData = {
  id?: string;
  title: string;
  items: SkillItem[];
};

interface SkillProps {
  skill: SkillData;
  level?: number;
}

interface CardProps {
  skill: SkillData;
  classViaCaller: string;
}

function SkillContent({ skill, level = 3 }: SkillProps) {
  const titleOrder = Math.min(level, 6) as 1 | 2 | 3 | 4 | 5 | 6;

  return (
    <>
      <Title order={titleOrder}>{skill.title}</Title>

      <List>
        {skill.items.map((item, index) => (
          <List.Item key={index}>
            {typeof item === 'string' ? (
              <Text>{item}</Text>
            ) : (
              <SkillContent skill={item} level={level + 1} />
            )}
          </List.Item>
        ))}
      </List>
    </>
  );
}

const SkillCard = ({ skill, classViaCaller }: CardProps) => (
  <Card id={`skill-${skill.id}`} className={classViaCaller} withBorder>
    <SkillContent skill={skill} />
  </Card>
);

export type { SkillData };
export default SkillCard;
