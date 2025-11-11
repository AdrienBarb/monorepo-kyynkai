'use client';

import React, { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import styles from '@/styles/errorPage.module.scss';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const AuthErrorPage = () => {
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    signOut({
      redirect: false,
    });

    router.push('/login');
  }, []);

  return <div className={styles.container}>{t('userRedirect')}</div>;
};

export default AuthErrorPage;
