'use client';

import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';
import { useUser } from '@/hooks/users/useUser';
import {
  cleanUTMFromLocalStorage,
  getUTMFromLocalStorage,
} from '@/utils/tracking/getUTMFromLocalStorage';
import useApi from '@/hooks/requests/useApi';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import { useFreeCreditCountdown } from '@/hooks/credits/useFreeCreditCountdown';

interface Props {
  children: ReactNode;
}

const GlobalConfig: FC<Props> = ({ children }) => {
  const { refetch, user } = useUser();
  const [shouldRefetch, setShouldRefetch] = useQueryState('shouldRefetch');
  const [claimFreeCreditParam, setClaimFreeCreditParam] =
    useQueryState('claimFreeCredit');
  const { usePut } = useApi();
  const openModal = useGlobalModalStore((s) => s.openModal);
  const { canClaim } = useFreeCreditCountdown(user?.lastClaimFreeCredit);

  const { mutate: updateUser } = usePut('/api/me', {
    onSuccess: () => {
      cleanUTMFromLocalStorage();
    },
  });

  const handleToltSignup = async (email: string) => {
    const result = await window.tolt.signup(email);

    updateUser({
      toltData: result,
    });
  };

  useEffect(() => {
    if (shouldRefetch) {
      setShouldRefetch(null);
      refetch();
    }
  }, [shouldRefetch, refetch, setShouldRefetch]);

  // Signup to Tolt if user doesn't have toltData
  useEffect(() => {
    if (user) {
      if (!user.toltData) {
        handleToltSignup(user.email);
      }
    }
  }, [user, updateUser]);

  // Update utm values
  useEffect(() => {
    if (user) {
      const utmValues = getUTMFromLocalStorage();

      if (utmValues) {
        updateUser({
          utmTracking: utmValues,
        });
      }
    }
  }, [user, updateUser]);

  useEffect(() => {
    if (claimFreeCreditParam === 'true' && user && canClaim) {
      setClaimFreeCreditParam(null);
      openModal('claimFreeCredit');
    }
  }, [
    claimFreeCreditParam,
    user,
    canClaim,
    setClaimFreeCreditParam,
    openModal,
  ]);

  return <>{children}</>;
};

export default GlobalConfig;
