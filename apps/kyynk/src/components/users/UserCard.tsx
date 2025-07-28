import React from 'react';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';
import { User } from '@prisma/client';
import Link from 'next/link';

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const imageUrl = imgixLoader({
    src: user.profileImageId || '',
    width: 400,
    quality: 80,
  });

  return (
    <Link href={`/${user.slug}`} prefetch={true}>
      <div className="flex flex-col">
        <div className="relative aspect-square w-full  overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={user.pseudo}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <span className="text-base font-light font-karla">{user.pseudo}</span>
      </div>
    </Link>
  );
};

export default UserCard;
