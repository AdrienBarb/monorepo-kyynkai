import React, { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

interface CustomSessionProviderProps {
  children: ReactNode;
}

const CustomSessionProvider: FC<CustomSessionProviderProps> = async ({
  children,
}) => {
  const session = await auth();

  return (
    <SessionProvider session={session} key={session?.user?.id}>
      {children}
    </SessionProvider>
  );
};

export default CustomSessionProvider;
