'use client';

import React, { FC } from 'react';
import useApi from '@/hooks/requests/useApi';
import { AIGirlfriend } from '@prisma/client';
import { cn } from '@/utils/tailwind/cn';
import AiGirlfriendCard from './ai-girlfriend/AiGirlfriendCard';

interface Props {
  initialAiGirlfriends: AIGirlfriend[];
}

const UsersList: FC<Props> = ({ initialAiGirlfriends }) => {
  const { useGet } = useApi();

  const { data: users } = useGet(
    '/api/ai-girlfriends',
    {},
    {
      initialData: initialAiGirlfriends,
      refetchOnWindowFocus: true,
    },
  );

  return (
    <div
      className={cn(
        'grid gap-4 mx-auto mt-8',
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
      )}
    >
      {users.map((user: AIGirlfriend) => (
        <AiGirlfriendCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
