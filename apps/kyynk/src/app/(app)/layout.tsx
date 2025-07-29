import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { cookies } from 'next/headers';
import React, { FC, ReactNode } from 'react';
import { getCookie } from 'cookies-next/server';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import LoginWrapper from '@/components/auth/LoginWrapper';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = async ({ children }) => {
  const defaultOpen =
    (await getCookie('sidebar_state', { cookies })) === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="w-full">
        <header className="sticky top-0 z-10 p-4 flex justify-between align-center bg-secondary-dark border-b border-custom-black/20 h-[68px]">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <LoginWrapper />
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
