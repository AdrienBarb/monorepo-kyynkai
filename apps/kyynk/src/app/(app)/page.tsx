import UsersList from '@/components/UsersList';
import React from 'react';

import { AIGirlfriend } from '@prisma/client';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { getAiGirlfriends } from '@/services/ai-girlfriends-service/getAiGirlfriends';

export type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { locale } = await params;

  return genPageMetadata({
    title: 'MILF AI Girlfriend App – Realistic Virtual Companions 24/7',
    description:
      'Chat with lifelike MILF AI girlfriends anytime. Flirty, private & realistic virtual companions designed for adults. Start your AI girlfriend experience today.',
  });
}

const HomePage = async () => {
  const initialAiGirlfriends = (await getAiGirlfriends()) as AIGirlfriend[];

  return (
    <PaddingContainer>
      <UsersList initialAiGirlfriends={initialAiGirlfriends} />
    </PaddingContainer>
  );
};

export default HomePage;
