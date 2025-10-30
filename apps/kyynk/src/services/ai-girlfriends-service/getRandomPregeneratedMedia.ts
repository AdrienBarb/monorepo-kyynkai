import { prisma } from '@/lib/db/client';

export async function getRandomPregeneratedMedia({
  aiGirlfriendId,
}: {
  aiGirlfriendId: string;
}): Promise<string | null> {
  const aiGirlfriend = await prisma.aIGirlfriend.findUnique({
    where: { id: aiGirlfriendId },
    select: { pregeneratedMediaUrls: true },
  });

  if (!aiGirlfriend?.pregeneratedMediaUrls?.length) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * aiGirlfriend.pregeneratedMediaUrls.length,
  );

  return aiGirlfriend.pregeneratedMediaUrls[randomIndex];
}
