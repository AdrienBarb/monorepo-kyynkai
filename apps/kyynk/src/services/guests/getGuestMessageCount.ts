import { prisma } from '@/lib/db/client';

export async function getGuestMessageCount(guestId: string): Promise<number> {
  const guest = await prisma.guest.findUnique({
    where: { id: guestId },
    select: { messageCount: true },
  });

  return guest?.messageCount || 0;
}
