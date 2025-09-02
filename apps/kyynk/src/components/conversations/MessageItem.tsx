import { FC } from 'react';
import { MessageType } from '@/types/messages';
import { cn } from '@/utils/tailwind/cn';
import { MessageSender } from '@prisma/client';
import { useUser } from '@/hooks/users/useUser';
import HiddenMessage from './HiddenMessage';
import MediaMessage from './MediaMessage';

interface MessageItemProps {
  message: MessageType;
}

const MessageItem: FC<MessageItemProps> = ({ message }) => {
  const { isLoggedIn } = useUser();
  const isUserMessage = message.sender === MessageSender.USER;

  const isMediaMessage = message.mediaId;

  if (!isLoggedIn() && !isUserMessage && !isMediaMessage) {
    return (
      <div className="max-w-[80%] self-start items-start">
        <HiddenMessage />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'max-w-[80%] flex flex-col',
        isUserMessage ? 'self-end items-end' : 'self-start items-start',
      )}
    >
      {isMediaMessage ? (
        <MediaMessage message={message} isUserMessage={isUserMessage} />
      ) : (
        <div
          className={cn(
            'p-3 rounded-lg break-words',
            isUserMessage
              ? 'bg-primary text-custom-black'
              : 'bg-secondary-dark text-custom-black',
          )}
          role="article"
          aria-label={`Message from ${isUserMessage ? 'you' : 'AI'}`}
        >
          {message.content}
        </div>
      )}
    </div>
  );
};

export default MessageItem;
