'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

const LoginButton: React.FC = () => {
  const t = useTranslations();
  const openModal = useGlobalModalStore((s) => s.openModal);

  const handleLoginClick = () => {
    openModal('auth');
  };

  return <Button onClick={handleLoginClick}>{t('login')}</Button>;
};

export default LoginButton;
