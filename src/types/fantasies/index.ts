import { AIGirlfriend } from '@prisma/client';

export interface Fantasy {
  id: string;
  aiGirlfriendId: string;
  aiGirlfriend: Pick<
    AIGirlfriend,
    'id' | 'pseudo' | 'slug' | 'profileImageId' | 'age' | 'archetype'
  >;
  title: string;
  description: string;
  mediaUrl: string;
  videoUrl: string;
  isMain?: boolean;
  isActive?: boolean;
  viewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
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
