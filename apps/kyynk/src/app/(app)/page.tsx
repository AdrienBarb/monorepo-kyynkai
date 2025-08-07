import UsersList from '@/components/UsersList';
import React from 'react';
import { getAiGirlfriends } from '@/services/users/getAiGirlfriends';
import { AIGirlfriend } from '@prisma/client';
import PaddingContainer from '@/components/layout/PaddingContainer';
import Landing from '@/components/home/Landing';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { genPageMetadata } from '@/app/seo';

export type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return genPageMetadata({
    title: t('homeTitle'),
    description: t('homeDescription'),
  });
}

const HomePage = async () => {
  const initialAiGirlfriends = (await getAiGirlfriends()) as AIGirlfriend[];

  return (
    <PaddingContainer>
      <Landing />
      <UsersList initialAiGirlfriends={initialAiGirlfriends} />
    </PaddingContainer>
  );
};

export default HomePage;
