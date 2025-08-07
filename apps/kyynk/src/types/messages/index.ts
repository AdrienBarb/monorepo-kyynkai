import { Message } from '@prisma/client';
import { MessageAttachmentWithNudePermissions } from '../message-attachment';

export type MessageType = Pick<
  Message,
  'id' | 'content' | 'sender' | 'createdAt' | 'isRead'
>;

export type MessageWithNudePermissions = MessageType & {
  attachment: MessageAttachmentWithNudePermissions;
};
