import React, { FC, ReactNode } from 'react';
import { cn } from '@/utils/tailwind/cn';

interface Props {
  children: ReactNode;
  className?: string;
}

const PaddingContainer: FC<Props> = ({ children, className }) => {
  return <div className={cn('p-4', className)}>{children}</div>;
};

export default PaddingContainer;
