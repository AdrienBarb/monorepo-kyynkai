import { FC, useMemo } from 'react';
import { MessageType } from '@/types/messages';
import { useTypingIndicatorStore } from '@/stores/TypingIndicatorStore';
import MessageItem from './MessageItem';
import OpeningMessage from './OpeningMessage';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: MessageType[];
  scrollRef: React.RefObject<HTMLDivElement>;
  chatOpeningLine: string;
  profileVideoId?: string | null;
  isAiTyping?: boolean;
}

const MessageList: FC<MessageListProps> = ({
  messages,
  scrollRef,
  chatOpeningLine,
  profileVideoId,
}) => {
  const { isAiTyping } = useTypingIndicatorStore();

  const memoizedMessages = useMemo(() => messages, [messages]);

  return (
    <div
      className="flex flex-col gap-4 py-4 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      ref={scrollRef}
      style={{ height: 'calc(100dvh - 9rem - 68px)' }}
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      <OpeningMessage
        content={chatOpeningLine}
        profileVideoId={profileVideoId}
      />

      {memoizedMessages?.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {isAiTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageList;
