import { FC } from 'react';
import { useAuthModal } from '@/hooks/auth/openAuthModal';
import { Button } from '../ui/Button';

interface HiddenMessageProps {
  messageLength?: number;
}

const HiddenMessage: FC<HiddenMessageProps> = () => {
  const { openSignUp } = useAuthModal();

  return (
    <div className="p-3 rounded-lg break-words bg-secondary-dark text-custom-black">
      <div className="relative flex items-center">
        <Button onClick={openSignUp} variant="link" className="pl-0">
          Sign up to unlock this message
        </Button>
        <span className="text-lg">🔥</span>
      </div>
    </div>
  );
};

export default HiddenMessage;
