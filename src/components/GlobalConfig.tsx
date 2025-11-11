'use client';

import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';
import { useUser } from '@/hooks/users/useUser';
import {
  cleanUTMFromLocalStorage,
  getUTMFromLocalStorage,
} from '@/utils/tracking/getUTMFromLocalStorage';
import {
  cleanTrackdeskCidFromCookie,
  getTrackdeskCidFromCookie,
} from '@/utils/tracking/getTrackdeskCidFromCookie';
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
      cleanTrackdeskCidFromCookie();
    },
  });

  useEffect(() => {
    if (shouldRefetch) {
      setShouldRefetch(null);
      refetch();
    }
  }, [shouldRefetch, refetch, setShouldRefetch]);

  useEffect(() => {
    if (user) {
      const utmValues = getUTMFromLocalStorage();
      const trackdeskCid = getTrackdeskCidFromCookie();

      const updateData: any = {};

      if (utmValues) {
        updateData.utmTracking = utmValues;
      }

      if (trackdeskCid) {
        updateData.trackdeskCid = trackdeskCid;
      }

      if (Object.keys(updateData).length > 0) {
        updateUser(updateData);
      }
    }
  }, [user, updateUser]);

  return <>{children}</>;
};

export default GlobalConfig;
