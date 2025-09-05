'use client';

import { FC, useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/tailwind/cn';
import { MessageType } from '@/types/messages';
import { useUser } from '@/hooks/users/useUser';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import { hasEnoughCredits } from '@/utils/users/hasEnoughCredits';
import { MEDIA_UNLOCK_COST } from '@/constants/creditPackages';
import useApi from '@/hooks/requests/useApi';
import { useFetchMessages } from '@/hooks/messages/useFetchMessages';
import MediaViewerModal from '@/components/modals/MediaViewerModal';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';
import { trackingEvent } from '@/constants/trackingEvent';

interface MediaMessageProps {
  message: MessageType;
  isUserMessage: boolean;
}

const MediaMessage: FC<MediaMessageProps> = ({ message, isUserMessage }) => {
  const { user: loggedUser, refetch: refetchUser } = useUser();
  const { openModal } = useGlobalModalStore();
  const { refetch: refetchMessages } = useFetchMessages();
  const { usePost } = useApi();
  const [showMediaModal, setShowMediaModal] = useState(false);
  const { sendEvent } = useClientPostHogEvent();

  const { mutate: unlockMedia, isPending: isUnlocking } = usePost(
    '/api/unlock-media',
    {
      onSuccess: () => {
        sendEvent({
          eventName: trackingEvent.media_unlocked,
        });
        refetchMessages();
        if (loggedUser) {
          refetchUser();
        }
      },
      onError: (err: any) => {
        if (err === 'AUTH_REQUIRED') {
          openModal('auth');
        }
      },
    },
  );

  const handleUnlockMedia = () => {
    if (!loggedUser) {
      sendEvent({
        eventName: trackingEvent.signup_media_unlock_wall_shown,
      });
      openModal('auth');
      return;
    }

    if (
      !hasEnoughCredits({
        user: loggedUser,
        requiredCredits: MEDIA_UNLOCK_COST,
      })
    ) {
      sendEvent({
        eventName: trackingEvent.credit_media_unlock_wall_shown,
      });
      openModal('notEnoughCredits');
      return;
    }

    unlockMedia({ messageId: message.id });
  };

  const handleMediaClick = () => {
    if (message.media?.unlockUsers.includes(loggedUser?.id!)) {
      setShowMediaModal(true);
    } else {
      handleUnlockMedia();
    }
  };

  const isLocked = !message.media?.unlockUsers.includes(loggedUser?.id!);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            'p-3 rounded-lg break-words',
            isUserMessage
              ? 'bg-primary text-custom-black'
              : 'bg-secondary-dark text-custom-black',
          )}
        >
          {message.content}
        </div>

        <div className="relative">
          <div
            className={cn(
              'relative rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all',
              'w-48 h-32',
            )}
            onClick={handleMediaClick}
          >
            {message.media?.mediaKey && (
              <img
                src={message.media?.mediaKey}
                alt="Media content"
                className={cn(
                  'w-full h-full object-cover',
                  isLocked && 'blur-lg',
                )}
              />
            )}

            {isLocked && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Button
                    size="sm"
                    variant="default"
                    disabled={isUnlocking}
                    isLoading={isUnlocking}
                    className="text-xs text-custom-black"
                  >
                    🔓
                    {loggedUser
                      ? ` Unlock for ${MEDIA_UNLOCK_COST} credits`
                      : ' See her picture'}
                  </Button>
                </div>
              </div>
            )}

            {!isLocked && (
              <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                <Eye className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      <MediaViewerModal
        isOpen={showMediaModal}
        onClose={() => setShowMediaModal(false)}
        mediaUrl={message.media?.mediaKey || ''}
        caption={message.content}
      />
    </>
  );
};

export default MediaMessage;
