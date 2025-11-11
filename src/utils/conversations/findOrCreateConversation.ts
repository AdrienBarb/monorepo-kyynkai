import { PrismaClient } from '@prisma/client';

type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

interface FindOrCreateConversationParams {
  userId: string;
  aiGirlfriendId: string;
  tx: TransactionClient;
}

export const findOrCreateConversation = async ({
  userId,
  aiGirlfriendId,
  tx,
}: FindOrCreateConversationParams) => {
  const existingConversation = await tx.conversation.findFirst({
    where: {
      userId,
      aiGirlfriendId,
    },
  });

  if (existingConversation) {
    return existingConversation;
  }

  return await tx.conversation.create({
    data: {
      userId,
      aiGirlfriendId,
    },
  });
};
