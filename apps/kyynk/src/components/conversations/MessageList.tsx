import { FC } from 'react';
import { MessageWithNudePermissions } from '@/types/messages';
import MessageAttachment from './MessageAttachment';
import { cn } from '@/utils/tailwind/cn';

interface Props {
  messages: MessageWithNudePermissions[];
  currentUserId: string | undefined;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const MessageList: FC<Props> = ({ messages, currentUserId, scrollRef }) => {
  return (
    <div
      className="flex flex-col gap-4 px-4 h-[100%] w-full overflow-y-scroll"
      ref={scrollRef}
    >
      {messages?.map((currentMessage) => {
        const isMyMessage = currentMessage.senderId === currentUserId;

        return (
          <div
            key={currentMessage.id}
            className={cn(
              'max-w-[80%] flex flex-col',
              isMyMessage ? 'self-end' : 'self-start',
              isMyMessage ? 'items-end' : 'items-start',
            )}
          >
            {currentMessage.attachment && (
              <MessageAttachment attachment={currentMessage.attachment} />
            )}
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
