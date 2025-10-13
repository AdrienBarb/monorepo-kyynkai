import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import { getFantasyById } from '@/services/fantasies/getFantasyById';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import FantasyPlayer from '@/components/fantasies/FantasyPlayer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

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
    getFantasyById({ fantasyId }),
  ]);

  if (!aiGirlfriend || !fantasy) {
    redirect('/404');
  }

  if (fantasy.aiGirlfriendId !== aiGirlfriend.id) {
    redirect('/404');
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/${slug}/fantasy`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Fantasies
            </Button>
          </Link>
        </div>

        <PageHeader
          title={fantasy.title}
          description={fantasy.description}
          tag="h1"
        />

        <FantasyPlayer fantasy={fantasy} slug={slug} />
      </div>
    </PageContainer>
  );
};

export default FantasyPlayPage;
