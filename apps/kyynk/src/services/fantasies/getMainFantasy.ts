import { prisma } from '@/lib/db/client';

export async function getMainFantasy({
  aiGirlfriendId,
}: {
  aiGirlfriendId: string;
}) {
  const fantasy = await prisma.fantasy.findFirst({
    where: { aiGirlfriendId, isMain: true, isActive: true },
    include: {
      aiGirlfriend: true,
      steps: {
        orderBy: { order: 'asc' },
        include: {
          choices: {
            select: {
              id: true,
              label: true,
              mediaUrl: true,
              videoUrl: true,
              nextStepId: true,
              cost: true,
            },
          },
        },
      },
    },
  });

  if (!fantasy) {
    return null;
  }

  return fantasy;
}
