import { FC } from 'react';
import { useAuthModal } from '@/hooks/auth/openAuthModal';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

interface HiddenMessageProps {
  messageLength?: number;
}

const HiddenMessage: FC<HiddenMessageProps> = () => {
  const { openSignUp } = useAuthModal();

  return (
    // <Button onClick={openSignUp} variant="secondary">
    //   Sign up to unlock this message
    // </Button>
    <div className="flex flex-col items-start gap-2 w-full">
      {/* AI Girlfriend bubble (blurred) */}
      <div className="relative max-w-[75%] rounded-2xl p-3 bg-primary/40 backdrop-blur-sm">
        {/* Blurred teaser text */}
        <p className="text-base text-custom-black/60 blur-sm select-none">
          I was just thinking about you… maybe tonight we could…
        </p>

        <Button
          onClick={openSignUp}
          variant="default"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-sm font-medium w-min text-custom-black"
        >
          🔓 Unlock
        </Button>

        {/* Typing indicator (dots) */}
        <div className="absolute bottom-2 right-3 flex gap-1">
          <motion.span
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.span
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
      </div>

      {/* <div className="mt-2 w-full max-w-[80%] rounded-2xl bg-background/90 shadow-lg p-4 text-center border border-primary/20">
        <h3 className="text-lg font-semibold text-custom-black">
          Her reply is waiting for you 💌
        </h3>
        <p className="text-sm text-secondary mt-1">
          Sign up now to read it instantly <br /> + claim your{' '}
          <span className="font-medium text-primary">30 free credits</span>.
        </p>
        <Button
          onClick={openSignUp}
          className="mt-3 w-full bg-primary hover:bg-primary/80 text-custom-black rounded-xl py-2 text-base font-medium"
        >
          🔓 Unlock & Sign Up
        </Button>
        <p className="mt-2 text-xs text-secondary/70">
          No spam. Cancel anytime.
        </p>
      </div> */}
    </div>
  );
};

export default HiddenMessage;
