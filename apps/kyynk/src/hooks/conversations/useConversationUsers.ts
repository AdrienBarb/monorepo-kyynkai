import { useMemo } from 'react';
import { useUser } from '@/hooks/users/useUser';
import { ConversationUser } from '@/types/users';

const useConversationUsers = (participants: ConversationUser[]) => {
  const { user } = useUser();

  const otherUser = useMemo(() => {
    return (
      participants.find((p: ConversationUser) => p.id !== user?.id) || null
    );
  }, [participants, user?.id]);

  const currentUser = useMemo(() => {
    return (
      participants.find((p: ConversationUser) => p.id === user?.id) || null
    );
  }, [participants, user?.id]);

  return { currentUser, otherUser };
};

export default useConversationUsers;
