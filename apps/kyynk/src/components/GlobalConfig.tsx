'use client';

import React, { FC, ReactNode, useEffect, useState } from 'react';
import Maintenance from './Maintenance';
import { useUserStore } from '@/stores/UserStore';
import { useQueryState } from 'nuqs';
import { useUser } from '@/hooks/users/useUser';

interface Props {
  children: ReactNode;
}

const GlobalConfig: FC<Props> = ({ children }) => {
  const [shouldAllowAccess, setShouldAllowAccess] = useState(true);
  const { refetch } = useUser();
  const [shouldRefetch, setShouldRefetch] = useQueryState('shouldRefetch');

  useEffect(() => {
    if (shouldRefetch) {
      setShouldRefetch(null);
      refetch();
    }
  }, [shouldRefetch, refetch]);

  // TODO: DECOMMENT
  // useEffect(() => {
  //   const getConfig = async () => {
  //     try {
  //       const config = await configService.checkIsMaintenance();

  //       setShouldAllowAccess(config);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getConfig();
  // }, []);

  if (!shouldAllowAccess) {
    return <Maintenance />;
  }

  return <>{children}</>;
};

export default GlobalConfig;
