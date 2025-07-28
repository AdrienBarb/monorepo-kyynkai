import { prisma } from '@/lib/db/client';
import { getNudeSelectFields } from '@/utils/nudes/getNudeSelectFields';

export const getNudeById = async ({ nudeId }: { nudeId: string }) => {
  try {
    const nude = await prisma.nude.findUnique({
      where: { id: nudeId },
      select: getNudeSelectFields(),
    });

    return nude;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch nude by id');
  }
};
