'use client';

import React from 'react';
import { Fantasy } from '@/types/fantasies';
import FantasyCard from './FantasyCard';

interface Props {
  initialFantasies: Fantasy[];
}

const FantasiesList: React.FC<Props> = ({ initialFantasies }) => {
  console.log('🚀 ~ FantasiesList ~ initialFantasies:', initialFantasies);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {initialFantasies.map((fantasy) => (
        <FantasyCard key={fantasy.id} fantasy={fantasy} />
      ))}
    </div>
  );
};

export default FantasiesList;
