import { differenceInMinutes } from 'date-fns';
import { User } from '@prisma/client';

export const isUserOnline = (user: User): boolean => {
  if (!user?.lastSeenAt) return false;

  const now = new Date();
  const lastSeen = new Date(user.lastSeenAt);
  return differenceInMinutes(now, lastSeen) <= 3;
};
