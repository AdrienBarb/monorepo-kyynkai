import { auth } from '@/auth';
import PaddingContainer from '@/components/layout/PaddingContainer';
import PageHeader from '@/components/layout/PageHeader';
import AskPaymentButton from '@/components/revenue/AskPaymentButton';
import RevenueDashboard from '@/components/revenue/RevenueDashboard';
import { MIN_CREDITS_AMOUNT_FOR_WITHDRAWAL } from '@/constants/constants';
import { getUserRevenues } from '@/services/sales/getUserRevenues';
import { redirect } from 'next/navigation';
import React from 'react';
import { getTranslations } from 'next-intl/server';

const RevenuePage = async () => {
  const session = await auth();
  const t = await getTranslations();

  if (!session) {
    redirect('/login');
  }

  const { incomingRevenue, availableRevenue } = await getUserRevenues({
    userId: session?.user.id!,
  });

  return (
    <PaddingContainer>
      <PageHeader title={t('revenue')}>
        <AskPaymentButton
          disabled={availableRevenue < MIN_CREDITS_AMOUNT_FOR_WITHDRAWAL}
        />
      </PageHeader>
      <RevenueDashboard
        availableRevenue={availableRevenue}
        incomingRevenue={incomingRevenue}
      />
    </PaddingContainer>
  );
};

export default RevenuePage;
