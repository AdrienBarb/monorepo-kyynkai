'use client';

import React, { FC } from 'react';
import useApi from '@/hooks/requests/useApi';
import { User } from '@prisma/client';
import { cn } from '@/utils/tailwind/cn';
import UserCard from './users/UserCard';

interface Props {
  initialUsers: User[];
}

const UsersList: FC<Props> = ({ initialUsers }) => {
  const { useGet } = useApi();

  const { data: users } = useGet(
    '/api/users',
    {},
    {
      initialData: initialUsers,
      refetchOnWindowFocus: true,
    },
  );

  return (
    <div
      className={cn(
        'grid gap-4 mx-auto mt-8',
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg',
      )}
    >
      {users.map((user: User) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
