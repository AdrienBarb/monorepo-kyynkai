import { FC } from 'react';
import { MessageType } from '@/types/messages';
import { cn } from '@/utils/tailwind/cn';
import { MessageSender } from '@prisma/client';

interface Props {
  messages: MessageType[];
  scrollRef: React.RefObject<HTMLDivElement>;
}

const MessageList: FC<Props> = ({ messages, scrollRef }) => {
  return (
    <div
      className="flex flex-col gap-4 px-4 py-4 w-full overflow-y-scroll"
      ref={scrollRef}
      style={{ height: 'calc(100dvh - 5rem - 9rem - 68px)' }}
    >
      {messages?.map((currentMessage) => {
        const isMyMessage = currentMessage.sender === MessageSender.USER;

        return (
          <div
            key={currentMessage.id}
            className={cn(
              'max-w-[80%] flex flex-col',
              isMyMessage ? 'self-end' : 'self-start',
              isMyMessage ? 'items-end' : 'items-start',
            )}
          >
            <p
              className={cn(
                'p-2 rounded-lg',
                isMyMessage
                  ? 'bg-primary text-custom-black'
                  : 'bg-secondary-dark text-custom-black',
              )}
            >
              {currentMessage.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
