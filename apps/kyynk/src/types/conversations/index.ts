import { Conversation } from '@prisma/client';

export type ConversationType = Pick<
  Conversation,
  'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'aiGirlfriendId'
> & {
  aiGirlfriend: {
    id: string;
    pseudo: string;
    profileImageId: string;
    slug: string;
  };
};
