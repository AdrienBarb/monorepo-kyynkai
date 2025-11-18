import React from 'react';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import AppFAQ from '@/components/home/AppFAQ';
import { getAllFantasies } from '@/services/fantasies/getAllFantasies';
import { getTagsOrderedByFrequency } from '@/services/fantasies/getTagsOrderedByFrequency';
import FantasiesExplorer from '@/components/fantasies/FantasiesExplorer';
import { Fantasy } from '@/types/fantasies';

export type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  return genPageMetadata({
    title: 'MILF AI Girlfriend App – Realistic Virtual Companions 24/7',
    description:
      'Chat with lifelike MILF AI girlfriends anytime. Flirty, private & realistic virtual companions designed for adults. Start your AI girlfriend experience today.',
  });
}

const HomePage = async () => {
  const [initialFantasies, tags] = await Promise.all([
    getAllFantasies(),
    getTagsOrderedByFrequency(),
  ]);

  return (
    <PaddingContainer>
      <div className="relative w-full h-64 md:h-80 lg:h-80 rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 flex items-center rounded-2xl justify-center">
          <div className="text-center text-primary px-4 max-w-lg">
            <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold mb-2">
              GET YOUR FANTASY DONE
            </h1>
            <h2 className="text-sm md:text-lg opacity-80 font-light">
              Explore immersive fantasies with lifelike AI girlfriends who bring
              your deepest desires to life.
            </h2>
          </div>
        </div>
      </div>
      <FantasiesExplorer
        initialFantasies={initialFantasies as Fantasy[]}
        tags={tags}
      />
      <AppFAQ />
    </PaddingContainer>
  );
};

export default HomePage;
