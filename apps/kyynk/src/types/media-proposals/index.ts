export interface MediaProposal {
  id: string;
  aiGirlfriendId: string;
  title: string;
  description: string;
  mediaKey: string;
  mediaType: 'IMAGE' | 'VIDEO';
  proposalType: 'ASS' | 'PUSSY' | 'TITS' | 'CUSTOM';
  isActive: boolean;
  creditCost: number;
  userMessage: string;
  aiResponse: string;
  createdAt: Date;
  updatedAt: Date;
}
