import { cookies } from 'next/headers';
import { prisma } from '@/lib/db/client';

export async function getOrCreateGuest() {
  const store = await cookies();
  let guestId = store.get('guest_id')?.value;

  if (guestId) {
    const guest = await prisma.guest.findUnique({ where: { id: guestId } });
    if (guest) return guest;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
  const guest = await prisma.guest.create({
    data: {},
  });

  store.set('guest_id', guest.id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    expires: expiresAt,
  });

  return guest;
}
