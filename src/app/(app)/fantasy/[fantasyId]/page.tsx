import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import { getFantasyById } from '@/services/fantasies/getFantasyById';
import { getRandomFantasies } from '@/services/fantasies/getRandomFantasies';
import PageContainer from '@/components/PageContainer';
import FantasyPlayer from '@/components/fantasies/FantasyPlayer';
import FantasyRecommendations from '@/components/fantasies/FantasyRecommendations';
import FantasyPageView from '@/components/tracking/FantasyPageView';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export type PageProps = {
  params: Promise<{ slug: string; fantasyId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { fantasyId } = await params;
  const fantasy = await getFantasyById({ fantasyId });

  return genPageMetadata({
    title: `${fantasy?.title}`,
    url: `/fantasy/${fantasyId}`,
  });
}

const FantasyPlayPage = async ({ params }: PageProps) => {
  const { fantasyId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const fantasy = await getFantasyById({ fantasyId, userId });

  if (!fantasy) {
    redirect('/404');
  }

  const randomFantasies = await getRandomFantasies(fantasyId, 6);

  return (
    <PageContainer>
      <FantasyPageView />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
          <FantasyPlayer fantasy={fantasy} />
          <FantasyRecommendations fantasies={randomFantasies} />
        </div>
      </div>
    </PageContainer>
  );
};

export default FantasyPlayPage;
