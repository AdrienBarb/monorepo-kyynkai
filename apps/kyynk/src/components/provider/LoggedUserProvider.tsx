'use client';

import React, { FC, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUser } from '@/hooks/users/useUser';

interface Props {
  children: ReactNode;
}

const LoggedUserProvider: FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const { refetch } = useUser();

  useEffect(() => {
    if (session?.user?.id) {
      refetch();
    }
  }, [session?.user?.id, refetch]);

  return <>{children}</>;
};

export default LoggedUserProvider;
