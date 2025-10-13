import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import FantasyList from '@/components/fantasies/FantasyList';

export type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  const aiGirlfriend = await getAiGirlfriendBySlug({ slug });

  return genPageMetadata({
    title: `${aiGirlfriend?.pseudo} - Fantasy Mode`,
    url: `/${aiGirlfriend?.slug}/fantasy`,
  });
}

const FantasyPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const aiGirlfriend = await getAiGirlfriendBySlug({
    slug,
  });

  if (!aiGirlfriend) {
    redirect('/404');
  }

  return (
    <PageContainer>
      <PageHeader
        title={`${aiGirlfriend.pseudo} - Fantasy Mode`}
        description="Choose your adventure with interactive stories"
        tag="h1"
      />

      <div className="space-y-6">
        <FantasyList slug={slug} />
      </div>
    </PageContainer>
  );
};

export default FantasyPage;
