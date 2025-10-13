import { prisma } from '@/lib/db/client';

export async function getFantasyById({ fantasyId }: { fantasyId: string }) {
  const fantasy = await prisma.fantasy.findUnique({
    where: {
      id: fantasyId,
      isActive: true,
    },
    include: {
      aiGirlfriend: true,
      steps: {
        orderBy: { order: 'asc' },
        include: {
          choices: {
            select: {
              id: true,
              label: true,
              nextStepId: true,
              cost: true,
            },
          },
        },
      },
    },
  });

  return fantasy;
}
