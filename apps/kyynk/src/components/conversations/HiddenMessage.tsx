import { FC } from 'react';
import { useAuthModal } from '@/hooks/auth/openAuthModal';
import { Button } from '../ui/Button';

interface HiddenMessageProps {
  messageLength?: number;
}

const HiddenMessage: FC<HiddenMessageProps> = () => {
  const { openSignUp } = useAuthModal();

  return (
    <Button onClick={openSignUp} variant="secondary">
      Sign up to unlock this message
    </Button>
  );
};

export default HiddenMessage;
