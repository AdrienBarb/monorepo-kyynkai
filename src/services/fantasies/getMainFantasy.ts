import { prisma } from '@/lib/db/client';

export async function getMainFantasy({
  aiGirlfriendId,
}: {
  aiGirlfriendId: string;
}) {
  const fantasy = await prisma.fantasy.findFirst({
    where: { aiGirlfriendId, isMain: true, isActive: true },
  });

  if (!fantasy) {
    return null;
  }

  return fantasy;
}
