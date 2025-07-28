'use client';

import imgixLoader from '@/lib/imgix/loader';
import { cn } from '@/utils/tailwind/cn';
import { User } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

const LastCreators = ({ lastCreators }: { lastCreators: User[] }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4">
      <div className="container mx-auto">
        <div className="flex gap-4 flex-col items-start">
          <div className="flex gap-2 flex-col w-full items-center">
            <h2 className="font-rubik font-bold text-center  text-4xl max-w-md">
              Join our last creators
            </h2>
          </div>
          <div
            className={cn(
              'grid gap-4 mx-auto mt-8 w-full',
              'grid-cols-2 lg:grid-cols-4 max-w-screen-lg',
            )}
          >
            {lastCreators.map((user: User) => {
              const imageUrl = imgixLoader({
                src: user.profileImageId || '',
                width: 400,
                quality: 80,
              });

              return (
                <Link key={user.id} href={`/${user.slug}`} prefetch={true}>
                  <div className="relative aspect-square w-full  overflow-hidden rounded-md">
                    <Image
                      src={imageUrl}
                      alt={user.pseudo}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastCreators;
