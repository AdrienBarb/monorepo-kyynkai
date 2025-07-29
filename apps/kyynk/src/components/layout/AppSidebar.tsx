'use client';

import {
  ChevronRight,
  Home,
  MessageCircle,
  Settings,
  UsersRound,
  CreditCard,
  Sliders,
  BadgeEuro,
  User,
  Dot,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from '@/components/ui/Sidebar';
import Link from 'next/link';
import { appRouter } from '@/constants/appRouter';
import { useUser } from '@/hooks/users/useUser';
import { isCreator } from '@/utils/users/isCreator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { useConversations } from '@/hooks/conversations/useConversations';
import { useCloseSideBarOnMobile } from '@/hooks/others/useCloseSideBarOnMobile';
import useConversationUsers from '@/hooks/conversations/useConversationUsers';
import { ConversationType } from '@/types/conversations';
import { useTranslations } from 'next-intl';
import AddButton from '../nudes/AddButton';

interface ConversationItemProps {
  conversation: ConversationType;
  onCloseSidebar: () => void;
  onMarkAsRead: (conversationId: string) => void;
}

export function AppSidebar() {
  const { user, isLoggedIn } = useUser();
  // const { conversations, markConversationAsRead } = useConversations();
  const isMobile = useIsMobile();
  const { closeSidebarOnMobile } = useCloseSideBarOnMobile();
  const t = useTranslations();

  const platforms = [
    {
      title: 'models',
      url: appRouter.home,
      icon: UsersRound,
      isVisible: true,
    },
    {
      title: 'conversations',
      url: appRouter.conversations,
      icon: MessageCircle,
      isVisible: isLoggedIn(),
    },
  ];

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('sideBarPlatform')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platforms.map(
                (item) =>
                  item.isVisible && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url} onClick={closeSidebarOnMobile}>
                          <item.icon />
                          <span>{t('sideBar' + capitalize(item.title))}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
