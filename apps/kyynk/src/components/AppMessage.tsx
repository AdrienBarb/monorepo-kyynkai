import React, { FC, ReactNode } from 'react';
import Text from '@/components/ui/Text';
import Title from '@/components/ui/Title';

interface AppMessageProps {
  title: string;
  text: string;
  children?: ReactNode;
  emoji?: string;
}

const AppMessage: FC<AppMessageProps> = ({ title, text, children, emoji }) => {
  return (
    <div className="flex flex-col items-center px-4 py-20 rounded-lg w-full mx-auto">
      <div className="flex flex-col items-center">
        <div className="font-bold text-7xl mb-4">{emoji}</div>
        <Title Tag="h3" className="text-custom-black text-center">
          {title}
        </Title>
        <Text className="text-custom-black text-center">{text}</Text>
        {children && (
          <div className="mt-4 w-full flex flex-col gap-2">{children}</div>
        )}
      </div>
    </div>
  );
};

export default AppMessage;
