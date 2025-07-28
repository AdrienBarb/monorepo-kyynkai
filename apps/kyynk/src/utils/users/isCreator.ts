import { UserType } from '@prisma/client';
import { LoggedUserType } from '@/types/users';

export const isCreator = ({ user }: { user: LoggedUserType | null }) => {
  if (!user) {
    return false;
  }

  return user.userType === UserType.creator;
};
