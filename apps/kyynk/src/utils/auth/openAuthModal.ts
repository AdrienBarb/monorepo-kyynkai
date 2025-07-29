import { useQueryState } from 'nuqs';

export const useAuthModal = () => {
  const [authParam, setAuthParam] = useQueryState('auth');

  const openSignIn = () => {
    setAuthParam('signin');
  };

  const openSignUp = () => {
    setAuthParam('signup');
  };

  const closeAuthModal = () => {
    setAuthParam(null);
  };

  const isOpen = !!authParam;
  const isSignInMode = authParam === 'signin';
  const isSignUpMode = authParam === 'signup';

  return {
    isOpen,
    isSignInMode,
    isSignUpMode,
    openSignIn,
    openSignUp,
    closeAuthModal,
  };
};
