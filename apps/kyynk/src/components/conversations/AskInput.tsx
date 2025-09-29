'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { NUDE_ACTIONS, NudeActionType } from '@/constants/nudeActions';

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

  const handleNudeRequest = (actionType: NudeActionType) => {
    if (!loggedUser) {
      openModal('auth', { avatarImageId: aiGirlfriend?.profileImageId });
      return;
    }

    const action = NUDE_ACTIONS.find((a) => a.id === actionType);
    if (!action) return;

    if (
      !hasEnoughCredits({
        user: loggedUser,
        requiredCredits: action.credits,
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
      actionType,
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
      <DropdownMenuContent align="start" side="top" className="w-80">
        {NUDE_ACTIONS.map((action, index) => (
          <React.Fragment key={action.id}>
            <DropdownMenuItem
              onClick={() => handleNudeRequest(action.id)}
              className="flex flex-col items-start p-3 cursor-pointer"
            >
              <div className="flex justify-between w-full items-center">
                <span className="font-medium text-sm">{action.label}</span>
                <span className="text-xs text-muted-foreground">
                  {action.credits} credits
                </span>
              </div>
            </DropdownMenuItem>
            {index < NUDE_ACTIONS.length - 1 && (
              <DropdownMenuSeparator className="bg-primary/20" />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AskInput;
