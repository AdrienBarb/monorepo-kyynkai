import { prisma } from '@/lib/db/client';

interface GetUsersOptions {
  limit?: number;
  offset?: number;
}

export const getUsers = async ({ limit, offset = 0 }: GetUsersOptions = {}) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isArchived: false,
        userType: 'creator',
        isEmailVerified: true,
        identityVerificationStatus: 'verified',
        profileImageId: {
          not: null,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        pseudo: true,
        slug: true,
        profileImageId: true,
      },
      ...(limit && { take: limit }),
      ...(offset && { skip: offset }),
    });

    return users;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch users');
  }
};
