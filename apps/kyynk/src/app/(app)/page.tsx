import UsersList from '@/components/UsersList';
import React from 'react';
import Image from 'next/image';

import { AIGirlfriend } from '@prisma/client';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import { getAiGirlfriends } from '@/services/ai-girlfriends-service/getAiGirlfriends';

export type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { locale } = await params;

  return genPageMetadata({
    title: 'MILF AI Girlfriend App – Realistic Virtual Companions 24/7',
    description:
      'Chat with lifelike MILF AI girlfriends anytime. Flirty, private & realistic virtual companions designed for adults. Start your AI girlfriend experience today.',
  });
}

const HomePage = async () => {
  const initialAiGirlfriends = (await getAiGirlfriends()) as AIGirlfriend[];

  return (
    <PaddingContainer>
      <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8">
        <Image
          src="/images/banner.jpg"
          alt="Kyynk AI Girlfriend Banner"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center rounded-2xl justify-center border border-primary">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Meet Your Perfect AI Companion
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Experience intimate conversations with lifelike AI girlfriends
            </p>
          </div>
        </div>
      </div>
      <UsersList initialAiGirlfriends={initialAiGirlfriends} />
    </PaddingContainer>
  );
};

export default HomePage;
