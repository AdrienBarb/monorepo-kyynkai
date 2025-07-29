'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useAuthModal } from '@/utils/auth/openAuthModal';

const LoginButton: React.FC = () => {
  const t = useTranslations();
  const { openSignIn } = useAuthModal();

  const handleLoginClick = () => {
    openSignIn();
  };

  return <Button onClick={handleLoginClick}>{t('login')}</Button>;
};

export default LoginButton;
