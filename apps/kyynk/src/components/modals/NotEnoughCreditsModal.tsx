'use client';

import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog';
import { Button } from '../ui/Button';

const NotEnoughCreditsModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { openModal } = useGlobalModalStore();

  const handleBuyMoreCredits = () => {
    console.log('🚀 ~ handleBuyMoreCredits ~ payment:');
    openModal('payment');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-[1000]">
        <DialogHeader>
          <DialogTitle>Not Enough Credits</DialogTitle>
          <DialogDescription>
            You do not have enough credits to buy this nude. Would you like to
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
