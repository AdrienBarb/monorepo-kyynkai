import { auth } from '@/auth';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { redirect } from 'next/navigation';
import React from 'react';
import { appRouter } from '@/constants/appRouter';
import UserForm from '@/components/UserForm';
import { getTranslations } from 'next-intl/server';

const PreferencesPage = async () => {
  const session = await auth();
  const t = await getTranslations();

  if (!session) {
    redirect(appRouter.login);
  }

  return (
    <PaddingContainer>
      <PageHeader title={t('myProfile')} />
      <UserForm />
    </PaddingContainer>
  );
};

export default PreferencesPage;
