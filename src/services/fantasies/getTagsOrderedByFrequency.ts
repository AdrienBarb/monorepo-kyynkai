import { prisma } from '@/lib/db/client';

export async function getTagsOrderedByFrequency(): Promise<string[]> {
  const fantasies = await prisma.fantasy.findMany({
    where: { isActive: true },
    select: {
      tags: true,
    },
  });

  const tagCounts = new Map<string, number>();

  fantasies.forEach((fantasy) => {
    const fantasyWithTags = fantasy as any;
    if (fantasyWithTags.tags && Array.isArray(fantasyWithTags.tags)) {
      fantasyWithTags.tags.forEach((tag: string) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }
  });

  const sortedTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  return sortedTags;
}

