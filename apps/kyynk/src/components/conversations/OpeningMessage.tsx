import { FC } from 'react';
import { cn } from '@/utils/tailwind/cn';

interface OpeningMessageProps {
  content: string;
  profileVideoId?: string | null;
}

const OpeningMessage: FC<OpeningMessageProps> = ({
  content,
  profileVideoId,
}) => {
  return (
    <div className={cn('max-w-[80%] flex flex-col self-start items-start')}>
      {profileVideoId && (
        <div className="mb-3 w-full max-w-56 rounded-lg overflow-hidden">
          <video
            className="w-full h-full object-cover"
            style={{ aspectRatio: '4/5' }}
            src={`https://ddl4c6oftb93z.cloudfront.net/${profileVideoId}`}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      )}
      <div
        className={cn(
          'p-3 rounded-lg break-words bg-background-light text-primary',
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
