import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';
import { AIGirlfriend } from '@prisma/client';
import Link from 'next/link';

interface Props {
  user: AIGirlfriend;
}

const AiGirlfriendCard = ({ user }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const allImages = [user.profileImageId, ...(user.secondaryImageIds || [])];

  const currentImageUrl = imgixLoader({
    src: allImages[currentImageIndex] || '',
    width: 400 * 2,
    quality: 90,
  });

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (allImages.length > 1) {
      setIsHovering(true);
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <Link href={`/${user.slug}`} prefetch={true}>
      <div
        className="flex flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-primary/20">
          <Image
            src={currentImageUrl}
            alt={user.pseudo}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-500 ease-in-out"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <div className="text-xl font-bold font-karla text-white leading-tight">
              {`${user.pseudo} ${user.age}`}
            </div>
            <div className="text-sm font-semibold font-karla text-white leading-tight">
              {user.archetype}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AiGirlfriendCard;
