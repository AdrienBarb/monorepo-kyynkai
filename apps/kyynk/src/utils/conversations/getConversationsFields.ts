import { Prisma } from '@prisma/client';

export const getConversationsFields: Prisma.ConversationSelect = {
  id: true,
  aiGirlfriend: {
    select: {
      id: true,
      pseudo: true,
      profileImageId: true,
      slug: true,
    },
  },
};
