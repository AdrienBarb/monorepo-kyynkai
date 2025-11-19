import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import imgixLoader from '@/lib/imgix/loader';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import CharacterPageView from '@/components/tracking/CharacterPageView';
import ProfileConversationInput from '@/components/conversations/ProfileConversationInput';

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

const ProfilePage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const aiGirlfriend = await getAiGirlfriendBySlug({
    slug,
  });

  if (!aiGirlfriend) {
    redirect('/404');
  }

  const locale = 'en';
  const chatOpeningLine =
    typeof aiGirlfriend.chatOpeningLine === 'object' &&
    aiGirlfriend.chatOpeningLine !== null &&
    !Array.isArray(aiGirlfriend.chatOpeningLine)
      ? ((aiGirlfriend.chatOpeningLine as Record<string, string>)[locale] ?? '')
      : '';

  return (
    <>
      <div className="flex flex-col" style={{ height: 'calc(100dvh - 68px)' }}>
        <ProfileConversationInput
          chatOpeningLine={chatOpeningLine}
          profileVideoId={aiGirlfriend.profileVideoId}
        />
      </div>
      <CharacterPageView />
    </>
  );
};

export default ProfilePage;
