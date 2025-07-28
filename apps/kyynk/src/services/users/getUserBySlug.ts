import { prisma } from '@/lib/db/client';

export const getUserBySlug = async ({ slug }: { slug: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        pseudo: true,
        slug: true,
        userType: true,
        description: true,
        profileImageId: true,
        isArchived: true,
        isEmailVerified: true,
        identityVerificationStatus: true,
        nudesCount: true,
        lastSeenAt: true,
        settings: {
          select: {
            creditMessage: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch user by slug');
  }
};
