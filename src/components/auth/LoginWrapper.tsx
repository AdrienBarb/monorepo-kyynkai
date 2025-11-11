'use client';

import { useUser } from '@/hooks/users/useUser';
import { UserDropdown } from '../layout/UserDropdown';
import LoginButton from '../layout/LoginButton';

const LoginWrapper = () => {
  const { isLoggedIn } = useUser();

  return isLoggedIn() ? <UserDropdown /> : <LoginButton />;
};

export default LoginWrapper;
