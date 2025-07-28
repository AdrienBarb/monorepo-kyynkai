import React, { FC } from 'react';
import Text from '@/components/ui/Text';
import Title from '@/components/ui/Title';
import { cn } from '@/utils/tailwind/cn';

interface Props {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const PageHeader: FC<Props> = ({ title, description, children, className }) => {
  return (
    <div className={cn('flex items-center justify-between mb-8', className)}>
      <div>
        <Title Tag="h2">{title}</Title>
        {description && <Text>{description}</Text>}
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
