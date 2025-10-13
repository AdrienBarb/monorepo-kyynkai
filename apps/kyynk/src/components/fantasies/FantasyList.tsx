'use client';

import React from 'react';
import { useFantasies } from '@/hooks/fantasies/useFantasies';
import FantasyCard from './FantasyCard';
import { Skeleton } from '@/components/ui/Skeleton';
import NoResults from '@/components/common/NoResults';

interface FantasyListProps {
  slug: string;
}

const FantasyList: React.FC<FantasyListProps> = ({ slug }) => {
  const { data: fantasies, isLoading, error } = useFantasies(slug);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Failed to load fantasies. Please try again.
        </p>
      </div>
    );
  }

  if (!fantasies || fantasies.length === 0) {
    return (
      <NoResults text="No fantasies available. Check back later for new interactive stories!" />
    );
  }

  return (
    <div className="space-y-4">
      {fantasies.map((fantasy: any) => (
        <FantasyCard key={fantasy.id} fantasy={fantasy} slug={slug} />
      ))}
    </div>
  );
};

export default FantasyList;
