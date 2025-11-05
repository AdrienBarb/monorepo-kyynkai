import { prisma } from '@/lib/db/client';

export async function getFantasiesBySlug({
  slug,
  userId,
}: {
  slug: string;
  userId?: string | null;
}) {
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
                  videoUrl: true,
                  nextStepId: true,
                  cost: true,
                  unlocks: userId
                    ? {
                        where: { userId },
                        select: { id: true },
                      }
                    : undefined,
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

  return aiGirlfriend.fantasies.map((fantasy) => ({
    ...fantasy,
    steps: fantasy.steps.map((step) => ({
      ...step,
      choices: step.choices.map((choice) => ({
        ...choice,
        isUnlocked: userId ? (choice.unlocks as any[])?.length > 0 : false,
        unlocks: undefined,
      })),
    })),
  }));
}
