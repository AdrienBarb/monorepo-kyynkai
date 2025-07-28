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
  SidebarFooter,
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
import { NavUser } from './NavUser';
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

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onCloseSidebar,
  onMarkAsRead,
}) => {
  const { otherUser } = useConversationUsers(conversation.participants);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={`/account/conversations/${conversation.id}`}
          onClick={() => {
            onCloseSidebar();
            if (conversation.hasUnreadMessages) {
              onMarkAsRead(conversation.id);
            }
          }}
        >
          <span>{otherUser?.pseudo || 'Unknown User'}</span>
        </Link>
      </SidebarMenuButton>
      {conversation.hasUnreadMessages && (
        <SidebarMenuBadge>
          <Dot />
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
};

export function AppSidebar() {
  const { user, isLoggedIn } = useUser();
  const { conversations, markConversationAsRead } = useConversations();
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
  ];

  const creators = [
    {
      title: 'revenue',
      url: appRouter.revenue,
      icon: BadgeEuro,
    },
  ];

  const settings = [
    {
      title: 'myProfile',
      url: appRouter.myProfile,
      icon: User,
      isVisible: isLoggedIn(),
    },
    {
      title: 'conversations',
      url: appRouter.settingsConversations,
      icon: MessageCircle,
      isVisible: isLoggedIn() && isCreator({ user }),
    },
    {
      title: 'payment',
      url: appRouter.settingsPayment,
      icon: CreditCard,
      isVisible: isLoggedIn() && isCreator({ user }),
    },
    {
      title: 'preferences',
      url: appRouter.settingsPreferences,
      icon: Sliders,
      isVisible: isLoggedIn(),
    },
  ];

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Sidebar>
      <SidebarHeader>
        {isMobile && <SidebarTrigger />}
        {isLoggedIn() && <AddButton />}
      </SidebarHeader>
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
              {isLoggedIn() && (
                <Collapsible defaultOpen={false} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Settings />
                        <span className="text-sm font-rubik">
                          {t('sideBarSettings')}
                        </span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {settings.map(
                          (item) =>
                            item.isVisible && (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuButton asChild>
                                  <Link
                                    href={item.url}
                                    onClick={closeSidebarOnMobile}
                                  >
                                    <item.icon />
                                    <span>
                                      {t('sideBar' + capitalize(item.title))}
                                    </span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ),
                        )}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isCreator({ user }) && isUserVerified({ user }) && (
          <SidebarGroup>
            <SidebarGroupLabel>{t('sideBarCreators')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {creators.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} onClick={closeSidebarOnMobile}>
                        <item.icon />
                        <span>{t('sideBar' + capitalize(item.title))}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {conversations && conversations.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>{t('sideBarChats')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    onCloseSidebar={closeSidebarOnMobile}
                    onMarkAsRead={markConversationAsRead}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
