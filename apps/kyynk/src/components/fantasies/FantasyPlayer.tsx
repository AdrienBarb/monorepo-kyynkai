'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
import { MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';

interface FantasyPlayerProps {
  fantasy: Fantasy;
  slug: string;
}

interface StepHistoryItem {
  stepId: string;
  videoUrl: string;
}

const FantasyPlayer: React.FC<FantasyPlayerProps> = ({ fantasy, slug }) => {
  const [stepId, setStepId] = useQueryState('step', {
    defaultValue: fantasy.steps[0].id,
    history: 'push',
    shallow: true,
  });

  const [historyParam, setHistoryParam] = useQueryState('history');

  const [unlockedChoices, setUnlockedChoices] = useState<Set<string>>(() => {
    const unlocked = new Set<string>();
    fantasy.steps.forEach((step) => {
      step.choices.forEach((choice) => {
        if (choice.isUnlocked) {
          unlocked.add(choice.id);
        }
      });
    });
    return unlocked;
  });

  const stepsMap = useMemo(() => {
    const map = new Map<string, FantasyStep>();
    fantasy.steps.forEach((step) => {
      const stepWithUnlocked = {
        ...step,
        choices: step.choices.map((choice) => ({
          ...choice,
          isUnlocked: unlockedChoices.has(choice.id),
        })),
      };
      map.set(step.id, stepWithUnlocked);
    });
    return map;
  }, [fantasy.steps, unlockedChoices]);

  const initialStep = stepsMap.get(stepId) || fantasy.steps[0];

  const initialHistory = useMemo(() => {
    if (historyParam) {
      try {
        const parsed = JSON.parse(
          decodeURIComponent(historyParam),
        ) as StepHistoryItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse history from URL:', e);
      }
    }
    return [
      {
        stepId: initialStep.id,
        videoUrl: fantasy.videoUrl,
      },
    ];
  }, [historyParam, initialStep.id, fantasy.videoUrl]);

  const [currentStep, setCurrentStep] = useState<FantasyStep>(initialStep);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(
    initialHistory[initialHistory.length - 1]?.videoUrl || fantasy.videoUrl,
  );
  const [stepHistory, setStepHistory] =
    useState<StepHistoryItem[]>(initialHistory);
  const [isFinalImage, setIsFinalImage] = useState(false);

  const { mutate: playChoice, isPending } = usePlayFantasy(slug);
  const { user, refetch: refetchUser } = useUser();
  const { openModal } = useGlobalModalStore();
  const { aiGirlfriend } = useFetchCurrentAiGirlfriend();
  const { sendEvent } = useClientPostHogEvent();

  useEffect(() => {
    const step = stepsMap.get(stepId || fantasy.steps[0].id);
    if (step) {
      setCurrentStep(step);
    }
  }, [stepsMap, stepId, fantasy.steps]);

  const updateHistoryInUrl = (history: StepHistoryItem[]) => {
    if (history.length > 1) {
      const encoded = encodeURIComponent(JSON.stringify(history));
      setHistoryParam(encoded as any);
    } else {
      setHistoryParam(null as any);
    }
  };

  const navigateToChoice = (choice: FantasyChoice) => {
    const newVideoUrl = choice.videoUrl;

    if (choice.nextStepId) {
      const nextStep = stepsMap.get(choice.nextStepId);
      if (nextStep) {
        const newHistory = [
          ...stepHistory,
          {
            stepId: nextStep.id,
            videoUrl: newVideoUrl,
          },
        ];
        setCurrentStep(nextStep);
        setCurrentVideoUrl(newVideoUrl);
        setStepHistory(newHistory);
        updateHistoryInUrl(newHistory);
        setStepId(nextStep.id);
      }
    } else {
      const newHistory = [
        ...stepHistory,
        {
          stepId: currentStep.id,
          videoUrl: newVideoUrl,
        },
      ];
      setCurrentVideoUrl(newVideoUrl);
      setStepHistory(newHistory);
      setIsFinalImage(true);
      updateHistoryInUrl(newHistory);
      sendEvent({
        eventName: trackingEvent.fantasy_completed,
        properties: {
          character_slug: slug,
          fantasy_id: fantasy.id,
          final_choice_id: choice.id,
        },
      });
    }
  };

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

    const isChoiceUnlocked = unlockedChoices.has(choice.id);
    if (choice.cost && choice.cost > 0 && !isChoiceUnlocked) {
      if (!user) {
        sendEvent({
          eventName: trackingEvent.fantasy_auth_wall_shown,
        });
        openModal('auth', {
          avatarImageId: aiGirlfriend?.profileImageId,
          context: 'fantasy',
        });
        return;
      }

      if (
        !hasEnoughCredits({
          user: user,
          requiredCredits: choice.cost,
        })
      ) {
        sendEvent({
          eventName: trackingEvent.fantasy_credit_wall_shown,
        });
        openModal('notEnoughCredits', {
          avatarImageId: aiGirlfriend?.profileImageId,
        });
        return;
      }

      playChoice(
        {
          fantasyId: fantasy.id,
          choiceId: choice.id,
        },
        {
          onSuccess: (data) => {
            setUnlockedChoices((prev) => new Set([...prev, choice.id]));
            navigateToChoice(choice);
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
    } else {
      navigateToChoice(choice);
    }
  };

  const handleGoBack = () => {
    if (stepHistory.length <= 1) return;

    const newHistory = stepHistory.slice(0, -1);
    const previousItem = newHistory[newHistory.length - 1];
    const previousStep = stepsMap.get(previousItem.stepId);

    if (previousStep) {
      setStepHistory(newHistory);
      setCurrentStep(previousStep);
      setCurrentVideoUrl(previousItem.videoUrl);
      setIsFinalImage(false);
      updateHistoryInUrl(newHistory);
      setStepId(previousStep.id);
    }
  };

  const resetFantasy = () => {
    const firstStep = fantasy.steps[0];
    const resetHistory = [
      {
        stepId: firstStep.id,
        videoUrl: fantasy.videoUrl ?? null,
      },
    ];
    setCurrentStep(firstStep);
    setCurrentVideoUrl(fantasy.videoUrl ?? null);
    setStepHistory(resetHistory);
    setIsFinalImage(false);
    updateHistoryInUrl(resetHistory);
    setStepId(null);
  };

  return (
    <div className="flex flex-col p-4 max-w-md mx-auto h-full">
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
                src: currentVideoUrl,
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

          {/* Top navigation icons */}
          <div className="absolute top-2 left-2 right-2 flex justify-between z-10">
            {stepHistory.length > 1 && (
              <button
                onClick={handleGoBack}
                className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            )}
            <div className="ml-auto">
              <Link
                href={`/${slug}/chat`}
                className="block p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                aria-label="Chat with AI girlfriend"
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </Link>
            </div>
          </div>

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
                        choice.isUnlocked ? (
                          <div className="text-xs bg-background/10 text-primary px-1 py-0.5 rounded mt-1 whitespace-nowrap">
                            Unlocked
                          </div>
                        ) : (
                          <div className="text-xs bg-background/10 text-primary px-1 py-0.5 rounded mt-1 whitespace-nowrap">
                            {choice.cost} credits
                          </div>
                        )
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
