import React from 'react';
import { Fantasy } from '@/types/fantasies';
import FantasyCard from './FantasyCard';
import Title from '@/components/ui/Title';

interface Props {
  fantasies: Fantasy[];
}

const FantasyRecommendations: React.FC<Props> = ({ fantasies }) => {
  if (fantasies.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col border border-primary/20 rounded-lg p-4 w-full">
      <Title Tag="h2" className="mb-4 text-primary text-lg">
        You will also like
      </Title>
      <div className="grid grid-cols-2 gap-4">
        {fantasies.map((fantasy) => (
          <FantasyCard key={fantasy.id} fantasy={fantasy} />
        ))}
      </div>
    </div>
  );
};

export default FantasyRecommendations;
