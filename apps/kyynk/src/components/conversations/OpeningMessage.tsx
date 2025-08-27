import { FC } from 'react';
import { cn } from '@/utils/tailwind/cn';
import ApiVideoPlayer from '@api.video/react-player';

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
          <ApiVideoPlayer
            style={{ aspectRatio: '4/5' }}
            video={{ id: profileVideoId }}
            hideTitle={true}
            autoplay={true}
            loop={true}
            chromeless={true}
            videoStyleObjectFit="cover"
          />
        </div>
      )}
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
