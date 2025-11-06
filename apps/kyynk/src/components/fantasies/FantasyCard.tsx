import React from 'react';
import Link from 'next/link';
import { Fantasy } from '@/types/fantasies';

interface Props {
  fantasy: Fantasy;
}

const FantasyCard = ({ fantasy }: Props) => {
  return (
    <Link href={`/${fantasy.aiGirlfriend.slug}`} prefetch={true}>
      <div className="flex flex-col">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-primary/20">
          <video
            src={`https://ddl4c6oftb93z.cloudfront.net/${fantasy.videoUrl}`}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-xl font-bold font-karla text-white leading-tight">
              {fantasy.title}
            </div>
            <div className="text-sm font-semibold font-karla text-white/80 leading-tight mt-1">
              {fantasy.aiGirlfriend.pseudo}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FantasyCard;
