import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import ErrorMessage from '@/components/ErrorMessage';
import { getTranslations } from 'next-intl/server';
import UserUncompletedProfileBanner from '@/components/profile/UserUncompletedProfileBanner';
import UserProfileHeader from '@/components/UserProfileHeader';
import PageContainer from '@/components/PageContainer';
import { getUserBySlug } from '@/services/users/getUserBySlug';
import { getUserNudesById } from '@/services/nudes/getUserNudesById';
import UserNudes from '@/components/nudes/UserNudes';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { NudeFromPrisma, NudeWithPermissions } from '@/types/nudes';
import { FetchedUserType } from '@/types/users';
import imgixLoader from '@/lib/imgix/loader';
import { UserType } from '@prisma/client';
import ProfileConversationInput from '@/components/conversations/ProfileConversationInput';
import UserProfileMenu from '@/components/UserProfileMenu';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  const user = await getUserBySlug({ slug });

  const imageUrl = imgixLoader({
    src: user?.profileImageId ?? '',
    width: 1200,
    quality: 80,
  });

  return genPageMetadata({
    title: user?.pseudo ?? '',
    description: user?.description ?? '',
    image: imageUrl ?? '',
    url: `/${user?.slug}`,
  });
}

const UserPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const t = await getTranslations();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log('🚀 ~ UserPage ~ session:', session);

  const user = (await getUserBySlug({ slug })) as FetchedUserType;

  if (!user) {
    redirect('/404');
  }

  if (user.userType === UserType.member) {
    redirect('/404');
  }

  if (user.isArchived) {
    return <ErrorMessage message={t('error.userArchived')} />;
  }

  return (
    <PageContainer>
      <PaddingContainer>
        <UserUncompletedProfileBanner />
        <UserProfileMenu />
        <UserProfileHeader initialUserDatas={user} />
        <ProfileConversationInput user={user} />
      </PaddingContainer>
    </PageContainer>
  );
};

export default UserPage;
