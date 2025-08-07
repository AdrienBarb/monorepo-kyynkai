import { prisma } from '@/lib/db/client';

export const getUserConversations = async ({ userId }: { userId: string }) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        aiGirlfriend: {
          select: {
            id: true,
            pseudo: true,
            profileImageId: true,
            slug: true,
          },
        },
      },
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
