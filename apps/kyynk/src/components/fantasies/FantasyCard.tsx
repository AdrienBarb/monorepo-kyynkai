'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Fantasy } from '@/types/fantasies';
import Link from 'next/link';

interface FantasyCardProps {
  fantasy: Fantasy;
  slug: string;
}

const FantasyCard: React.FC<FantasyCardProps> = ({ fantasy, slug }) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-3">
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
