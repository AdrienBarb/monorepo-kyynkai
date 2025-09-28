'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/tailwind/cn';
import { MessageType } from '@/types/messages';
import MediaViewerModal from '@/components/modals/MediaViewerModal';
import imgixLoader from '@/lib/imgix/loader';
import { usePollGeneratedMedia } from '@/hooks/messages/usePollGeneratedMedia';
import { GenerationStatus } from '@prisma/client';

interface MediaMessageProps {
  message: MessageType;
  isUserMessage: boolean;
}

const MediaMessage: FC<MediaMessageProps> = ({ message, isUserMessage }) => {
  const [showMediaModal, setShowMediaModal] = useState(false);

  const { data: generatedMediaData } = usePollGeneratedMedia(
    message.generatedMediaId || undefined,
  );

  const mediaData = generatedMediaData || message.generatedMedia;
  const isGenerating =
    mediaData?.status === GenerationStatus.PENDING ||
    mediaData?.status === GenerationStatus.PROCESSING;
  const hasFailed = mediaData?.status === GenerationStatus.FAILED;
  const isCompleted =
    mediaData?.status === GenerationStatus.COMPLETED && mediaData?.mediaKey;

  const handleMediaClick = () => {
    if (isCompleted) {
      setShowMediaModal(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="relative">
          <div
            className={cn(
              'relative rounded-lg overflow-hidden border-2 border-transparent transition-all',
              'w-48 h-64 flex items-center justify-center',
              isCompleted && 'cursor-pointer hover:border-primary/50',
              isGenerating && 'bg-background-light',
              hasFailed && 'bg-red-50 border-red-200',
            )}
            onClick={handleMediaClick}
          >
            {isGenerating && (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-sm">Generating...</span>
              </div>
            )}

            {hasFailed && (
              <div className="flex flex-col items-center gap-2 text-red-600">
                <AlertCircle className="w-6 h-6" />
                <span className="text-sm">Generation failed</span>
              </div>
            )}

            {isCompleted && mediaData?.mediaKey && (
              <Image
                src={imgixLoader({
                  src: mediaData.mediaKey,
                  width: 400,
                  quality: 80,
                })}
                alt="Generated media content"
                width={192}
                height={256}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div
          className={cn(
            'p-3 rounded-lg break-words',
            isUserMessage
              ? 'bg-primary text-background'
              : 'bg-background-light text-primary',
          )}
        >
          {message.content}
        </div>
      </div>

      {isCompleted && mediaData?.mediaKey && (
        <MediaViewerModal
          isOpen={showMediaModal}
          onClose={() => setShowMediaModal(false)}
          mediaKey={mediaData.mediaKey}
          caption={message.content}
        />
      )}
    </>
  );
};

export default MediaMessage;
