import { auth } from '@/auth';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import ConversationSettings from '@/components/settings/ConversationSettings';
import { redirect } from 'next/navigation';
import React from 'react';
import { getTranslations } from 'next-intl/server';

const SettingsConversationsPage = async () => {
  const session = await auth();
  const t = await getTranslations();

  if (!session) {
    redirect('/login');
  }

  return (
    <PaddingContainer>
      <PageHeader title={t('conversationsSettings')} />
      <ConversationSettings />
    </PaddingContainer>
  );
};

export default SettingsConversationsPage;
