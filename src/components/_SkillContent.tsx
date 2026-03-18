import { List, Title, Text } from '@mantine/core';
// import styles from './SkillContent.module.scss';

type SkillItem = string | SkillItem[];

interface SkillProps {
  key: string;
  skill: {
    title: string;
    items: SkillItem[];
  };
}

function RecursiveList({ items }: { items: SkillItem[] }) {
  return (
    <>
      {items.map((item, index) => (
        <List.Item key={index}>
          {Array.isArray(item) ? (
            <List withPadding mt="xs">
              <RecursiveList items={item} />
            </List>
          ) : (
            <Text>{item}</Text>
          )}
        </List.Item>
      ))}
    </>
  );
}

export const SkillContent = ({ key, skill }: SkillProps) => {
  return (
    <>
      <Title id={key} order={3}>
        {skill.title}
      </Title>
      <List withPadding>
        <RecursiveList items={skill.items} />
      </List>
    </>
  );
};
