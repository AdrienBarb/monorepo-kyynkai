'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import imgixLoader from '@/lib/imgix/loader';

interface MediaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaKey?: string;
  caption?: string;
}

const MediaViewerModal: FC<MediaViewerModalProps> = ({
  isOpen,
  onClose,
  mediaKey,
  caption,
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-full bg-background-light border border-primary/20 p-0 [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:border-background">
        {mediaKey ? renderSingleImage() : null}
      </DialogContent>
    </Dialog>
  );
};

export default MediaViewerModal;
