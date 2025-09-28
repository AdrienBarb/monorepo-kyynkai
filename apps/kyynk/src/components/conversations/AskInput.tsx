'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { useUser } from '@/hooks/users/useUser';
import { hasEnoughCredits } from '@/utils/users/hasEnoughCredits';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import { errorMessages } from '@/lib/constants/errorMessage';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';
import { trackingEvent } from '@/constants/trackingEvent';
import { useFetchCurrentAiGirlfriend } from '@/hooks/ai-girlfriends/useFetchCurrentAiGirlfriend';
import { NUDE_COST } from '@/constants/creditPackages';

interface AskInputProps {
  disabled?: boolean;
  onSuccess?: () => void;
}

const AskInput: React.FC<AskInputProps> = ({ disabled = false, onSuccess }) => {
  const t = useTranslations();
  const { user: loggedUser, refetch: refetchUser } = useUser();
  const { openModal } = useGlobalModalStore();
  const { slug } = useParams<{ slug: string }>();
  const { sendEventOnce } = useClientPostHogEvent();
  const { aiGirlfriend } = useFetchCurrentAiGirlfriend();
  const { usePost } = useApi();

  const { mutate: generateNude, isPending: isGeneratingNude } = usePost(
    '/api/generate-nude',
    {
      onSuccess: () => {
        sendEventOnce({
          eventName: trackingEvent.media_requested,
        });

        if (loggedUser) {
          refetchUser();
        }

        onSuccess?.();
      },
      onError: (err: any) => {
        if (err === errorMessages.AUTH_REQUIRED) {
          openModal('auth', { avatarImageId: aiGirlfriend?.profileImageId });
        }
      },
    },
  );

  const handleNudeRequest = () => {
    if (!loggedUser) {
      openModal('auth', { avatarImageId: aiGirlfriend?.profileImageId });
      return;
    }

    if (
      !hasEnoughCredits({
        user: loggedUser,
        requiredCredits: NUDE_COST,
      })
    ) {
      sendEventOnce({
        eventName: trackingEvent.credit_wall_shown,
      });
      openModal('notEnoughCredits');
      return;
    }

    generateNude({
      slug: slug as string,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Get a picture"
          size="sm"
          disabled={disabled || isGeneratingNude}
          className="flex items-center gap-2 h-10"
        >
          <Camera className="w-4 h-4" />
          <span className="text-sm">Ask</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top">
        <DropdownMenuItem onClick={handleNudeRequest}>
          <div className="flex flex-col">
            <span className="font-medium">Nude ({NUDE_COST} credits)</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AskInput;
