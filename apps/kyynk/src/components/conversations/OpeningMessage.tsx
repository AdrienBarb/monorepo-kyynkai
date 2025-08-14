import { FC } from 'react';
import { cn } from '@/utils/tailwind/cn';

interface OpeningMessageProps {
  content: string;
}

const OpeningMessage: FC<OpeningMessageProps> = ({ content }) => {
  return (
    <div className={cn('max-w-[80%] flex flex-col self-start items-start')}>
      <div
        className={cn(
          'p-3 rounded-lg break-words bg-secondary-dark text-custom-black',
        )}
        role="article"
        aria-label="Opening message from AI"
      >
        {content}
      </div>
    </div>
  );
};

export default OpeningMessage;
