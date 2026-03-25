// import { forwardRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Box, Title, Text } from '@mantine/core';
import styles from './CreditRoll.module.scss';
import { endroll } from '../locales/en/common.json';

type CreditData = {
  role: string;
  name: string | string[];
};

type CreditGroupData = {
  label: string;
  data: CreditData[];
};

interface CreditProps {
  // index: number;
  credit: CreditData;
}

interface CreditSectProps {
  sectKey: string;
  credits: CreditGroupData;
}

const Credit = ({ credit }: CreditProps) => {
  const c = credit.role.startsWith('<i>') ? 'as' : 'is';

  return (
    <div className={styles[c]}>
      <dt>
        <Trans>{credit.role}</Trans>
      </dt>
      {Array.isArray(credit.name) ? (
        credit.name.map((name) => (
          <dd key={credit.role + name}>
            <Trans>{name}</Trans>
          </dd>
        ))
      ) : (
        <dd>
          <Trans>{credit.name}</Trans>
        </dd>
      )}
    </div>
  );
};

const CreditHeader = () => (
  <header>
    <Title order={2} size={36}>
      <Trans i18nKey={'meta.title'} />
    </Title>
  </header>
);

const CreditSect = ({ sectKey, credits }: CreditSectProps) => (
  <section className={styles[sectKey]}>
    <Title order={3}>
      <Trans>{credits.label}</Trans>
    </Title>
    <dl>
      {credits.data.map((credit) => (
        <Credit key={sectKey + credit.role} credit={credit} />
      ))}
    </dl>
  </section>
);

const Sole = () => (
  <section className={styles.sole}>
    {endroll.soleCredit.data.map((sole) => (
      <Box key={sole.role}>
        <Trans parent="h3">{sole.role}</Trans>
        <Trans parent="p">{sole.name}</Trans>
      </Box>
    ))}
  </section>
);

const CreditFooter = () => (
  <footer>
    <span>Thanks</span>
  </footer>
);

const CreditRoll = ({ ref }: { ref: React.Ref<HTMLElement> }) => (
  <Box className={styles.roller} ref={ref} component="section">
    <CreditHeader />
    <CreditSect sectKey="cast" credits={endroll.cast} />
    <CreditSect sectKey="crew" credits={endroll.crew} />
    <Sole />
    <CreditFooter />
  </Box>
);

export default CreditRoll;
