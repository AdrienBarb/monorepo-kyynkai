import { FC } from 'react';
import { MessageType } from '@/types/messages';
import { cn } from '@/utils/tailwind/cn';
import { MessageSender } from '@prisma/client';

interface MessageItemProps {
  message: MessageType;
}

const MessageItem: FC<MessageItemProps> = ({ message }) => {
  const isUserMessage = message.sender === MessageSender.USER;

  return (
    <div
      className={cn(
        'max-w-[80%] flex flex-col',
        isUserMessage ? 'self-end items-end' : 'self-start items-start',
      )}
    >
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
    </div>
  );
};

export default MessageItem;
