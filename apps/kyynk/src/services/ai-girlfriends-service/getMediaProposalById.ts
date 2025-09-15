import { prisma } from '@/lib/db/client';

export async function getMediaProposalById({
  proposalId,
  slug,
}: {
  proposalId: string;
  slug: string;
}) {
  return await prisma.mediaProposal.findFirst({
    where: {
      id: proposalId,
      aiGirlfriend: {
        slug,
        isActive: true,
      },
      isActive: true,
    },
    include: {
      aiGirlfriend: true,
    },
  });
}
