'use client';

import { UsersRound } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import Link from 'next/link';
import { appRouter } from '@/constants/appRouter';
import { useConversations } from '@/hooks/conversations/useConversations';
import { useCloseSideBarOnMobile } from '@/hooks/others/useCloseSideBarOnMobile';
import { useTranslations } from 'next-intl';

export function AppSidebar() {
  const { conversations } = useConversations();
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

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Sidebar className="mt-[68px]">
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
        {conversations && conversations.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>{t('sideBarChats')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {conversations.map((conversation) => (
                  <SidebarMenuButton key={conversation.id} asChild>
                    <Link
                      href={`/${conversation.aiGirlfriend.slug}`}
                      onClick={() => {
                        closeSidebarOnMobile();
                      }}
                    >
                      <span>{conversation.aiGirlfriend.pseudo}</span>
                    </Link>
                  </SidebarMenuButton>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
