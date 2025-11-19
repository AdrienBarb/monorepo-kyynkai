import { prisma } from '@/lib/db/client';

export async function getFantasiesByAiGirlfriendSlug(slug: string) {
  const fantasies = await prisma.fantasy.findMany({
    where: {
      isActive: true,
      aiGirlfriend: {
        slug,
        isActive: true,
      },
    },
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

  return fantasies.map((fantasy) => ({
    ...fantasy,
    steps: [],
  }));
}
