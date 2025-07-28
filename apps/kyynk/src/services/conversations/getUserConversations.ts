import { prisma } from '@/lib/db/client';

export const getUserConversations = async ({ userId }: { userId: string }) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
        isArchived: false,
      },
      include: {
        participants: {
          select: {
            id: true,
            pseudo: true,
            slug: true,
            profileImageId: true,
            userType: true,
          },
        },
        messages: {
          select: {
            status: true,
            senderId: true,
          },
          where: {
            status: {
              not: 'read',
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const conversationsWithUnreadFlag = conversations.map((conversation) => ({
      ...conversation,
      hasUnreadMessages: conversation.messages.some(
        (message) => message.status !== 'read' && message.senderId !== userId,
      ),
    }));

    return conversationsWithUnreadFlag;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch conversations');
  }
};
