import { useViewportSize } from '@mantine/hooks';
import {
  Paper,
  Title,
  TitleOrder,
  Text,
  VisuallyHidden,
  List,
  Badge,
} from '@mantine/core';
import { Trans } from 'react-i18next';
import { Career } from '../@types/career';
import clsx from 'clsx';
import styles from './RecursiveCareer.module.scss';

type CareerProps = {
  career: Career;
  depth?: number;
  currentFromY?: number;
};

const getValidOrder = (order: number): TitleOrder => {
  return Math.max(1, Math.min(6, order)) as TitleOrder;
};

export const RecursiveCareer = ({
  career,
  depth = 0,
  currentFromY = 0,
}: CareerProps) => {
  if (!career.title) return;
  // console.log(currentFromY);

  const { width: vw } = useViewportSize();
  const subw = vw < 768 ? vw : 640;

  const hn = getValidOrder(2 + depth);
  const isChild = depth > 0;
  const fromAsNum = career.fromY ?? 0;
  const fromAsStr = String(fromAsNum);
  const toAsNum = career.toY ?? 0;
  const toAsStr = String(toAsNum);
  const isCurrent = toAsNum < 0;
  const isConcurrent = !isCurrent && !isChild && fromAsNum >= currentFromY;
  const showEnd = fromAsNum < toAsNum;
  const showPipe = isCurrent || showEnd;
  const cw = isChild ? '100%' : subw;

  depth++;

  return (
    <Paper
      className={clsx(styles.content, isChild && styles.child)}
      component="section"
      w={cw}
    >
      {!isChild && (
        <header>
          {isCurrent && <Badge>Current</Badge>}
          {isConcurrent && <Badge>Concurrent</Badge>}
          {career.sphere && (
            <Text
              className={styles.sphere}
              tt="uppercase"
              fw={700}
              variant="gradient"
              gradient={{ from: 'springgreen', to: 'magenta', deg: 60 }}
            >
              {career.sphere}
            </Text>
          )}
        </header>
      )}
      <Title order={hn}>{career.title}</Title>
      {(career.fromY ?? 0) > 0 && (
        <dl>
          <VisuallyHidden component="dt">
            <Trans i18nKey={'labels.period'} />
          </VisuallyHidden>
          <dd className={styles.period}>
            <time dateTime={fromAsStr}>{fromAsStr}</time>
            {showPipe && <span> - </span>}
            {showEnd && <time dateTime={toAsStr}>{toAsStr}</time>}
          </dd>
          {!isChild && career.tradeName && (
            <>
              <VisuallyHidden component="dt">
                <Trans i18nKey={'labels.organization'} />
              </VisuallyHidden>
              <dd className={styles.tradename}>{career.tradeName}</dd>
            </>
          )}
          {isChild && (
            <>
              <VisuallyHidden component="dt">
                <Trans i18nKey={'labels.description'} />
              </VisuallyHidden>
              <dd className={styles.desc}>{career.description}</dd>
            </>
          )}
        </dl>
      )}
      {!isChild && career.achievements && (
        <List size="lg">
          {career.achievements.map((achievement, i) => (
            <List.Item key={i}>{achievement}</List.Item>
          ))}
        </List>
      )}
      {!isChild && career.description && (
        <Text size="xl">{career.description}</Text>
      )}
      {!isChild &&
        career.children &&
        career.children.map((child, i) => (
          <RecursiveCareer key={i} career={child} depth={depth} />
        ))}
    </Paper>
  );
};
