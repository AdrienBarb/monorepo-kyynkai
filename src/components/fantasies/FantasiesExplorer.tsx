'use client';

import React from 'react';
import { useQueryState } from 'nuqs';
import { Fantasy } from '@/types/fantasies';
import useApi from '@/hooks/requests/useApi';
import FantasyTags from './FantasyTags';
import FantasiesList from './FantasiesList';

interface Props {
  initialFantasies: Fantasy[];
  tags: string[];
}

const FantasiesExplorer: React.FC<Props> = ({ initialFantasies, tags }) => {
  const [selectedTag, setSelectedTag] = useQueryState('tag');
  const { useGet } = useApi();

  const { data: fantasies, isLoading } = useGet(
    '/api/fantasies',
    { tag: selectedTag || undefined },
    {
      enabled: true,
      initialData: initialFantasies,
    },
  );

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <>
      <FantasyTags
        tags={tags}
        selectedTag={selectedTag}
        onSelectTag={handleTagSelect}
      />

      <FantasiesList initialFantasies={fantasies as Fantasy[]} />
    </>
  );
};

export default FantasiesExplorer;
