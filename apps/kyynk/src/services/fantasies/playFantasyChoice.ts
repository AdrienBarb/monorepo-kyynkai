import { prisma } from '@/lib/db/client';
import { errorMessages } from '@/lib/constants/errorMessage';

export async function playFantasyChoice({
  userId,
  slug,
  fantasyId,
  choiceId,
}: {
  userId: string | null;
  slug: string;
  fantasyId: string;
  choiceId: string;
}) {
  const choice = await prisma.fantasyChoice.findUnique({
    where: { id: choiceId },
    select: {
      id: true,
      label: true,
      videoUrl: true,
      nextStepId: true,
      cost: true,
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

  let existingUnlock = null;
  let creditsUsed = 0;

  if (choice.cost && choice.cost > 0) {
    if (!userId) {
      throw new Error(errorMessages.AUTH_REQUIRED);
    }

    existingUnlock = await prisma.fantasyChoiceUnlock.findUnique({
      where: {
        userId_choiceId: {
          userId,
          choiceId: choice.id,
        },
      },
    });

    if (!existingUnlock) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { creditBalance: true },
      });

      if (!user) {
        throw new Error(errorMessages.USER_NOT_FOUND);
      }

      if (user.creditBalance < choice.cost) {
        throw new Error(errorMessages.INSUFFICIENT_CREDITS);
      }

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
        prisma.fantasyChoiceUnlock.create({
          data: {
            userId,
            choiceId: choice.id,
          },
        }),
      ]);
      creditsUsed = choice.cost;
    }
  } else {
    creditsUsed = 0;
  }

  let nextStep = null;
  if (choice.nextStepId) {
    nextStep = await prisma.fantasyStep.findUnique({
      where: { id: choice.nextStepId },
      include: {
        choices: {
          select: {
            id: true,
            label: true,
            videoUrl: true,
            nextStepId: true,
            cost: true,
          },
        },
      },
    });
  }

  return {
    choice,
    nextStep,
    creditsUsed,
    isEnding: !choice.nextStepId,
  };
}
