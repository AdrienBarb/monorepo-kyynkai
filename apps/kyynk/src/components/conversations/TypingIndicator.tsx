'use client';

import { FC } from 'react';
import { cn } from '@/utils/tailwind/cn';

const TypingIndicator: FC = () => {
  const typingDots = [0, 150, 300];

  return (
    <div className={cn('max-w-[80%] flex flex-col self-start items-start')}>
      <div
        className={cn(
          'p-3 rounded-lg break-words bg-secondary-dark text-custom-black',
          'flex items-center',
        )}
        role="status"
        aria-label="AI is typing"
      >
        <div className="flex items-center space-x-1">
          {typingDots.map((delay, index) => (
            <div
              key={index}
              className="h-1 w-1 bg-custom-black/60 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
