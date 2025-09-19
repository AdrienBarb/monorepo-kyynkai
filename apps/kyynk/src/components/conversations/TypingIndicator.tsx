'use client';

import { FC } from 'react';
import { cn } from '@/utils/tailwind/cn';

const TypingIndicator: FC = () => {
  const typingDots = [0, 150, 300];

  return (
    <div className={cn('max-w-[80%] flex flex-col self-start items-start')}>
      <div
        className={cn(
          'p-3 rounded-lg break-words bg-background text-background',
          'flex items-center',
        )}
        role="status"
        aria-label="AI is typing"
      >
        <div className="flex items-center space-x-1">
          {typingDots.map((delay, index) => (
            <div
              key={index}
              className="h-1 w-1 bg-background/60 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
