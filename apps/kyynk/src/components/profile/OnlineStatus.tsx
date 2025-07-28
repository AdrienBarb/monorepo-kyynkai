'use client';

import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { User } from '@prisma/client';
import Text from '@/components/ui/Text';
import { isUserOnline } from '@/utils/users/isUserOnline';

interface Props {
  currentUser: User;
}

const OnlineStatus: FC<Props> = ({ currentUser }) => {
  const t = useTranslations();

  const isOnline = isUserOnline(currentUser);

  const lastSeen = currentUser?.lastSeenAt
    ? new Date(currentUser.lastSeenAt)
    : null;

  if (!lastSeen) return null;

  const timeAgoValue = lastSeen
    ? formatDistanceToNow(lastSeen, { addSuffix: true, locale: enUS })
    : '';

  return (
    <div className="font-karla w-full">
      {isOnline ? (
        <div className="flex items-center justify-center gap-1">
          <div className="w-3 flex justify-center items-center">
            <FontAwesomeIcon icon={faCircle} color="#57cc99" size="xs" />
          </div>
          <Text className="text-sm font-extralight">{t('online')}</Text>
        </div>
      ) : (
        <Text className="text-sm font-extralight">
          {`${t('online')} : ${timeAgoValue}`}
        </Text>
      )}
    </div>
  );
};

export default OnlineStatus;
