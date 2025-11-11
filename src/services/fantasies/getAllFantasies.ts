import { prisma } from '@/lib/db/client';

export async function getAllFantasies() {
  const fantasies = await prisma.fantasy.findMany({
    where: { isActive: true },
    include: {
      aiGirlfriend: {
        select: {
          id: true,
          pseudo: true,
          slug: true,
          profileImageId: true,
          age: true,
          archetype: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return fantasies;
}
