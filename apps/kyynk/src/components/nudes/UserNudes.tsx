'use client';

import React, { FC } from 'react';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { useUser } from '@/hooks/users/useUser';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { FetchedUserType } from '@/types/users';
import { NudeWithPermissions } from '@/types/nudes';
import { cn } from '@/utils/tailwind/cn';
import NudeCard from './NudeCard';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

interface Props {
  initialNudes: NudeWithPermissions[];
  user: FetchedUserType;
}

const UserNudes: FC<Props> = ({ initialNudes, user }) => {
  const { slug } = useParams<{ slug: string }>();
  const { user: loggedUser } = useUser();
  const { useGet } = useApi();
  const openModal = useGlobalModalStore((s) => s.openModal);

  const { data: nudes, refetch } = useGet(
    `/api/users/${slug}/nudes`,
    {},
    {
      initialData: initialNudes,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );

  const handleNudeClick = (nude: NudeWithPermissions) => {
    openModal('nudeView', { nude, refetch, showHeader: true });
  };

  if (loggedUser?.slug !== slug && !isUserVerified({ user })) {
    return null;
  }

  return (
    <>
      <div className={cn('grid gap-4 mt-4', 'grid-cols-2 lg:grid-cols-3')}>
        {nudes.map((nude: NudeWithPermissions) => (
          <NudeCard
            key={nude.id}
            nude={nude}
            onClick={() => handleNudeClick(nude)}
          />
        ))}
      </div>
    </>
  );
};

export default UserNudes;
