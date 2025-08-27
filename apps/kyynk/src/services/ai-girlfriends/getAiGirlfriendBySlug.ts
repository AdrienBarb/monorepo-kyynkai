import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/client';

export const getAiGirlfriendBySlug = async ({
  slug,
  selectFields = {},
}: {
  slug: string;
  selectFields?: Prisma.AIGirlfriendSelect;
}) => {
  try {
    const aiGirlfriend = await prisma.aIGirlfriend.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        pseudo: true,
        slug: true,
        profileImageId: true,
        isActive: true,
        archetype: true,
        traits: true,
        hook: true,
        chatOpeningLine: true,
        profileVideoId: true,
        createdAt: true,
        updatedAt: true,
        ...selectFields,
      },
    });

    return aiGirlfriend;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch AI girlfriend by slug');
  }
};
