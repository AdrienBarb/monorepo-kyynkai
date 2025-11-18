'use client';

import { UsersRound, Sparkles, Images } from 'lucide-react';
import { FaTelegram, FaTiktok, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
      title: 'fantasies',
      url: appRouter.home,
      icon: Sparkles,
      isVisible: true,
    },
    {
      title: 'girls',
      url: '/girls',
      icon: UsersRound,
      isVisible: true,
    },
    {
      title: 'gallery',
      url: '/gallery',
      icon: Images,
      isVisible: true,
    },
  ];

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Sidebar className="mt-[68px] flex flex-col h-[calc(100vh-68px)]">
      <SidebarContent className="flex-1 overflow-auto">
        <SidebarGroup>
          <SidebarGroupLabel>{t('sideBarPlatform')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platforms.map(
                (item) =>
                  item.isVisible && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          onClick={() => {
                            closeSidebarOnMobile();
                          }}
                        >
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
      <SidebarFooter className="flex-shrink-0">
        <div className="flex items-center justify-center px-2 mb-2">
          <Link
            href="/affiliate"
            onClick={closeSidebarOnMobile}
            className="w-full rounded-md bg-primary px-3 py-2 text-center text-base font-semibold text-background hover:bg-primary/90 transition-colors"
          >
            Affiliate Program 💰
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4 px-2 mb-2">
          <Link
            href="https://t.me/kyynkai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaTelegram size={20} />
          </Link>
          <Link
            href="https://www.tiktok.com/@kyynk.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaTiktok size={20} />
          </Link>
          <Link
            href="https://www.instagram.com/kyynk.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaInstagram size={20} />
          </Link>
          <Link
            href="https://x.com/kyynk_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaXTwitter size={20} />
          </Link>
        </div>
        <div className="flex items-center flex-wrap justify-center gap-1 px-2 text-xs">
          <Link
            href="/privacy-policy"
            onClick={closeSidebarOnMobile}
            className="text-xs text-primary"
          >
            {t('privacyPolicy')}
          </Link>
          <span className="text-primary">•</span>
          <Link
            href="/terms"
            onClick={closeSidebarOnMobile}
            className="text-xs text-primary"
          >
            {t('termsConditions')}
          </Link>
          <span className="text-primary">•</span>
          <Link
            href="/contact"
            onClick={closeSidebarOnMobile}
            className="text-xs text-primary"
          >
            {t('contactUs')}
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
