import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import Text from '@/components/ui/Text';
import Title from './ui/Title';

interface PageHeaderProps {
  title: string;
  description?: string;
  tag: 'h1' | 'h2' | 'h3' | 'h4';
  children?: ReactNode;
}

const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  tag = 'h1',
  children,
}) => {

  return (
    <div className="w-full">
      <div className="flex items-center justify-between md:flex-row flex-col md:items-center items-start">
        <div
          className={clsx(children && 'max-w-full md:max-w-[60%] mb-4 md:mb-0')}
        >
          <Title Tag={tag}>{title}</Title>
          {description && <Text>{description}</Text>}
        </div>
        {children}
      </div>
      <span className="w-full h-px block my-4 mb-8 bg-border"></span>
    </div>
  );
};

export default PageHeader;
