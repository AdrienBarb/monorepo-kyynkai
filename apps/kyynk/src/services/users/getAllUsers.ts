import { prisma } from '@/lib/db/client';

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
      },
      where: {
        emailVerified: true,
      },
    });

    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};
