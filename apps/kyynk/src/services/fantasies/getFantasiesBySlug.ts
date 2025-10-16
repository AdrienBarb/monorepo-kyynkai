import { prisma } from '@/lib/db/client';

export async function getFantasiesBySlug({ slug }: { slug: string }) {
  const aiGirlfriend = await prisma.aIGirlfriend.findUnique({
    where: { slug },
    select: {
      id: true,
      fantasies: {
        where: { isActive: true },
        select: {
          id: true,
          title: true,
          description: true,
          mediaUrl: true,
          videoUrl: true,
          steps: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              order: true,
              text: true,
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
      },
    },
  });

  if (!aiGirlfriend) {
    return [];
  }

  return aiGirlfriend.fantasies;
}
