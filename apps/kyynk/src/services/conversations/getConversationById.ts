import { prisma } from '@/lib/db/client';

export const getConversationById = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        participants: {
          select: {
            id: true,
            pseudo: true,
            userType: true,
            slug: true,
            profileImageId: true,
            settings: {
              select: {
                creditMessage: true,
              },
            },
          },
        },
        messages: {
          select: {
            id: true,
            content: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    return {
      ...conversation,
      hasUnreadMessages: conversation.messages.some(
        (message) => message.status !== 'read',
      ),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch conversation');
  }
};
