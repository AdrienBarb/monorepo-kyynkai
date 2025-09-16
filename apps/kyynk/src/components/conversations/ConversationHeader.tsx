import { FC } from 'react';
import Avatar from '../ui/Avatar';
import Text from '../ui/Text';
import { AiGirlfriendType } from '@/types/ai-girlfriends';

interface Props {
  aiGirlfriend: AiGirlfriendType;
}

const ConversationHeader: FC<Props> = ({ aiGirlfriend }) => {
  return (
    <div className="flex items-center gap-2 h-20 px-2">
      <Avatar
        imageId={aiGirlfriend.profileImageId}
        size={60}
        className="border-primary"
      />
      <Text className="text-lg font-bold text-primary">
        {aiGirlfriend.pseudo}
      </Text>
    </div>
  );
};

export default ConversationHeader;
