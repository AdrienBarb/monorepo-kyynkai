import { useEffect, useState } from 'react';

export const FREE_CREDITS_AMOUNT = 5;
export const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export const useFreeCreditCountdown = (
  lastClaimFreeCredit: string | Date | null | undefined,
) => {
  const [timeUntilNextClaim, setTimeUntilNextClaim] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!lastClaimFreeCredit) {
      setTimeUntilNextClaim(null);
      return;
    }

    const updateCountdown = () => {
      const lastClaim = new Date(lastClaimFreeCredit).getTime();
      const now = Date.now();
      const timeSinceLastClaim = now - lastClaim;
      const timeUntilNext = WEEK_IN_MS - timeSinceLastClaim;

      if (timeUntilNext <= 0) {
        setTimeUntilNextClaim(null);
      } else {
        setTimeUntilNextClaim(timeUntilNext);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [lastClaimFreeCredit]);

  const canClaim = !lastClaimFreeCredit || timeUntilNextClaim === null;

  return {
    timeUntilNextClaim,
    canClaim,
  };
};
