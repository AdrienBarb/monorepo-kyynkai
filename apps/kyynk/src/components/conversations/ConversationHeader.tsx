'use client';

import { FC, useState } from 'react';
import Avatar from '../ui/Avatar';
import Text from '../ui/Text';
import MediaViewerModal from '../modals/MediaViewerModal';
import { AiGirlfriendType } from '@/types/ai-girlfriends';
import { trackingEvent } from '@/constants/trackingEvent';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';

interface Props {
  aiGirlfriend: AiGirlfriendType;
}

const ConversationHeader: FC<Props> = ({ aiGirlfriend }) => {
  const [isStoriesModalOpen, setIsStoriesModalOpen] = useState(false);
  const { sendEventOnce } = useClientPostHogEvent();

  const handleAvatarClick = () => {
    if (aiGirlfriend.stories && aiGirlfriend.stories.length > 0) {
      sendEventOnce({
        eventName: trackingEvent.stories_modal_open,
      });
      setIsStoriesModalOpen(true);
    }
  };

  const hasStories = aiGirlfriend.stories && aiGirlfriend.stories.length > 0;

  return (
    <>
      <div className="flex items-center gap-2 h-20 px-2">
        {hasStories ? (
          <div
            className="rounded-full bg-[#F24940] p-1 cursor-pointer"
            onClick={handleAvatarClick}
          >
            <Avatar
              imageId={aiGirlfriend.profileImageId}
              size={52}
              className="border-2 border-background"
            />
          </div>
        ) : (
          <Avatar imageId={aiGirlfriend.profileImageId} size={60} />
        )}

        <Text className="text-lg font-bold text-primary">
          {aiGirlfriend.pseudo}
        </Text>
      </div>

      <MediaViewerModal
        isOpen={isStoriesModalOpen}
        onClose={() => setIsStoriesModalOpen(false)}
        stories={aiGirlfriend.stories}
      />
    </>
  );
};

export default ConversationHeader;
