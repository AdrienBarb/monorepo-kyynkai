'use client';

import ConversationInput from './ConversationInput';
import MessageList from './MessageList';
import { useChatScroll } from '@/hooks/messages/useChatScroll';
import { useFetchMessages } from '@/hooks/messages/useFetchMessages';

const ProfileConversationInput = ({
  chatOpeningLine,
  profileVideoId,
}: {
  chatOpeningLine: string;
  profileVideoId?: string | null;
}) => {
  const { messages } = useFetchMessages();

  const ref = useChatScroll(messages);

  return (
    <div className="flex flex-col h-full px-2">
      <div className="flex-1 min-h-0">
        <MessageList
          messages={messages}
          scrollRef={ref}
          chatOpeningLine={chatOpeningLine}
          profileVideoId={profileVideoId}
        />
      </div>
      <div className="sticky bottom-0 h-36">
        <ConversationInput />
      </div>
    </div>
  );
};

export default ProfileConversationInput;
