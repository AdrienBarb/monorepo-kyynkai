import { prisma } from '@/lib/db/client';

type GetAllPostsOptions = {
  limit?: number;
  cursor?: string;
};

export const getAllPosts = async ({
  limit = 20,
  cursor,
}: GetAllPostsOptions = {}) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        aiGirlfriend: {
          isActive: true,
        },
        ...(cursor && {
          createdAt: {
            lt: new Date(cursor),
          },
        }),
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        aiGirlfriend: {
          select: {
            id: true,
            pseudo: true,
            slug: true,
            profileImageId: true,
          },
        },
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
      take: limit + 1,
    });

    const hasNextPage = posts.length > limit;
    const postsToReturn = hasNextPage ? posts.slice(0, -1) : posts;
    const nextCursor = hasNextPage
      ? postsToReturn[postsToReturn.length - 1]?.createdAt.toISOString()
      : null;

    return {
      posts: postsToReturn,
      nextCursor,
      hasNextPage,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch all posts');
  }
};
