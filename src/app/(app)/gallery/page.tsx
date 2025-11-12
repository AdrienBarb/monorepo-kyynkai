import React from 'react';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { Metadata } from 'next';
import { genPageMetadata } from '@/app/seo';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  return genPageMetadata({
    title: 'Gallery – Your Unlocked Content',
    description:
      'View all the fantasy choices you have unlocked. Browse your collection of exclusive content.',
  });
}

const GalleryPage = async () => {
  return (
    <PaddingContainer>
      <GalleryGrid />
    </PaddingContainer>
  );
};

export default GalleryPage;
