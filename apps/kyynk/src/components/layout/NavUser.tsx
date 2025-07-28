'use client';

import {
  BadgeCheck,
  ChevronsUpDown,
  Coins,
  HelpCircle,
  LogOut,
  User,
} from 'lucide-react';

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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/Sidebar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/users/useUser';
import { appRouter } from '@/constants/appRouter';
import { formatCredits } from '@/utils/prices/formatCredits';
import { isCreator } from '@/utils/users/isCreator';
import { useCloseSideBarOnMobile } from '@/hooks/others/useCloseSideBarOnMobile';
import { useTranslations } from 'next-intl';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useUser();
  const { openModal } = useGlobalModalStore();
  const { closeSidebarOnMobile } = useCloseSideBarOnMobile();
  const t = useTranslations();

  const logout = () => {
    toast.success(t('navUserLoggedOut'));
    signOut({ redirectTo: '/' });
  };

  const UserDetails = () => {
    return (
      <>
        <Avatar
          size={32}
          imageId={user?.profileImageId}
          pseudo={user?.pseudo}
        />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user?.pseudo}</span>
          <span className="truncate text-xs">
            {formatCredits(user?.creditsAmount || 0)} credits
          </span>
        </div>
      </>
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <UserDetails />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserDetails />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isCreator({ user }) && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/${user?.slug}`}
                      onClick={closeSidebarOnMobile}
                    >
                      <User />
                      {t('navUserMyProfile')}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  openModal('payment');
                  closeSidebarOnMobile();
                }}
              >
                <Coins />
                {t('navUserBuyCredits')}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={appRouter.becomeCreator}
                  className="font-karla"
                  onClick={closeSidebarOnMobile}
                >
                  <BadgeCheck />
                  {t('navUserBecomeCreator')}
                </Link>
              </DropdownMenuItem>
              {isCreator({ user }) && (
                <DropdownMenuItem asChild>
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_CREATOR_TOOLKIT_NOTION_URL || ''
                    }
                    target="_blank"
                    className="font-karla"
                    onClick={closeSidebarOnMobile}
                  >
                    <HelpCircle />
                    {t('navUserNeedHelp')}
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              {t('navUserLogout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
