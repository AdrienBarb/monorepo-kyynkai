import { auth } from '@/auth';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { redirect } from 'next/navigation';
import React from 'react';
import { appRouter } from '@/constants/appRouter';
import PreferencesSettings from '@/components/settings/PreferencesSettings';
import { getTranslations } from 'next-intl/server';

const PreferencesPage = async () => {
  const session = await auth();
  const t = await getTranslations();

  if (!session) {
    redirect(appRouter.login);
  }

  return (
    <PaddingContainer>
      <PageHeader title={t('preferencesSettings')} />
      <PreferencesSettings />
    </PaddingContainer>
  );
};

export default PreferencesPage;
