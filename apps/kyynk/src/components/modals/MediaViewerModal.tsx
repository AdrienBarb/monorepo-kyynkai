'use client';

import { FC } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/tailwind/cn';

interface MediaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  caption?: string;
}

const MediaViewerModal: FC<MediaViewerModalProps> = ({
  isOpen,
  onClose,
  mediaUrl,
  caption,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-black/50 border-white/20 text-white hover:bg-black/70"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="bg-black rounded-lg overflow-hidden">
          <img
            src={mediaUrl}
            alt={caption || 'Media content'}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaViewerModal;
