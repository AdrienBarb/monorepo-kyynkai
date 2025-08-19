'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog';
import { Button } from '../ui/Button';
import { getPaymentPageLink } from '@/utils/navigation/getPaymentPageLink';
import { useUser } from '@/hooks/users/useUser';

const NotEnoughCreditsModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { user } = useUser();

  const handleBuyMoreCredits = () => {
    window.location.href = getPaymentPageLink(user?.id!, window.location.href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-[1000]">
        <DialogHeader>
          <DialogTitle>Not Enough Credits</DialogTitle>
          <DialogDescription>
            You do not have enough credits to send a message. Would you like to
            buy more credits?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleBuyMoreCredits}>Buy more credits</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotEnoughCreditsModal;
