'use client';

import ConversationInput from './ConversationInput';
import MessageList from './MessageList';
import { useChatScroll } from '@/hooks/messages/useChatScroll';
import { useFetchMessages } from '@/hooks/messages/useFetchMessages';

const ProfileConversationInput = ({
  chatOpeningLine,
}: {
  chatOpeningLine: string;
}) => {
  const { messages } = useFetchMessages();

  const ref = useChatScroll(messages);

  return (
    <div className="px-2">
      <MessageList
        messages={messages}
        scrollRef={ref}
        chatOpeningLine={chatOpeningLine}
      />
      <div className="sticky bottom-0 h-36">
        <ConversationInput />
      </div>
    </div>
  );
};

export default ProfileConversationInput;
