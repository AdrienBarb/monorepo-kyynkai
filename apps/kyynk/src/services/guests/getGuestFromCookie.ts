import { prisma } from '@/lib/db/client';
import { cookies } from 'next/headers';

export const getGuestFromCookie = async () => {
  const c = await cookies();
  const guestId = c.get('guest_id')?.value;
  if (!guestId) return null;
  return prisma.guest.findUnique({ where: { id: guestId } });
};
