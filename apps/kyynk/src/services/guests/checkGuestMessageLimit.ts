import { prisma } from '@/lib/db/client';

const GUEST_MESSAGE_LIMIT = 5;

export async function checkGuestMessageLimit(
  guestId: string,
): Promise<boolean> {
  const guest = await prisma.guest.findUnique({
    where: { id: guestId },
    select: { messageCount: true },
  });

  if (!guest) {
    return false;
  }

  return guest.messageCount < GUEST_MESSAGE_LIMIT;
}

export async function incrementGuestMessageCount(
  guestId: string,
): Promise<void> {
  await prisma.guest.update({
    where: { id: guestId },
    data: { messageCount: { increment: 1 } },
  });
}

export { GUEST_MESSAGE_LIMIT };
