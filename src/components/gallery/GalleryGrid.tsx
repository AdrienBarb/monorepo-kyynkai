'use client';

import React from 'react';
import {
  useUnlockedChoices,
  UnlockedChoice,
} from '@/hooks/gallery/useUnlockedChoices';
import UnlockedChoiceCard from './UnlockedChoiceCard';
import { Skeleton } from '@/components/ui/Skeleton';
import Title from '../ui/Title';
import { useSession } from '@/lib/better-auth/auth-client';
import { Button } from '../ui/Button';
import Link from 'next/link';

const GalleryGrid: React.FC = () => {
  const { data: session } = useSession();
  const { unlockedChoices, isLoading, error } = useUnlockedChoices();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Title Tag="h2" className="text-primary">
          Gallery
        </Title>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton className="aspect-[9/16] w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Title Tag="h2" className="text-primary">
          Gallery
        </Title>
        <div className="text-center py-8 text-primary/60">
          Failed to load gallery. Please try again later.
        </div>
      </div>
    );
  }

  if (!session?.user?.id) {
    return (
      <div className="space-y-4">
        <Title Tag="h2" className="text-primary">
          Gallery
        </Title>
        <div className="text-center py-8 text-primary/60">
          Please log in to view your unlocked content.
        </div>
      </div>
    );
  }

  if (!unlockedChoices || unlockedChoices.length === 0) {
    return (
      <div className="space-y-4">
        <Title Tag="h2" className="text-primary">
          Gallery
        </Title>
        <div className="text-center py-8 text-primary/60 space-y-4">
          <p>
            You haven&apos;t unlocked any choices yet. Start exploring fantasies
            to unlock content!
          </p>
          <Link href="/">
            <Button variant="secondary">Start exploring</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Title Tag="h2" className="text-primary">
        Gallery
      </Title>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {unlockedChoices.map((unlockedChoice: UnlockedChoice) => (
          <UnlockedChoiceCard
            key={unlockedChoice.id}
            unlockedChoice={unlockedChoice}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
