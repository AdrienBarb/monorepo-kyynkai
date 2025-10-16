import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import { getFantasyById } from '@/services/fantasies/getFantasyById';
import PageContainer from '@/components/PageContainer';
import FantasyPlayer from '@/components/fantasies/FantasyPlayer';
import { Fantasy } from '@/types/fantasies';
import FantasyPageView from '@/components/tracking/FantasyPageView';

export type PageProps = {
  params: Promise<{ slug: string; fantasyId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { slug, fantasyId } = await params;
  const aiGirlfriend = await getAiGirlfriendBySlug({ slug });
  const fantasy = await getFantasyById({ fantasyId });

  return genPageMetadata({
    title: `${aiGirlfriend?.pseudo} - ${fantasy?.title}`,
    url: `/${aiGirlfriend?.slug}/fantasy/${fantasyId}`,
  });
}

const FantasyPlayPage = async ({ params }: PageProps) => {
  const { slug, fantasyId } = await params;

  const [aiGirlfriend, fantasy] = await Promise.all([
    getAiGirlfriendBySlug({ slug }),
    getFantasyById({ fantasyId }) as Promise<Fantasy>,
  ]);

  if (!aiGirlfriend || !fantasy) {
    redirect('/404');
  }

  if (fantasy.aiGirlfriendId !== aiGirlfriend.id) {
    redirect('/404');
  }

  return (
    <PageContainer>
      <FantasyPageView />
      <div className="space-y-6">
        <FantasyPlayer fantasy={fantasy} slug={slug} />
      </div>
    </PageContainer>
  );
};

export default FantasyPlayPage;
