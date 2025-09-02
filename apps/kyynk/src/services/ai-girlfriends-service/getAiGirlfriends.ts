import { prisma } from '@/lib/db/client';

interface GetAiGirlfriendsOptions {
  limit?: number;
  offset?: number;
}

export const getAiGirlfriends = async ({
  limit,
  offset = 0,
}: GetAiGirlfriendsOptions = {}) => {
  try {
    const aiGirlfriends = await prisma.aIGirlfriend.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        pseudo: true,
        slug: true,
        profileImageId: true,
        age: true,
        archetype: true,
        secondaryImageIds: true,
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
