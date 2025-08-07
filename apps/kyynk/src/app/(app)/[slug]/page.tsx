import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import PageContainer from '@/components/PageContainer';
import { getAiGirlfriendBySlug } from '@/services/users/getAiGirlfriendBySlug';
import PaddingContainer from '@/components/layout/PaddingContainer';
import imgixLoader from '@/lib/imgix/loader';
import ProfileConversationInput from '@/components/conversations/ProfileConversationInput';
import { AiGirlfriendType } from '@/types/ai-girlfriends';
import ConversationHeader from '@/components/conversations/ConversationHeader';

export type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  const aiGirlfriend = await getAiGirlfriendBySlug({ slug });

  const imageUrl = imgixLoader({
    src: aiGirlfriend?.profileImageId ?? '',
    width: 1200,
    quality: 80,
  });

  return genPageMetadata({
    title: aiGirlfriend?.pseudo ?? '',
    image: imageUrl ?? '',
    url: `/${aiGirlfriend?.slug}`,
  });
}

const UserPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const aiGirlfriend = (await getAiGirlfriendBySlug({
    slug,
  })) as AiGirlfriendType;

  if (!aiGirlfriend) {
    redirect('/404');
  }

  return (
    <div style={{ height: 'calc(100dvh - 68px)' }}>
      <ConversationHeader aiGirlfriend={aiGirlfriend} />
      <ProfileConversationInput />
    </div>
  );
};

export default UserPage;
