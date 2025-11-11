'use client';

import { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/hooks/users/useUser';
import { Coins } from 'lucide-react';
import useApi from '@/hooks/requests/useApi';
import toast from 'react-hot-toast';

interface ClaimFreeCreditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const FREE_CREDITS_AMOUNT = 5;
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

const ClaimFreeCreditModal: FC<ClaimFreeCreditModalProps> = ({
  open,
  setOpen,
}) => {
  const { user, refetch } = useUser();
  const { usePut } = useApi();
  const [timeUntilNextClaim, setTimeUntilNextClaim] = useState<number | null>(
    null,
  );

  const claimMutation = usePut('/api/credits/claim-free', {}, {});

  useEffect(() => {
    if (!user?.lastClaimFreeCredit) {
      setTimeUntilNextClaim(null);
      return;
    }

    const updateCountdown = () => {
      const lastClaim = new Date(user.lastClaimFreeCredit).getTime();
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
  }, [user?.lastClaimFreeCredit]);

  const canClaim = !user?.lastClaimFreeCredit || timeUntilNextClaim === null;

  const formatTimeRemaining = (ms: number): string => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  const handleClaim = async () => {
    try {
      await claimMutation.mutateAsync({});
      toast.success(`You've claimed ${FREE_CREDITS_AMOUNT} free credits!`);
      await refetch();
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to claim credits');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 h-full w-full max-h-screen sm:h-auto sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-4">
          <DialogTitle className="text-center text-primary">
            Claim Free Credits
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-primary/20 p-6">
              <Coins size={48} className="text-primary" />
            </div>

            {canClaim ? (
              <>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Claim Your Weekly Free Credits!
                  </h3>
                  <p className="text-sm text-primary/80">
                    Get {FREE_CREDITS_AMOUNT} free credits every week. This
                    week&apos;s credits are ready for you!
                  </p>
                </div>

                <DialogFooter className="w-full py-4">
                  <Button
                    onClick={handleClaim}
                    disabled={claimMutation.isPending}
                    className="w-full"
                  >
                    {claimMutation.isPending
                      ? 'Claiming...'
                      : `Claim ${FREE_CREDITS_AMOUNT} Credits`}
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Already Claimed This Week
                  </h3>
                  <p className="text-sm text-primary/80 mb-4">
                    You&apos;ve already claimed your free credits this week.
                    Come back in:
                  </p>
                  <div className="bg-primary/20 p-4 rounded-lg border border-primary/30">
                    <div className="text-2xl font-bold text-primary font-rubik">
                      {timeUntilNextClaim !== null &&
                        formatTimeRemaining(timeUntilNextClaim)}
                    </div>
                  </div>
                </div>

                <DialogFooter className="w-full py-4">
                  <Button onClick={() => setOpen(false)} className="w-full">
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimFreeCreditModal;

