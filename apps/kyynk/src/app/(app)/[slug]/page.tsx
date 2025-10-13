import React from 'react';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { redirect } from 'next/navigation';
import imgixLoader from '@/lib/imgix/loader';
import { getAiGirlfriendBySlug } from '@/services/ai-girlfriends-service/getAiGirlfriendBySlug';
import CharacterPageView from '@/components/tracking/CharacterPageView';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import PostsList from '@/components/posts/PostsList';
import Title from '@/components/ui/Title';

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

  const profileImageUrl = imgixLoader({
    src: aiGirlfriend.profileImageId || '',
    width: 600,
    quality: 90,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center p-6 mb-8">
        <div className="flex flex-col items-center max-w-md w-full">
          <div className="relative aspect-[3/4] w-full max-w-48 overflow-hidden rounded-lg border border-primary/20 shadow-lg mb-2">
            <Image
              src={profileImageUrl}
              alt={aiGirlfriend.pseudo}
              fill
              className="object-cover transition-all duration-500 ease-in-out"
            />
          </div>

          <div className="text-center mb-4">
            <Title
              Tag="h1"
              className="text-xl font-bold font-karla text-primary mb-2"
            >
              {`${aiGirlfriend.pseudo}, ${aiGirlfriend.age}`}
            </Title>
            <p className="text-sm font-semibold font-karla text-muted-foreground">
              {aiGirlfriend.archetype}
            </p>
            {aiGirlfriend.hook && (
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                {aiGirlfriend.hook}
              </p>
            )}
          </div>

          <div className="w-full space-y-3">
            <Link href={`/${slug}/chat`} className="w-full">
              <Button className="w-full py-3 text-lg font-semibold">
                Start Chat
              </Button>
            </Link>

            <Link href={`/${slug}/fantasy`} className="w-full">
              <Button
                variant="secondary"
                className="w-full py-3 text-lg font-semibold"
              >
                Play Mode
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="pb-6">
        <PostsList />
      </div>

      <CharacterPageView />
    </div>
  );
};

export default ProfilePage;
