import { prisma } from '@/lib/db/client';
import { getMessageSelectFields } from '@/utils/messages/getMessageSelectFields';

export const fetchMessagesByConversationId = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  return await prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    select: getMessageSelectFields(),
  });
};
