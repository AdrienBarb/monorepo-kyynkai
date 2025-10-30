import { AIGirlfriend } from '@prisma/client';

export interface Fantasy {
  id: string;
  aiGirlfriendId: string;
  aiGirlfriend: AIGirlfriend;
  title: string;
  description: string;
  mediaUrl: string;
  videoUrl: string;
  steps: FantasyStep[];
}

export interface FantasyStep {
  id: string;
  order: number;
  text: string;
  choices: FantasyChoice[];
}

export interface FantasyChoice {
  id: string;
  label: string;
  mediaUrl: string;
  videoUrl: string;
  nextStepId?: string;
  cost?: number;
  isUnlocked?: boolean;
}

export interface PlayFantasyRequest {
  fantasyId: string;
  choiceId: string;
}

export interface PlayFantasyResponse {
  choice: FantasyChoice;
  nextStep?: FantasyStep;
  creditsUsed: number;
  isEnding: boolean;
}
