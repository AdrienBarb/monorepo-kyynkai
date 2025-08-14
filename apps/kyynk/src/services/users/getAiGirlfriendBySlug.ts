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
    const user = await prisma.aIGirlfriend.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        pseudo: true,
        slug: true,
        profileImageId: true,
        archetype: true,
        traits: true,
        hook: true,
        chatOpeningLine: true,
        ...selectFields,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch user by slug');
  }
};
