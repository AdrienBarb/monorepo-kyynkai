'use client';

import React, { FC, useEffect, useState } from 'react';
import useApi from '@/hooks/requests/useApi';
import { AIGirlfriend } from '@prisma/client';
import { cn } from '@/utils/tailwind/cn';
import AiGirlfriendCard from './ai-girlfriend/AiGirlfriendCard';
import { usePostHog } from 'posthog-js/react';

interface Props {
  initialAiGirlfriends: AIGirlfriend[];
}

const UsersList: FC<Props> = ({ initialAiGirlfriends }) => {
  const { useGet } = useApi();
  const posthog = usePostHog();
  const [featureFlag, setFeatureFlag] = useState<string | boolean | undefined>(
    undefined,
  );

  console.log('🚀 ~ UsersList ~ featureFlag:', featureFlag);

  const { data: users } = useGet(
    '/api/ai-girlfriends',
    {},
    {
      initialData: initialAiGirlfriends,
      refetchOnWindowFocus: true,
    },
  );

  useEffect(() => {
    console.log('🚀 ~ UsersList ~ posthog:', posthog);
    if (!posthog) return;

    const checkFeatureFlag = () => {
      const flagValue = posthog.getFeatureFlag('fantasyorchat');
      console.log('🚀 ~ checkFeatureFlag ~ flagValue:', flagValue);
      setFeatureFlag(flagValue);
    };

    checkFeatureFlag();

    posthog.onFeatureFlags(() => {
      checkFeatureFlag();
    });
  }, [posthog]);

  const filteredUsers =
    users?.filter((user: AIGirlfriend) => {
      if (featureFlag === undefined || featureFlag === false) {
        return true;
      }

      if (featureFlag === 'control') {
        return true;
      }

      if (featureFlag === 'Fantasy') {
        return user.version === 'v3';
      }

      if (featureFlag === 'Chat') {
        return user.version === 'v2';
      }

      return true;
    }) || [];

  return (
    <div
      className={cn('grid gap-4 mx-auto mt-8', 'grid-cols-2 md:grid-cols-3')}
    >
      {filteredUsers.map((user: AIGirlfriend) => (
        <AiGirlfriendCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
