'use client';

import React, { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import useApi from '@/hooks/requests/useApi';
import Avatar from './ui/Avatar';
import OnlineStatus from '@/components/profile/OnlineStatus';
import Title from '@/components/ui/Title';
import { useUser } from '@/hooks/users/useUser';
import { FetchedUserType } from '@/types/users';
import UserProfileMenu from './UserProfileMenu';
import imgixLoader from '@/lib/imgix/loader';
import Text from './ui/Text';
import ProfileImage from './ProfileImage';

interface Props {
  initialUserDatas: FetchedUserType;
}

const UserProfileHeader: FC<Props> = ({ initialUserDatas }) => {
  const { slug } = useParams<{ slug: string }>();
  const { user: loggedUser } = useUser();
  const { useGet } = useApi();

  const { data: user } = useGet(
    `/api/users/${slug}`,
    {},
    {
      initialData: initialUserDatas,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );

  const isLoggedUserProfile = loggedUser?.slug === slug;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center text-black gap-4">
        <ProfileImage
          profileImageId={user?.profileImageId}
          pseudo={user?.pseudo}
          size={320}
          className="w-40 h-40"
        />

        <div className="flex flex-col items-center">
          <Title Tag="h2" className="text-lg lg:text-xl" dataId="user-pseudo">
            {user?.pseudo}
          </Title>
          {!isLoggedUserProfile && <OnlineStatus currentUser={user} />}
        </div>
        <Text className="text-sm text-center max-w-lg whitespace-pre-wrap">
          {user?.description}
        </Text>
      </div>
    </div>
  );
};

export default UserProfileHeader;
