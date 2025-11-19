import { prisma } from '@/lib/db/client';

export async function getRandomFantasies(
  excludeFantasyId: string,
  limit: number = 6,
) {
  const fantasies = await prisma.fantasy.findMany({
    where: {
      isActive: true,
      NOT: {
        id: excludeFantasyId,
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
    take: 20,
  });

  const shuffled = fantasies.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, limit);

  return selected.map((fantasy) => ({
    ...fantasy,
    steps: [],
  }));
}
