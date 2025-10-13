import { prisma } from '@/lib/db/client';

export async function getFirstFantasyBySlug({ slug }: { slug: string }) {
  const aiGirlfriend = await prisma.aIGirlfriend.findUnique({
    where: { slug },
    select: {
      id: true,
      fantasies: {
        where: { isActive: true },
        select: {
          id: true,
        },
        orderBy: { createdAt: 'asc' },
        take: 1,
      },
    },
  });

  if (!aiGirlfriend || aiGirlfriend.fantasies.length === 0) {
    return null;
  }

  return aiGirlfriend.fantasies[0];
}
