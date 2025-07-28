import { PrismaClient } from '@prisma/client';

type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

interface CreateMessageParams {
  content: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  requiredCredits: number;
  tx: TransactionClient;
}

export const createMessage = async ({
  content,
  conversationId,
  senderId,
  recipientId,
  requiredCredits,
  tx,
}: CreateMessageParams) => {
  const message = await tx.message.create({
    data: {
      content,
      conversationId,
      senderId,
    },
  });

  await tx.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  if (requiredCredits > 0) {
    await tx.sale.create({
      data: {
        creditAmount: requiredCredits,
        type: 'message',
        seller: { connect: { id: recipientId } },
        buyer: { connect: { id: senderId } },
      },
    });

    await tx.user.update({
      where: { id: senderId },
      data: { creditsAmount: { decrement: requiredCredits } },
    });
  }

  return message;
};
