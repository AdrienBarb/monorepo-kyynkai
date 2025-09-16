'use client';

import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';
import { useUser } from '@/hooks/users/useUser';
import {
  cleanUTMFromLocalStorage,
  getUTMFromLocalStorage,
} from '@/utils/tracking/getUTMFromLocalStorage';
import useApi from '@/hooks/requests/useApi';

interface Props {
  children: ReactNode;
}

const GlobalConfig: FC<Props> = ({ children }) => {
  const [shouldAllowAccess, setShouldAllowAccess] = useState(true);
  const { refetch, user } = useUser();
  const [shouldRefetch, setShouldRefetch] = useQueryState('shouldRefetch');
  const { usePut } = useApi();

  const { mutate: updateUser } = usePut('/api/me', {
    onSuccess: () => {
      cleanUTMFromLocalStorage();
    },
  });

  useEffect(() => {
    if (shouldRefetch) {
      setShouldRefetch(null);
      refetch();
    }
  }, [shouldRefetch, refetch]);

  useEffect(() => {
    if (user) {
      const utmValues = getUTMFromLocalStorage();

      if (utmValues) {
        updateUser({ utmTracking: utmValues });
      }
    }
  }, [user]);

  return <>{children}</>;
};

export default GlobalConfig;
