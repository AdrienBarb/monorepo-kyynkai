import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { cookies, headers } from 'next/headers';
import React, { FC, ReactNode } from 'react';
import { getCookie } from 'cookies-next/server';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import LoginButton from '@/components/layout/LoginButton';
import { UserDropdown } from '@/components/layout/UserDropdown';
import { auth } from '@/lib/better-auth/auth';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log('🚀 ~ AppLayout ~ session:', session);

  const defaultOpen =
    (await getCookie('sidebar_state', { cookies })) === 'true';

  const isLoggedIn = !!session?.user;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="w-full">
        <header className="sticky top-0 z-10 p-4 flex justify-between align-center bg-secondary-dark border-b border-custom-black/20 h-[68px]">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {isLoggedIn ? <UserDropdown /> : <LoginButton />}
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
