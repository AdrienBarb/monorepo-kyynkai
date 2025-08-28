import { prisma } from '@/lib/db/client';
import { getConversationsFields } from '@/utils/conversations/getConversationsFields';

export const getUserConversations = async ({ userId }: { userId: string }) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        userId,
      },
      select: getConversationsFields,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return conversations;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch conversations');
  }
};
