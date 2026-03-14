import {
  Box,
  Title,
  TitleOrder,
  Text,
  VisuallyHidden,
  List,
} from '@mantine/core';
import { Trans } from 'react-i18next';
import { Career } from '../@types/career';
import styles from './RecursiveCareer.module.scss';

type CareerProps = {
  career: Career;
  depth?: number;
};

const getValidOrder = (order: number): TitleOrder => {
  return Math.max(1, Math.min(6, order)) as TitleOrder;
};

export const RecursiveCareer = ({ career, depth = 0 }: CareerProps) => {
  if (!career.title) return;

  const hn = getValidOrder(2 + depth);
  const isChild = depth > 0;
  const nFromY = career.fromY ?? 0;
  const sFromY = String(nFromY);
  const nToY = career.toY ?? 0;
  const sToY = String(nToY);
  const isCurrent = nToY < 0;
  const showEnd = nFromY < nToY;
  const showPipe = isCurrent || showEnd;

  depth++;

  return (
    <Box className={styles.content} component="section">
      <Title order={hn}>{career.title}</Title>
      {(career.fromY ?? 0) > 0 && (
        <dl>
          <VisuallyHidden component="dt">
            <Trans i18nKey={'labels.period'} />
          </VisuallyHidden>
          <dd>
            <time dateTime={sFromY}>{sFromY}</time>
            {showPipe && <span> - </span>}
            {showEnd && <time dateTime={sToY}>{sToY}</time>}
          </dd>
          {!isChild && career.tradeName && (
            <>
              <VisuallyHidden component="dt">
                <Trans i18nKey={'labels.organization'} />
              </VisuallyHidden>
              <dd>{career.tradeName}</dd>
            </>
          )}
          {isChild && (
            <>
              <VisuallyHidden component="dt">
                <Trans i18nKey={'labels.description'} />
              </VisuallyHidden>
              <dd>{career.description}</dd>
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
    </Box>
  );
};
