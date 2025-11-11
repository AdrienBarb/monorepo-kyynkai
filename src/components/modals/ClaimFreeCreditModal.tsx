'use client';

import { FC } from 'react';
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
import {
  useFreeCreditCountdown,
  FREE_CREDITS_AMOUNT,
} from '@/hooks/credits/useFreeCreditCountdown';
import { formatTimeRemaining } from '@/utils/credits/formatTimeRemaining';

interface ClaimFreeCreditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ClaimFreeCreditModal: FC<ClaimFreeCreditModalProps> = ({
  open,
  setOpen,
}) => {
  const { user, refetch } = useUser();
  const { usePut } = useApi();
  const { timeUntilNextClaim, canClaim } = useFreeCreditCountdown(
    user?.lastClaimFreeCredit,
  );

  const claimMutation = usePut('/api/credits/claim-free', {});

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
      <DialogContent className="sm:max-w-md p-0 h-full w-full max-h-screen sm:h-auto sm:max-h-[90vh] overflow-y-auto z-[1000]">
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
