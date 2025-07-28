import useApi from '@/hooks/requests/useApi';
import { Conversation } from '@prisma/client';
import {
  ConversationUser,
  FetchedUserType,
  LoggedUserType,
} from '@/types/users';
import { useMessageValidation } from '@/hooks/messages/useMessageValidation';

interface UseCreateConversationProps {
  user: LoggedUserType | null;
  otherUser: FetchedUserType | ConversationUser | null;
  onSuccess?: (data: Conversation) => void;
}

export const useCreateConversation = ({
  user,
  otherUser,
  onSuccess,
}: UseCreateConversationProps) => {
  const { usePost } = useApi();
  const { validateMessage } = useMessageValidation({ user, otherUser });

  const { mutate: createConversation, isPending } = usePost(
    '/api/conversations',
    {
      onSuccess,
    },
  );

  const handleSendMessageAndCreateConversation = ({
    message,
    slug,
  }: {
    message: string;
    slug: string;
  }) => {
    if (validateMessage(message)) {
      createConversation({ slug, message });
    }
  };

  return {
    handleSendMessageAndCreateConversation,
    isPending,
  };
};
