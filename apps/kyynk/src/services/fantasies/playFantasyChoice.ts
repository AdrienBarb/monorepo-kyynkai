import { prisma } from '@/lib/db/client';
import { errorMessages } from '@/lib/constants/errorMessage';

export async function playFantasyChoice({
  userId,
  slug,
  fantasyId,
  choiceId,
}: {
  userId: string;
  slug: string;
  fantasyId: string;
  choiceId: string;
}) {
  const choice = await prisma.fantasyChoice.findUnique({
    where: { id: choiceId },
    include: {
      step: {
        include: {
          fantasy: {
            include: {
              aiGirlfriend: true,
            },
          },
        },
      },
    },
  });

  if (!choice || choice.step.fantasy.aiGirlfriend.slug !== slug) {
    throw new Error(errorMessages.CHOICE_NOT_FOUND);
  }

  if (choice.step.fantasy.id !== fantasyId) {
    throw new Error(errorMessages.INVALID_FANTASY);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { creditBalance: true },
  });

  if (!user) {
    throw new Error(errorMessages.USER_NOT_FOUND);
  }

  if (choice.cost && user.creditBalance < choice.cost) {
    throw new Error(errorMessages.INSUFFICIENT_CREDITS);
  }

  if (choice.cost && choice.cost > 0) {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { creditBalance: { decrement: choice.cost } },
      }),
      prisma.creditSale.create({
        data: {
          userId,
          type: 'MEDIA',
          amount: choice.cost,
        },
      }),
    ]);
  }

  let nextStep = null;
  if (choice.nextStepId) {
    nextStep = await prisma.fantasyStep.findUnique({
      where: { id: choice.nextStepId },
      include: {
        choices: true,
      },
    });
  }

  return {
    choice,
    nextStep,
    creditsUsed: choice.cost || 0,
    isEnding: !choice.nextStepId,
  };
}
