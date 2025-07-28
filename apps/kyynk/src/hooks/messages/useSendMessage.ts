import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import {
  ConversationUser,
  FetchedUserType,
  LoggedUserType,
} from '@/types/users';
import { MessageType } from '@/types/messages';
import { useMessageValidation } from './useMessageValidation';

interface UseSendMessageProps {
  user: LoggedUserType | null;
  otherUser: FetchedUserType | ConversationUser | null;
  onSuccess?: (data: MessageType) => void;
}

export const useSendMessage = ({
  user,
  otherUser,
  onSuccess,
}: UseSendMessageProps) => {
  const { id: conversationId } = useParams();
  const { usePost } = useApi();
  const { validateMessage } = useMessageValidation({ user, otherUser });

  const { mutate: sendMessage, isPending } = usePost(
    `/api/conversations/${conversationId as string}/messages`,
    {
      onSuccess,
    },
  );

  const handleSendMessage = ({ message }: { message: string }) => {
    if (validateMessage(message)) {
      sendMessage({ message });
    }
  };

  return {
    handleSendMessage,
    isPending,
  };
};
