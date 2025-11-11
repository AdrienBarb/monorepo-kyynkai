import { LoggedUserType } from '@/types/users';

interface HasEnoughCreditsParams {
  user: LoggedUserType | null;
  requiredCredits: number | null;
}

export const hasEnoughCredits = ({
  user,
  requiredCredits,
}: HasEnoughCreditsParams): boolean => {
  if (!user || requiredCredits === null) {
    return false;
  }

  return user.creditBalance >= requiredCredits;
};
