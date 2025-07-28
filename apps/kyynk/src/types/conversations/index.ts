import { Conversation, User } from '@prisma/client';
import { ConversationUser } from '../users';

export type ConversationType = Pick<
  Conversation,
  'id' | 'createdAt' | 'updatedAt' | 'isArchived'
> & {
  participants: ConversationUser[];
  hasUnreadMessages: boolean;
};
