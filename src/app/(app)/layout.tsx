import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { cookies } from 'next/headers';
import React, { FC, ReactNode } from 'react';
import { getCookie } from 'cookies-next/server';
import CreditsDropdown from '@/components/layout/CreditsDropdown';
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
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="fixed right-0 left-0 top-0 z-50 p-4 flex justify-between align-center bg-background border-b border-primary/20 h-[68px]">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <CreditsDropdown />
            <LoginWrapper />
          </div>
        </header>
        <main className="mt-[68px]">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
