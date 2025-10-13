'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Fantasy } from '@/types/fantasies';
import Link from 'next/link';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';

interface FantasyCardProps {
  fantasy: Fantasy;
  slug: string;
}

const FantasyCard: React.FC<FantasyCardProps> = ({ fantasy, slug }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Cover Image */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imgixLoader({
            src: fantasy.mediaUrl,
            width: 400,
            quality: 85,
          })}
          alt={fantasy.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold font-karla text-primary">
          {fantasy.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {fantasy.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {fantasy.steps.length} steps
          </span>

          <Link href={`/${slug}/fantasy/${fantasy.id}`}>
            <Button size="sm" className="text-sm">
              Play
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default FantasyCard;
