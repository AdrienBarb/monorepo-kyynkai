import React, { FC } from 'react';

interface Props {
  text: string;
}

const NoResults: FC<Props> = ({ text }) => {
  return (
    <div className="text-center p-12 font-light font-karla text-base text-background">
      {text}
    </div>
  );
};

export default NoResults;
