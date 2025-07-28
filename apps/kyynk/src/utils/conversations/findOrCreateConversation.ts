import { PrismaClient } from '@prisma/client';

type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

interface FindOrCreateConversationParams {
  userId: string;
  recipientId: string;
  tx: TransactionClient;
}

export const findOrCreateConversation = async ({
  userId,
  recipientId,
  tx,
}: FindOrCreateConversationParams) => {
  const existingConversation = await tx.conversation.findFirst({
    where: {
      participants: {
        every: {
          id: { in: [userId, recipientId] },
        },
      },
    },
  });

  if (existingConversation) {
    return existingConversation;
  }

  return await tx.conversation.create({
    data: {
      participants: {
        connect: [{ id: userId }, { id: recipientId }],
      },
    },
  });
};
