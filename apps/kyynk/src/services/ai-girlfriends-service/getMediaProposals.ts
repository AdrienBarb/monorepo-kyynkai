import { prisma } from '@/lib/db/client';

export async function getMediaProposals({ slug }: { slug: string }) {
  return await prisma.mediaProposal.findMany({
    where: {
      aiGirlfriend: {
        slug,
        isActive: true,
      },
      isActive: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}
