import React, { FC, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/tailwind/cn';

interface Props extends VariantProps<typeof titleStyles> {
  Tag: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
  dataId?: string;
  className?: string;
}

const titleStyles = cva('font-rubik font-bold text-black block m-0', {
  variants: {
    level: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      h4: 'text-xl',
    },
  },
  defaultVariants: {
    level: 'h1',
  },
});

const Title: FC<Props> = ({ Tag, children, dataId, className }) => {
  return (
    <Tag
      data-id={dataId}
      className={cn(titleStyles({ level: Tag }), className)}
    >
      {children}
    </Tag>
  );
};

export default Title;
