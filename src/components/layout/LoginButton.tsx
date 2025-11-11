'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

const LoginButton: React.FC = () => {
  const t = useTranslations();
  const { openModal } = useGlobalModalStore();

  const handleLoginClick = () => {
    openModal('auth', { isSignInMode: true });
  };

  return <Button onClick={handleLoginClick}>{t('login')}</Button>;
};

export default LoginButton;
