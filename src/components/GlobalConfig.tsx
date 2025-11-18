'use client';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useUser } from '@/hooks/users/useUser';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import { useFreeCreditCountdown } from '@/hooks/credits/useFreeCreditCountdown';

const GlobalConfig = () => {
  const { refetch, user } = useUser();
  const [shouldRefetch, setShouldRefetch] = useQueryState('shouldRefetch');
  const [claimFreeCreditParam, setClaimFreeCreditParam] =
    useQueryState('claimFreeCredit');
  const openModal = useGlobalModalStore((s) => s.openModal);
  const { canClaim } = useFreeCreditCountdown(user?.lastClaimFreeCredit);

  useEffect(() => {
    if (shouldRefetch) {
      setShouldRefetch(null);
      refetch();
    }
  }, [shouldRefetch, refetch, setShouldRefetch]);

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

  return null;
};

export default GlobalConfig;
