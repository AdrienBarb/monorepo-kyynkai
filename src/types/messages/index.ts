import { Message, GeneratedMedia } from '@prisma/client';

export type MessageType = Pick<
  Message,
  'id' | 'content' | 'sender' | 'createdAt' | 'isRead' | 'generatedMediaId'
> & {
  generatedMedia?: GeneratedMedia;
};
