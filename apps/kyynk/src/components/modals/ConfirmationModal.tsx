import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog';
import { Button } from '../ui/Button';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDeleteConfirm: () => void;
  text: string;
}

const ConfirmationModal: React.FC<Props> = ({
  open,
  setOpen,
  onDeleteConfirm,
  text,
}) => {
  const handleConfirm = () => {
    setOpen(false);
    onDeleteConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-[1000]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="destructive">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
