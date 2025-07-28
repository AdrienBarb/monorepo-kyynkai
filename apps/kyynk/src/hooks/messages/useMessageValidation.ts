import { messageSchema } from '@/schemas/conversations/messageSchema';
import { hasEnoughCredits } from '@/utils/conversations/hasEnoughCredits';
import toast from 'react-hot-toast';
import { getEncodedFullUrl } from '@/utils/links/getEncodedFullUrl';
import { appRouter } from '@/constants/appRouter';
import { useRouter } from 'next/navigation';
import {
  ConversationUser,
  FetchedUserType,
  LoggedUserType,
} from '@/types/users';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

interface UseMessageValidationProps {
  user: LoggedUserType | null;
  otherUser: FetchedUserType | ConversationUser | null;
}

export const useMessageValidation = ({
  user,
  otherUser,
}: UseMessageValidationProps) => {
  const router = useRouter();
  const { openModal } = useGlobalModalStore((state) => state);

  const validateMessage = (message: string): boolean => {
    try {
      if (!user) {
        const encodedUrl = getEncodedFullUrl();
        router.push(`${appRouter.login}?previousUrl=${encodedUrl}`);
        return false;
      }

      messageSchema.parse(message);

      if (
        !hasEnoughCredits({
          user,
          requiredCredits: otherUser?.settings?.creditMessage ?? null,
        })
      ) {
        openModal('notEnoughCredits');
        return false;
      }

      return true;
    } catch (e) {
      toast.error('Something went wrong');
      return false;
    }
  };

  return { validateMessage };
};
