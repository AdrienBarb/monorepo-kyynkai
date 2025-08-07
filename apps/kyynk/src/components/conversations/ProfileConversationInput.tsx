'use client';

import ConversationInput from './ConversationInput';
import { useUser } from '@/hooks/users/useUser';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useConversations } from '@/hooks/conversations/useConversations';
import useApi from '@/hooks/requests/useApi';
import { useAuthModal } from '@/utils/auth/openAuthModal';
import MessageList from './MessageList';
import { useChatScroll } from '@/lib/hooks/useChatScroll';
import { useFetchMessages } from '@/hooks/messages/useFetchMessages';
import { MessageType } from '@/types/messages';

const ProfileConversationInput = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user: loggedUser } = useUser();
  const { openSignIn } = useAuthModal();

  const { refetch: refetchConversations } = useConversations();
  const { usePost } = useApi();
  const { messages, addMessageToCache } = useFetchMessages();

  const ref = useChatScroll(messages);

  const { mutate: sendMessage, isPending } = usePost('/api/messages', {
    onSuccess: (createdMessage: MessageType) => {
      addMessageToCache(createdMessage);
      refetchConversations();
    },
  });

  const handleSendMessage = ({ message }: { message: string }) => {
    if (!loggedUser) {
      openSignIn();
      return;
    }

    sendMessage({ message, slug: slug as string });
  };

  return (
    <div className="px-2">
      <MessageList messages={messages} scrollRef={ref} />
      <div className="sticky bottom-0 h-36">
        <ConversationInput
          onSendMessage={handleSendMessage}
          isCreationMessageLoading={isPending}
        />
      </div>
    </div>
  );
};

export default ProfileConversationInput;
