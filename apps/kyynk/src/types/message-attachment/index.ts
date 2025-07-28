import { MessageAttachment } from '@prisma/client';
import { NudeFromPrisma, NudeWithPermissions } from '../nudes';

export type MessageAttachmentType = Pick<MessageAttachment, 'id' | 'type'> & {
  nude?: NudeFromPrisma;
};

export type MessageAttachmentWithNudePermissions = MessageAttachmentType & {
  nude?: NudeWithPermissions;
};
