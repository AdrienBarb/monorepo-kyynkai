import { prisma } from '@/lib/db/client';
import { AIGirlfriend } from '@prisma/client';

export const updateAdminAiGirlfriend = async (
  id: string,
  data: Pick<AIGirlfriend, 'pseudo' | 'slug'>,
) => {
  try {
    const updatedAiGirlfriend = await prisma.aIGirlfriend.update({
      where: { id },
      data,
      select: {
        id: true,
        pseudo: true,
        slug: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return updatedAiGirlfriend;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update AI girlfriend');
  }
};
