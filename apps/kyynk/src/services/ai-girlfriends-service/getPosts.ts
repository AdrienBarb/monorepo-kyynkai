import { prisma } from '@/lib/db/client';

export const getPosts = async ({ slug }: { slug: string }) => {
  try {
    const aiGirlfriend = await prisma.aIGirlfriend.findUnique({
      where: {
        slug,
        isActive: true,
      },
      select: {
        id: true,
        posts: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            media: {
              select: {
                id: true,
                type: true,
                mediaKey: true,
                visibility: true,
                unlockUsers: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!aiGirlfriend) {
      throw new Error('AI girlfriend not found');
    }

    return aiGirlfriend.posts;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch posts');
  }
};
