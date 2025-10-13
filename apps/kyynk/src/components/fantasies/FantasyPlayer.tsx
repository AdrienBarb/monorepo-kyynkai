'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Fantasy, FantasyStep, FantasyChoice } from '@/types/fantasies';
import { usePlayFantasy } from '@/hooks/fantasies/usePlayFantasy';
import { useUser } from '@/hooks/users/useUser';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';

interface FantasyPlayerProps {
  fantasy: Fantasy;
  slug: string;
}

const FantasyPlayer: React.FC<FantasyPlayerProps> = ({ fantasy, slug }) => {
  const [currentStep, setCurrentStep] = useState<FantasyStep>(fantasy.steps[0]);
  const [isEnded, setIsEnded] = useState(false);
  const { mutate: playChoice, isPending } = usePlayFantasy(slug);
  const { user, refetch: refetchUser } = useUser();

  const handleChoiceClick = (choice: FantasyChoice) => {
    if (choice.cost && user && user.creditBalance < choice.cost) {
      alert('Insufficient credits');
      return;
    }

    playChoice(
      {
        fantasyId: fantasy.id,
        choiceId: choice.id,
      },
      {
        onSuccess: (data) => {
          if (data.nextStep) {
            setCurrentStep(data.nextStep);
          } else {
            setIsEnded(true);
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
    setIsEnded(false);
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
    <div className="h-screen flex flex-col p-4 gap-4 max-w-md mx-auto">
      <div className="flex-shrink-0">
        <div className="text-center">
          <p className="text-2xl text-primary font-medium leading-relaxed">
            {currentStep.text}
          </p>
        </div>
      </div>

      <Card className="p-0">
        {currentStep.mediaUrl && (
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src={imgixLoader({
                src: currentStep.mediaUrl,
                width: 600,
                quality: 90,
              })}
              alt="Fantasy scene"
              fill
              className="object-cover"
            />
          </div>
        )}
      </Card>

      <div className="flex gap-2 w-full">
        {currentStep.choices.map((choice) => (
          <Button
            key={choice.id}
            variant="default"
            className="flex-1 p-3 h-auto text-center justify-center min-w-0"
            onClick={() => handleChoiceClick(choice)}
            disabled={isPending}
          >
            <div className="flex flex-col items-center gap-2 justify-between w-full h-full">
              <div className="text-base leading-tight text-center break-words whitespace-normal">
                {choice.label}
              </div>
              {choice.cost && choice.cost > 0 ? (
                <div className="text-xs bg-background/10 text-background px-1 py-0.5 rounded mt-1 whitespace-nowrap">
                  {choice.cost} credits
                </div>
              ) : (
                <div className="text-xs bg-background/10 text-background px-1 py-0.5 rounded mt-1 whitespace-nowrap">
                  Free
                </div>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FantasyPlayer;
