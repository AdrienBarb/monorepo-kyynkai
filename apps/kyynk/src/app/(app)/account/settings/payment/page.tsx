import { auth } from '@/auth';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import PaymentSettings from '@/components/settings/PaymentSettings';
import { redirect } from 'next/navigation';
import React from 'react';
import { appRouter } from '@/constants/appRouter';
import { getTranslations } from 'next-intl/server';

const SettingsPaymentPage = async () => {
  const session = await auth();
  const t = await getTranslations();

  if (!session) {
    redirect(appRouter.login);
  }

  return (
    <PaddingContainer>
      <PageHeader title={t('paymentSettings')} />
      <PaymentSettings />
    </PaddingContainer>
  );
};

export default SettingsPaymentPage;
