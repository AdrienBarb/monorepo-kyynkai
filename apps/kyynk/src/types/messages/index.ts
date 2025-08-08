import { Message } from '@prisma/client';

export type MessageType = Pick<
  Message,
  'id' | 'content' | 'sender' | 'createdAt' | 'isRead'
>;
