import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import imgixLoader from '@/lib/imgix/loader';
import ProfileConversationInput from '@/components/conversations/ProfileConversationInput';
import { AiGirlfriendType } from '@/types/ai-girlfriends';
import { getLocale } from 'next-intl/server';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import CharacterPageView from '@/components/tracking/CharacterPageView';
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
    title: `Chat with ${aiGirlfriend?.pseudo ?? ''}`,
    image: imageUrl ?? '',
    url: `/${aiGirlfriend?.slug}/chat`,
  });
}

const ChatPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const locale = await getLocale();

  const aiGirlfriend = (await getAiGirlfriendBySlug({
    slug,
  })) as AiGirlfriendType;

  if (!aiGirlfriend) {
    redirect('/404');
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 68px)' }}>
      {/* <ConversationHeader aiGirlfriend={aiGirlfriend} /> */}
      <ProfileConversationInput
        chatOpeningLine={aiGirlfriend.chatOpeningLine?.[locale || 'en'] ?? ''}
        profileVideoId={aiGirlfriend.profileVideoId}
      />
      <CharacterPageView />
    </div>
  );
};

export default ChatPage;
