'use client';

import ConversationInput from './ConversationInput';
import { FetchedUserType } from '@/types/users';
import { useUser } from '@/hooks/users/useUser';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useConversations } from '@/hooks/conversations/useConversations';
import { useCreateConversation } from '@/hooks/conversations/useCreateConversation';

const ProfileConversationInput = ({ user }: { user: FetchedUserType }) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user: loggedUser, refetch: refetchUser } = useUser();

  const { refetch: refetchConversations } = useConversations();

  const { handleSendMessageAndCreateConversation, isPending } =
    useCreateConversation({
      user: loggedUser,
      otherUser: user,
      onSuccess: (newConversation) => {
        refetchConversations();
        refetchUser();
        router.push(`/account/conversations/${newConversation.id}`);
      },
    });

  const handleSendMessage = ({ message }: { message: string }) => {
    handleSendMessageAndCreateConversation({ message, slug: slug as string });
  };

  if (loggedUser?.slug !== slug && !isUserVerified({ user })) {
    return null;
  }

  if (loggedUser?.slug === slug) {
    return null;
  }

  return (
    <div className="w-full mx-auto mt-8 mb-16">
      <ConversationInput
        creditMessage={user.settings.creditMessage}
        onSendMessage={handleSendMessage}
        isCreationMessageLoading={isPending}
      />
    </div>
  );
};

export default ProfileConversationInput;
