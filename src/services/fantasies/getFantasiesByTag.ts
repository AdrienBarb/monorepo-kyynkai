import { prisma } from '@/lib/db/client';

export async function getFantasiesByTag(tag?: string) {
  const whereClause = tag
    ? {
        isActive: true,
        tags: {
          has: tag,
        },
      }
    : {
        isActive: true,
      };

  const fantasies = await prisma.fantasy.findMany({
    where: whereClause,
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
