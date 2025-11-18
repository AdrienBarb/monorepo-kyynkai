import React from 'react';
import Link from 'next/link';
import { Fantasy } from '@/types/fantasies';
import { getCloudFrontUrl } from '@/utils/medias/getCloudFrontUrl';
import { Play } from 'lucide-react';

interface Props {
  fantasy: Fantasy;
}

const formatViewCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const FantasyCard = ({ fantasy }: Props) => {
  const viewCount = fantasy.viewCount ?? 0;
  return (
    <Link href={`/fantasy/${fantasy.id}`} prefetch={true}>
      <div className="flex flex-col">
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md border border-primary/20">
          <video
            src={getCloudFrontUrl(fantasy.videoUrl)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute top-2 right-2 flex flex-col items-center gap-0.5 bg-black/40 backdrop-blur-sm rounded-md px-2 py-1.5">
            <Play className="w-3.5 h-3.5 text-white" fill="white" />
            <span className="text-xs font-semibold font-karla text-white leading-none">
              {formatViewCount(viewCount)}
            </span>
          </div>
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
