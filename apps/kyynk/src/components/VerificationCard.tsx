import React, { FC } from 'react';
import { cn } from '@/utils/tailwind/cn';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface VerificationCardProps {
  isValid: boolean;
  label: string;
  path: string;
}

const VerificationCard: FC<VerificationCardProps> = ({
  isValid,
  label,
  path,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (isValid) {
      return;
    }

    router.push(path);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex justify-between items-center p-4 rounded-md transition-colors',
        isValid
          ? 'bg-primary text-secondary border border-primary cursor-default'
          : 'bg-transparent text-custom-black border border-custom-black cursor-pointer',
      )}
    >
      <div>
        <div className="text-lg font-medium">{label}</div>
      </div>
      <div>{isValid ? <Check size={16} /> : <ArrowRight size={16} />}</div>
    </div>
  );
};

export default VerificationCard;
