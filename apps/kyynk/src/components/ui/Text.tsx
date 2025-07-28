import React, { FC, ReactNode } from 'react';
import { cn } from '@/utils/tailwind/cn';

interface Props {
  children: ReactNode;
  className?: string;
}

const Text: FC<Props> = ({ children, className }) => {
  return (
    <p className={cn('font-karla text-black m-0 text-base', className)}>
      {children}
    </p>
  );
};

export default Text;
