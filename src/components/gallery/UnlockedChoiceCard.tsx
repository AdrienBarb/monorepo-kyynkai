'use client';

import React, { useState } from 'react';
import { UnlockedChoice } from '@/hooks/gallery/useUnlockedChoices';
import { getCloudFrontUrl } from '@/utils/medias/getCloudFrontUrl';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  VisuallyHidden,
  DialogTitle,
} from '@/components/ui/Dialog';

interface UnlockedChoiceCardProps {
  unlockedChoice: UnlockedChoice;
}

const UnlockedChoiceCard: React.FC<UnlockedChoiceCardProps> = ({
  unlockedChoice,
}) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <div
          className="relative aspect-[9/16] w-full overflow-hidden rounded-md border border-primary/20 cursor-pointer group"
          onClick={() => setShowVideoModal(true)}
        >
          <video
            src={getCloudFrontUrl(unlockedChoice.videoUrl)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-sm font-semibold font-karla text-white leading-tight">
              {unlockedChoice.choiceLabel}
            </div>
            <Link
              href={`/${unlockedChoice.fantasy.aiGirlfriend.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-karla text-white/80 leading-tight mt-1 hover:text-white transition-colors"
            >
              {unlockedChoice.fantasy.aiGirlfriend.pseudo} •{' '}
              {unlockedChoice.fantasy.title}
            </Link>
          </div>
        </div>
      </div>

      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] w-full bg-background-light border border-primary/20 p-0 overflow-hidden flex items-center justify-center [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:border-background">
          <VisuallyHidden>
            <DialogTitle>Video Player</DialogTitle>
          </VisuallyHidden>
          <video
            src={getCloudFrontUrl(unlockedChoice.videoUrl)}
            controls
            autoPlay
            className="w-full h-full max-h-[90vh] object-contain"
            style={{ aspectRatio: '9/16' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UnlockedChoiceCard;
