'use client';

import { CirclePlus } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';
import { useUser } from '@/hooks/users/useUser';
import { isCreator } from '@/utils/users/isCreator';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { useTranslations } from 'next-intl';

const AddButton = () => {
  const { openModal } = useGlobalModalStore();
  const { user } = useUser();
  const t = useTranslations();

  if (!isCreator({ user }) || !isUserVerified({ user })) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      className="flex items-center gap-2"
      onClick={() => openModal('nudeCreation')}
    >
      <CirclePlus size={18} />
      {t('addNude')}
    </Button>
  );
};

export default AddButton;
