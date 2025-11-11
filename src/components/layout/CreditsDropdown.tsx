'use client';

import { FC, useState } from 'react';
import { Coins, Gift } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/hooks/users/useUser';
import { useTranslations } from 'next-intl';
import { getPaymentPageLink } from '@/utils/navigation/getPaymentPageLink';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

const CreditsDropdown: FC = () => {
  const { user } = useUser();
  const t = useTranslations();
  const { openModal } = useGlobalModalStore();
  const [open, setOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-primary hover:text-background hover:bg-primary"
        >
          <Coins size={18} />
          <span className="hidden sm:inline">{user.creditBalance} credits</span>
          <span className="sm:hidden">{user.creditBalance}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuItem
          onClick={() => {
            setOpen(false);
            openModal('claimFreeCredit');
          }}
          className="text-primary cursor-pointer"
        >
          <Gift size={16} />
          Claim Free Credit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            window.location.href = getPaymentPageLink(
              user.id,
              window.location.href,
            );
          }}
          className="text-primary cursor-pointer"
        >
          <Coins size={16} />
          {t('navUserBuyCredits')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreditsDropdown;
