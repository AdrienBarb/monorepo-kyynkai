import { prisma } from '@/lib/db/client';

export async function getUnlockedChoices({ userId }: { userId: string }) {
  const unlocks = await prisma.fantasyChoiceUnlock.findMany({
    where: {
      userId,
    },
    include: {
      choice: {
        include: {
          step: {
            include: {
              fantasy: {
                include: {
                  aiGirlfriend: {
                    select: {
                      id: true,
                      pseudo: true,
                      slug: true,
                      profileImageId: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return unlocks.map((unlock) => ({
    id: unlock.id,
    choiceId: unlock.choice.id,
    choiceLabel: unlock.choice.label,
    videoUrl: unlock.choice.videoUrl,
    createdAt: unlock.createdAt,
    fantasy: {
      id: unlock.choice.step.fantasy.id,
      title: unlock.choice.step.fantasy.title,
      aiGirlfriend: unlock.choice.step.fantasy.aiGirlfriend,
    },
  }));
}
