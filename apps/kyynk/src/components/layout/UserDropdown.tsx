'use client';

import { Coins, LogOut } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useUser } from '@/hooks/users/useUser';
import { useTranslations } from 'next-intl';
import { signOut } from '@/lib/better-auth/auth-client';
import { useRouter } from 'next/navigation';
import { getPaymentPageLink } from '@/utils/navigation/getPaymentPageLink';

export const UserDropdown: React.FC = () => {
  const { user } = useUser();
  const t = useTranslations();
  const router = useRouter();

  const logout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

  const UserDetails = () => {
    return (
      <div className="flex items-center gap-2">
        <Avatar size={32} />
        <div className="grid flex-1 text-left text-sm leading-tight text-primary">
          <span className="text-sm truncate">{user?.email}</span>
          <span className="text-xs truncate">
            {user?.creditBalance} credits
          </span>
        </div>
      </div>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar size={38} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md "
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserDetails />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              window.location.href = getPaymentPageLink(
                user?.id!,
                window.location.href,
              );
            }}
            className="text-primary"
          >
            <Coins />
            {t('navUserBuyCredits')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-primary">
          <LogOut />
          {t('navUserLogout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
