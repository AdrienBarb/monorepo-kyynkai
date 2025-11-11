import { prisma } from '@/lib/db/client';

export async function getFantasyById({
  fantasyId,
  userId,
}: {
  fantasyId: string;
  userId?: string | null;
}) {
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
  });

  if (!fantasy) {
    return null;
  }

  return {
    ...fantasy,
    steps: fantasy.steps.map((step) => ({
      ...step,
      choices: step.choices.map((choice) => ({
        ...choice,
        nextStepId: choice.nextStepId ?? undefined,
        cost: choice.cost ?? undefined,
        isUnlocked: userId ? (choice.unlocks as any[])?.length > 0 : false,
        unlocks: undefined,
      })),
    })),
  };
}
