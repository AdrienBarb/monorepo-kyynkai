'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';
import imgixLoader from '@/lib/imgix/loader';
import { Story } from '@prisma/client';

interface MediaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaKey?: string;
  caption?: string;
  stories?: Story[];
}

const MediaViewerModal: FC<MediaViewerModalProps> = ({
  isOpen,
  onClose,
  mediaKey,
  caption,
  stories,
}) => {
  const renderSingleImage = () => (
    <div className="relative w-full h-full">
      <Image
        src={imgixLoader({
          src: mediaKey!,
          width: 400 * 3,
          quality: 80,
        })}
        alt={caption || 'Media content'}
        width={800}
        height={600}
        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        unoptimized
      />
    </div>
  );

  const renderStoriesCarousel = () => (
    <div className="relative w-full h-full">
      <Carousel className="w-full max-w-4xl">
        <CarouselContent>
          {stories?.map((story) => (
            <CarouselItem key={story.id}>
              <div className="relative w-full h-full">
                <Image
                  src={imgixLoader({
                    src: story.mediaKey,
                    width: 400 * 3,
                    quality: 80,
                  })}
                  alt="Story image"
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  unoptimized
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {stories && stories.length > 1 && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-full bg-background-light border border-primary/20 p-0 [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:border-background">
        {stories && stories.length > 0
          ? renderStoriesCarousel()
          : mediaKey
          ? renderSingleImage()
          : null}
      </DialogContent>
    </Dialog>
  );
};

export default MediaViewerModal;
