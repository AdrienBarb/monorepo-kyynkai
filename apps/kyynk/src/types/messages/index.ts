import { Message, Media } from '@prisma/client';

export type MessageType = Pick<
  Message,
  'id' | 'content' | 'sender' | 'createdAt' | 'isRead' | 'mediaId'
> & {
  media?: Media;
};
