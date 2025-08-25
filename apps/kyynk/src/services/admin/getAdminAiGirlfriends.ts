import { prisma } from '@/lib/db/client';

interface GetAdminAiGirlfriendsOptions {
  limit?: number;
  offset?: number;
}

export const getAdminAiGirlfriends = async ({
  limit,
  offset = 0,
}: GetAdminAiGirlfriendsOptions = {}) => {
  try {
    const aiGirlfriends = await prisma.aIGirlfriend.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        pseudo: true,
        slug: true,
        profileImageId: true,
        isActive: true,
        archetype: true,
        createdAt: true,
        updatedAt: true,
      },
      ...(limit && { take: limit }),
      ...(offset && { skip: offset }),
    });

    return aiGirlfriends;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch AI girlfriends');
  }
};
