import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import imgixLoader from '@/lib/imgix/loader';
import ProfileConversationInput from '@/components/conversations/ProfileConversationInput';
import { AiGirlfriendType } from '@/types/ai-girlfriends';
import ConversationHeader from '@/components/conversations/ConversationHeader';
import { getLocale } from 'next-intl/server';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import CharacterPageView from '@/components/tracking/CharacterPageView';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import PostsList from '@/components/posts/PostsList';
import { getPosts } from '@/services/ai-girlfriends-service/getPosts';

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
  const locale = await getLocale();

  const aiGirlfriend = (await getAiGirlfriendBySlug({
    slug,
  })) as AiGirlfriendType;

  if (!aiGirlfriend) {
    redirect('/404');
  }

  const posts = await getPosts({ slug });

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 68px)' }}>
      {/* <ConversationHeader aiGirlfriend={aiGirlfriend} /> */}
      <Tabs defaultValue="chat" className="flex flex-col flex-1 min-h-0">
        <TabsList className="flex-shrink-0 border-b border-primary/20">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent
          value="chat"
          className="flex-1 flex flex-col min-h-0 overflow-scroll"
        >
          <ProfileConversationInput
            chatOpeningLine={
              aiGirlfriend.chatOpeningLine?.[locale || 'en'] ?? ''
            }
            profileVideoId={aiGirlfriend.profileVideoId}
          />
        </TabsContent>
        <TabsContent value="posts" className="flex-1 overflow-auto">
          <PostsList posts={posts} />
        </TabsContent>
      </Tabs>
      <CharacterPageView />
    </div>
  );
};

export default UserPage;
