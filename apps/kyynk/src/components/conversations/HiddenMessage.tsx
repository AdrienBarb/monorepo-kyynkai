import { FC } from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

interface HiddenMessageProps {
  messageLength?: number;
}

const HiddenMessage: FC<HiddenMessageProps> = () => {
  const { openModal } = useGlobalModalStore();

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <div className="relative max-w-[75%] rounded-2xl p-3 bg-primary/40 backdrop-blur-sm">
        <p className="text-base text-custom-black/60 blur-sm select-none">
          I was just thinking about you… maybe tonight we could…
        </p>

        <Button
          onClick={() => openModal('auth')}
          variant="default"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-sm font-medium w-min text-custom-black"
        >
          🔓 Unlock
        </Button>

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
    </div>
  );
};

export default HiddenMessage;
