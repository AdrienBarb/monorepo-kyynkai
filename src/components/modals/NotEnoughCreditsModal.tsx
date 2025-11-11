'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog';
import { Button } from '../ui/Button';
import { getPaymentPageLink } from '@/utils/navigation/getPaymentPageLink';
import { useUser } from '@/hooks/users/useUser';
import { useIsFirstTimeBuyer } from '@/hooks/users/useIsFirstTimeBuyer';
import { CountdownTimer } from '../ui/CountdownTimer';
import Avatar from '../ui/Avatar';
import { useState } from 'react';
import { cn } from '@/utils/tailwind/cn';
import { trackingEvent } from '@/constants/trackingEvent';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';
import useApi from '@/hooks/requests/useApi';
import toast from 'react-hot-toast';
import { Coins, Gift } from 'lucide-react';
import {
  useFreeCreditCountdown,
  FREE_CREDITS_AMOUNT,
} from '@/hooks/credits/useFreeCreditCountdown';
import { formatTimeRemaining } from '@/utils/credits/formatTimeRemaining';

const NotEnoughCreditsModal = ({
  open,
  setOpen,
  avatarImageId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  avatarImageId: string;
}) => {
  const { user, refetch } = useUser();
  const { data: firstTimeBuyerData } = useIsFirstTimeBuyer();
  const [offerExpired, setOfferExpired] = useState(false);
  const { usePut } = useApi();
  const { timeUntilNextClaim, canClaim: canClaimFreeCredit } =
    useFreeCreditCountdown(user?.lastClaimFreeCredit);

  const isFirstTimeBuyer = firstTimeBuyerData?.isFirstTimeBuyer;
  const showDiscount = isFirstTimeBuyer && !offerExpired;
  const discount = showDiscount ? 80 : undefined;
  const { sendEventOnce } = useClientPostHogEvent();

  const claimMutation = usePut('/api/credits/claim-free', {});

  const handleClaimFreeCredit = async () => {
    try {
      await claimMutation.mutateAsync({});
      toast.success(`You've claimed ${FREE_CREDITS_AMOUNT} free credits!`);
      await refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to claim credits');
    }
  };

  const handleBuyMoreCredits = () => {
    sendEventOnce({
      eventName: trackingEvent.credit_topup_clicked,
      properties: {
        discount: discount ?? 0,
      },
    });

    window.location.href = getPaymentPageLink(
      user?.id!,
      window.location.href,
      discount,
    );
  };

  const handleOfferExpire = () => {
    setOfferExpired(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 h-full w-full max-h-screen sm:h-auto sm:max-h-[90vh] overflow-y-auto z-[1000]">
        <DialogHeader className="p-4">
          <DialogTitle className="text-custom-black font-rubik text-center">
            Buy more credits
          </DialogTitle>
        </DialogHeader>
        <div className="px-4">
          <div className="flex justify-center mt-4">
            <Avatar
              imageId={
                avatarImageId ?? process.env.NEXT_PUBLIC_DEFAULT_SIGN_UP_IMAGE
              }
              size={180}
            />
          </div>
          <h3 className="text-base text-custom-black mt-4 text-center">
            Hey babe! It looks like you&apos;re running low on credits.
            Let&apos;s top up so we can keep having fun together ❤️
          </h3>

          {canClaimFreeCredit && (
            <div className="mt-4 space-y-3 flex justify-center w-full">
              <div className="bg-secondary/20 p-4 rounded-lg border border-secondary text-center w-full">
                <div className="flex items-center justify-center mb-2 gap-2">
                  <Gift size={20} className="text-secondary" />
                  <span className="font-bold text-custom-black font-rubik">
                    Claim Your Weekly Free Credits!
                  </span>
                </div>
                <p className="text-sm text-custom-black/90 mb-3 font-karla">
                  Get{' '}
                  <span className="font-bold text-custom-black text-lg">
                    {FREE_CREDITS_AMOUNT} free credits
                  </span>{' '}
                  right now!
                </p>
                <Button
                  onClick={handleClaimFreeCredit}
                  disabled={claimMutation.isPending}
                  variant="secondary"
                  className="w-full font-karla"
                >
                  {claimMutation.isPending
                    ? 'Claiming...'
                    : `Claim ${FREE_CREDITS_AMOUNT} Free Credits`}
                </Button>
              </div>
            </div>
          )}

          {!canClaimFreeCredit && timeUntilNextClaim !== null && (
            <div className="mt-4 space-y-3 flex justify-center w-full">
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/30 text-center w-full">
                <div className="flex items-center justify-center mb-2 gap-2">
                  <Gift size={20} className="text-primary/70" />
                  <span className="font-semibold text-custom-black font-rubik text-sm">
                    Free Credits Available In:
                  </span>
                </div>
                <div className="text-lg font-bold text-primary font-rubik">
                  {formatTimeRemaining(timeUntilNextClaim)}
                </div>
              </div>
            </div>
          )}

          {showDiscount && (
            <div className="mt-4 space-y-3 flex justify-center w-full">
              <div className="bg-primary/20 p-4 rounded-lg border border-primary text-center w-full">
                <div className="text-2xl mb-4">🔥</div>
                <div className="flex items-center justify-center mb-2">
                  <span className="font-bold text-custom-black font-rubik">
                    FIRST-TIME BUYER SPECIAL!
                  </span>
                </div>
                <p className="text-sm text-custom-black/90 mb-3 font-karla">
                  Get{' '}
                  <span className="font-bold text-custom-black text-lg">
                    80% OFF
                  </span>{' '}
                  your first credit purchase!
                </p>
                <CountdownTimer
                  minutes={30}
                  onExpire={handleOfferExpire}
                  className="justify-center"
                />
              </div>
            </div>
          )}

          <DialogFooter className="w-full py-4">
            <Button
              onClick={handleBuyMoreCredits}
              className={cn(
                'w-full',
                showDiscount ? 'font-bold font-karla' : 'font-karla',
              )}
            >
              {showDiscount ? 'Claim 80% OFF Now!' : 'Buy more credits'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotEnoughCreditsModal;
