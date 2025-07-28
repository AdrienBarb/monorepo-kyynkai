'use client';

import React, { FC } from 'react';
import { useChatScroll } from '@/lib/hooks/useChatScroll';
import { ConversationType } from '@/types/conversations';
import useConversationUsers from '@/hooks/conversations/useConversationUsers';
import { useUser } from '@/hooks/users/useUser';
import { isCreator } from '@/utils/users/isCreator';
import { isUserVerified } from '@/utils/users/isUserVerified';
import ConversationHeader from './ConversationHeader';
import MessageList from './MessageList';
import ConversationInput from './ConversationInput';
import { useFetchMessages } from '@/hooks/messages/useFetchMessages';
import { useSendMessage } from '@/hooks/messages/useSendMessage';
import { useRealtimeMessages } from '@/hooks/messages/useRealtimeMessages';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

interface Props {
  initialConversation: ConversationType;
}

const Conversation: FC<Props> = ({ initialConversation }) => {
  const { otherUser } = useConversationUsers(initialConversation.participants);
  const { user, refetch: refetchUser } = useUser();
  const { id: conversationId } = useParams();
  const { fetchData } = useApi();
  const { openModal } = useGlobalModalStore();

  useRealtimeMessages(conversationId as string, async (newMessage) => {
    if (newMessage.senderId === user?.id) {
      return;
    }

    const message = await fetchData(`/api/messages/${newMessage.id}`);
    addMessageToCache(message);
  });

  const { messages, addMessageToCache } = useFetchMessages();
  const { handleSendMessage, isPending } = useSendMessage({
    user,
    otherUser,
    onSuccess: (createdMessage) => {
      addMessageToCache(createdMessage);
      refetchUser();
    },
  });

  const ref = useChatScroll(messages);

  const handleOpenPrivateNudeModal = () => {
    openModal('privateNude');
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 68px)' }}>
      <ConversationHeader otherUser={otherUser} />

      <MessageList
        messages={messages}
        currentUserId={user?.id}
        scrollRef={ref}
      />

      <div className="sticky bottom-0 mt-8 p-4">
        <ConversationInput
          isDisabled={false}
          creditMessage={otherUser?.settings?.creditMessage}
          onSendMessage={handleSendMessage}
          isCreationMessageLoading={isPending}
          canSendPrivateNude={isCreator({ user }) && isUserVerified({ user })}
          openPrivateNudeModal={handleOpenPrivateNudeModal}
        />
      </div>
    </div>
  );
};

export default Conversation;
