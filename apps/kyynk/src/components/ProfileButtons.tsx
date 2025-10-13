'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';
import { trackingEvent } from '@/constants/trackingEvent';

interface ProfileButtonsProps {
  slug: string;
  firstFantasyId?: string;
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({
  slug,
  firstFantasyId,
}) => {
  const { sendEvent } = useClientPostHogEvent();

  const handleChatClick = () => {
    sendEvent({
      eventName: trackingEvent.profile_chat_button_clicked,
      properties: {
        character_slug: slug,
      },
    });
  };

  const handlePlayClick = () => {
    sendEvent({
      eventName: trackingEvent.profile_play_button_clicked,
      properties: {
        character_slug: slug,
        fantasy_id: firstFantasyId,
      },
    });
  };

  return (
    <div className="w-full flex gap-2 items-center justify-center">
      <Link href={`/${slug}/chat`} className="w-full">
        <Button
          className="w-full text-lg font-semibold"
          onClick={handleChatClick}
        >
          Chat
        </Button>
      </Link>

      {firstFantasyId && (
        <Link href={`/${slug}/fantasy/${firstFantasyId}`} className="w-full">
          <Button
            variant="secondary"
            className="w-full text-lg font-semibold text-background"
            style={{
              background:
                'linear-gradient(90deg, hsla(234, 80%, 88%, 1) 0%, hsla(340, 68%, 88%, 1) 50%, hsla(342, 72%, 85%, 1) 100%)',
            }}
            onClick={handlePlayClick}
          >
            Play
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProfileButtons;
