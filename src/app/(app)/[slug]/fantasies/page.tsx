import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import { getFantasiesByAiGirlfriendSlug } from '@/services/fantasies/getFantasiesByAiGirlfriendSlug';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import FantasiesList from '@/components/fantasies/FantasiesList';
import NoResults from '@/components/common/NoResults';

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
    title: `${aiGirlfriend?.pseudo}'s Fantasies`,
    url: `/${slug}/fantasies`,
  });
}

const FantasiesPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const aiGirlfriend = await getAiGirlfriendBySlug({ slug });

  if (!aiGirlfriend) {
    redirect('/404');
  }

  const fantasies = await getFantasiesByAiGirlfriendSlug(slug);

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        {fantasies.length > 0 ? (
          <FantasiesList initialFantasies={fantasies} />
        ) : (
          <NoResults text="No fantasies available yet." />
        )}
      </div>
    </PageContainer>
  );
};

export default FantasiesPage;
