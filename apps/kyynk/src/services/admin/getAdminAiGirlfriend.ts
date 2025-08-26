import { prisma } from '@/lib/db/client';

export const getAdminAiGirlfriend = async (id: string) => {
  const aiGirlfriend = await prisma.aIGirlfriend.findUnique({
    where: { id },
  });
  return aiGirlfriend;
};
