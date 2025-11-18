import { NEW_USER_WINDOW_MS } from '@/constants/constants';

export const isNewUser = (createdAt: string | Date | null | undefined) => {
  if (!createdAt) return false;
  const created =
    typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  return Date.now() - created.getTime() < NEW_USER_WINDOW_MS;
};
