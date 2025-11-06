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
  return genPageMetadata({
    title: 'AI Girlfriends – Meet Your Perfect Virtual Companion',
    description:
      'Browse our collection of lifelike AI girlfriends. Each with unique personalities, ready to chat and connect with you 24/7.',
  });
}

const GirlsPage = async () => {
  const initialAiGirlfriends = (await getAiGirlfriends()) as AIGirlfriend[];

  return (
    <PaddingContainer>
      <UsersList initialAiGirlfriends={initialAiGirlfriends} />
    </PaddingContainer>
  );
};

export default GirlsPage;
