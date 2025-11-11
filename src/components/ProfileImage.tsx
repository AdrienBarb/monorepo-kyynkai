'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';
import ProfilePlaceholder from './ProfilePlaceholder';

interface ProfileImageProps {
  profileImageId?: string | null;
  pseudo?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const ProfileImage: FC<ProfileImageProps> = ({
  profileImageId,
  pseudo,
  size = 160,
  className = '',
  onClick,
}) => {
  const hasProfileImage = profileImageId && profileImageId.trim() !== '';

  const imageUrl = hasProfileImage
    ? imgixLoader({
        src: profileImageId,
        width: size,
        quality: 80,
      })
    : '';

  const containerClasses = `relative aspect-square overflow-hidden rounded-md ${className}`;
  const containerStyle = { width: size, height: size };

  return (
    <div className={containerClasses} style={containerStyle} onClick={onClick}>
      {hasProfileImage ? (
        <Image
          src={imageUrl}
          alt={pseudo || ''}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <ProfilePlaceholder pseudo={pseudo} />
      )}
    </div>
  );
};

export default ProfileImage;
