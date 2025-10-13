export interface Fantasy {
  id: string;
  title: string;
  description: string;
  steps: FantasyStep[];
}

export interface FantasyStep {
  id: string;
  order: number;
  text: string;
  mediaUrl?: string;
  mediaCost?: number;
  choices: FantasyChoice[];
}

export interface FantasyChoice {
  id: string;
  label: string;
  nextStepId?: string;
  cost?: number;
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
