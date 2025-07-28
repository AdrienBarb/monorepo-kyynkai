import React from 'react';
import styles from '../styles/SupportContact.module.scss';
import { HELP_EMAIL } from '@/constants/constants';
import { useTranslations } from 'next-intl';

const SupportContact = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <p>
        {t('problem_?')} <a href={`mailto:${HELP_EMAIL}`}>{t('contact_us')}</a>
      </p>
    </div>
  );
};

export default SupportContact;
