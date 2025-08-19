'use client';

import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import NotEnoughCreditsModal from '../modals/NotEnoughCreditsModal';

const ModalWrapper = () => {
  const stack = useGlobalModalStore((s) => s.stack);
  const closeModal = useGlobalModalStore((s) => s.closeModal);
  const top = stack[stack.length - 1];

  if (!top) return null;

  switch (top.type) {
    case 'notEnoughCredits':
      return <NotEnoughCreditsModal {...top.data} open setOpen={closeModal} />;
    default:
      return null;
  }
};

export default ModalWrapper;
