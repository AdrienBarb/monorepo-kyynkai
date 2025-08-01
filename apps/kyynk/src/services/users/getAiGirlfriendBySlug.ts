import { prisma } from '@/lib/db/client';

export const getAiGirlfriendBySlug = async ({ slug }: { slug: string }) => {
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
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch user by slug');
  }
};
