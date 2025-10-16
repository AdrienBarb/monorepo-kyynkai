'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Fantasy, FantasyStep, FantasyChoice } from '@/types/fantasies';
import { usePlayFantasy } from '@/hooks/fantasies/usePlayFantasy';
import { useUser } from '@/hooks/users/useUser';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import { useFetchCurrentAiGirlfriend } from '@/hooks/ai-girlfriends/useFetchCurrentAiGirlfriend';
import { hasEnoughCredits } from '@/utils/users/hasEnoughCredits';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';
import { trackingEvent } from '@/constants/trackingEvent';

interface FantasyPlayerProps {
  fantasy: Fantasy;
  slug: string;
}

const FantasyPlayer: React.FC<FantasyPlayerProps> = ({ fantasy, slug }) => {
  const [currentStep, setCurrentStep] = useState<FantasyStep>(fantasy.steps[0]);
  const [currentMediaUrl, setCurrentMediaUrl] = useState<string>(
    fantasy.mediaUrl,
  );
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(
    fantasy.videoUrl ?? null,
  );

  const [isEnded, setIsEnded] = useState(false);
  const [isFinalImage, setIsFinalImage] = useState(false);
  const { mutate: playChoice, isPending } = usePlayFantasy(slug);
  const { user, refetch: refetchUser } = useUser();
  const { openModal } = useGlobalModalStore();
  const { aiGirlfriend } = useFetchCurrentAiGirlfriend();
  const { sendEvent } = useClientPostHogEvent();

  const handleChoiceClick = (choice: FantasyChoice) => {
    sendEvent({
      eventName: trackingEvent.fantasy_choice_clicked,
      properties: {
        character_slug: slug,
        fantasy_id: fantasy.id,
        choice_id: choice.id,
        choice_label: choice.label,
        choice_cost: choice.cost ?? 0,
        step_id: currentStep.id,
      },
    });

    if (!user) {
      openModal('auth', { avatarImageId: aiGirlfriend?.profileImageId });
      return;
    }

    if (
      !hasEnoughCredits({
        user: user,
        requiredCredits: choice.cost ?? 0,
      })
    ) {
      openModal('notEnoughCredits');
      return;
    }

    playChoice(
      {
        fantasyId: fantasy.id,
        choiceId: choice.id,
      },
      {
        onSuccess: (data) => {
          // Update video URL if exists, otherwise update media URL
          if (choice.videoUrl) {
            setCurrentVideoUrl(choice.videoUrl);
          } else if (choice.mediaUrl) {
            setCurrentMediaUrl(choice.mediaUrl);
            setCurrentVideoUrl(null);
          } else {
            console.warn('Choice has no media, keeping current media');
          }

          if (data.nextStep) {
            setCurrentStep(data.nextStep);
          } else {
            // Final choice - show image but hide buttons
            setIsFinalImage(true);
            sendEvent({
              eventName: trackingEvent.fantasy_completed,
              properties: {
                character_slug: slug,
                fantasy_id: fantasy.id,
                final_choice_id: choice.id,
              },
            });
          }

          if (data.creditsUsed > 0) {
            refetchUser();
          }
        },
        onError: (error) => {
          console.error('Error playing choice:', error);
          alert('Something went wrong. Please try again.');
        },
      },
    );
  };

  const resetFantasy = () => {
    setCurrentStep(fantasy.steps[0]);
    setCurrentMediaUrl(fantasy.mediaUrl);
    setCurrentVideoUrl(fantasy.videoUrl ?? null);
    setIsEnded(false);
    setIsFinalImage(false);
  };

  if (isEnded) {
    return (
      <Card className="p-6 text-center">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold font-karla text-primary">
            Story Complete
          </h2>
          <p className="text-muted-foreground">
            Thanks for playing! Want to try again?
          </p>
          <Button onClick={resetFantasy}>Play Again</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="h-screen flex flex-col p-4 max-w-md mx-auto">
      <Card className="p-0 relative">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
          {currentVideoUrl ? (
            <video
              className="w-full h-full object-cover"
              src={`https://ddl4c6oftb93z.cloudfront.net/${currentVideoUrl}`}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={imgixLoader({
                src: currentMediaUrl,
                width: 600,
                quality: 90,
              })}
              alt="Fantasy scene"
              fill
              className="object-cover"
            />
          )}

          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

          {/* Text and buttons overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 space-y-3">
            {/* Story text */}
            <div className="text-center">
              <p className="text-sm text-white font-light leading-relaxed drop-shadow-lg">
                {currentStep.text}
              </p>
            </div>

            {/* Choice buttons */}
            {!isFinalImage && (
              <div className="flex gap-2 w-full">
                {currentStep.choices.map((choice) => (
                  <Button
                    key={choice.id}
                    variant="default"
                    className="flex-1 p-1 h-auto text-center justify-center min-w-0 bg-background/10 border-primary hover:bg-background/20"
                    onClick={() => handleChoiceClick(choice)}
                    disabled={isPending}
                  >
                    <div className="flex flex-col items-center justify-between w-full h-full">
                      <div className="text-base leading-tight text-center text-primary break-words whitespace-normal">
                        {choice.label}
                      </div>
                      {choice.cost && choice.cost > 0 ? (
                        <div className="text-xs bg-background/10 text-primary px-1 py-0.5 rounded mt-1 whitespace-nowrap">
                          {choice.cost} credits
                        </div>
                      ) : (
                        <div className="text-xs bg-background/10 text-primary px-1 py-0.5 rounded mt-1 whitespace-nowrap">
                          Free
                        </div>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {/* Play Again button */}
            {isFinalImage && (
              <div className="flex justify-center">
                <Button onClick={resetFantasy} variant="default">
                  Play Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FantasyPlayer;
