'use client';

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { useTranslations } from 'next-intl';

const BecomeCreatorLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  return (
    <PaddingContainer>
      <PageHeader
        title={t('becomeCreatorLayoutTitle')}
        description={t('becomeCreatorLayoutDescription')}
        className="mb-4"
      />
      {children}
    </PaddingContainer>
  );
};

export default BecomeCreatorLayout;
