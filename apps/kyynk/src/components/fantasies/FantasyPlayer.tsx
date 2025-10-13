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
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          {currentStep.mediaUrl && (
            <div className="relative aspect-video w-full max-w-md mx-auto overflow-hidden rounded-lg">
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
              {currentStep.mediaCost && (
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {currentStep.mediaCost} credits
                </div>
              )}
            </div>
          )}

          <div className="text-center">
            <p className="text-lg text-primary font-medium leading-relaxed">
              {currentStep.text}
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {currentStep.choices.map((choice) => (
          <Button
            key={choice.id}
            variant="secondary"
            className="w-full p-4 h-auto text-left justify-start"
            onClick={() => handleChoiceClick(choice)}
            disabled={isPending}
          >
            <div className="flex items-center justify-between w-full">
              <span>{choice.label}</span>
              {choice.cost && choice.cost > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {choice.cost} credits
                </span>
              )}
            </div>
          </Button>
        ))}
      </div>

      {user && (
        <div className="text-center text-sm text-muted-foreground">
          Credits: {user.creditBalance}
        </div>
      )}
    </div>
  );
};

export default FantasyPlayer;
