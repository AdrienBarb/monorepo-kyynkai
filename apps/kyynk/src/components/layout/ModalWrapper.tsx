'use client';

import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import PaymentModal from '@/components/modals/PaymentModal';
import NudeCreationModal from '@/components/modals/NudeCreationModal';
import NotEnoughCreditsModal from '@/components/modals/NotEnoughCreditsModal';
import NudeEditModal from '@/components/modals/NudeEditModal';
import NudeModal from '@/components/modals/NudeModal';
import ConfirmationModal from '../modals/ConfirmationModal';
import PrivateNudeModal from '../modals/PrivateNudeModal';
import AuthModal from '../auth/AuthModal';

const ModalWrapper = () => {
  const stack = useGlobalModalStore((s) => s.stack);
  const closeModal = useGlobalModalStore((s) => s.closeModal);
  const top = stack[stack.length - 1];

  if (!top) return null;

  switch (top.type) {
    case 'payment':
      return <PaymentModal {...top.data} open setOpen={closeModal} />;
    case 'nudeCreation':
      return <NudeCreationModal {...top.data} open setOpen={closeModal} />;
    case 'notEnoughCredits':
      return <NotEnoughCreditsModal {...top.data} open setOpen={closeModal} />;
    case 'nudeEdit':
      return <NudeEditModal {...top.data} open setOpen={closeModal} />;
    case 'nudeView':
      return <NudeModal {...top.data} open setOpen={closeModal} />;
    case 'confirmation':
      return <ConfirmationModal {...top.data} open setOpen={closeModal} />;
    case 'privateNude':
      return <PrivateNudeModal {...top.data} open setOpen={closeModal} />;
    case 'auth':
      return <AuthModal open setOpen={closeModal} />;
    default:
      return null;
  }
};

export default ModalWrapper;
