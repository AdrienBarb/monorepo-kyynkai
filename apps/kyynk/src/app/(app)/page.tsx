import UsersList from '@/components/UsersList';
import React from 'react';
import { getUsers } from '@/services/users/getUsers';
import { User } from '@prisma/client';
import PaddingContainer from '@/components/layout/PaddingContainer';
import Landing from '@/components/home/Landing';
import AppFAQ from '@/components/home/AppFAQ';
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
  // const initialUsersDatas = (await getUsers()) as User[];

  return (
    <PaddingContainer>
      <Landing />
      {/* <UsersList initialUsers={initialUsersDatas} /> */}
      <AppFAQ />
    </PaddingContainer>
  );
};

export default HomePage;
