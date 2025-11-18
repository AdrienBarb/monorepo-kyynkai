import { prisma } from '@/lib/db/client';

export const getCurrentUser = async ({ userId }: { userId: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        toltData: true,
        utmTracking: true,
        creditBalance: true,
        roles: true,
        lastClaimFreeCredit: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
