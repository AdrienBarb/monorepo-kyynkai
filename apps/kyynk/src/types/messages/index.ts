import { Message } from '@prisma/client';
import {
  MessageAttachmentType,
  MessageAttachmentWithNudePermissions,
} from '../message-attachment';

export type MessageType = Pick<
  Message,
  'id' | 'content' | 'senderId' | 'createdAt' | 'status'
> & {
  attachment?: MessageAttachmentType;
};

export type MessageWithNudePermissions = MessageType & {
  attachment: MessageAttachmentWithNudePermissions;
};
