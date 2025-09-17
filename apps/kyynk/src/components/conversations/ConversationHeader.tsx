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
      <div className="rounded-full bg-[#F24940] p-1 cursor-pointer">
        <Avatar
          imageId={aiGirlfriend.profileImageId}
          size={52}
          className="border-2 border-background"
        />
      </div>

      <Text className="text-lg font-bold">{aiGirlfriend.pseudo}</Text>
    </div>
  );
};

export default ConversationHeader;
