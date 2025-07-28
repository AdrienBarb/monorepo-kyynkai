import React from 'react';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import imgixLoader from '@/lib/imgix/loader';
import { NudeWithPermissions } from '@/types/nudes';

interface Props {
  nude: NudeWithPermissions;
  onClick?: () => void;
}

const NudeCard = ({ nude, onClick }: Props) => {
  const imageUrl = imgixLoader({
    src: nude.media?.thumbnailId || '',
    width: 400,
    quality: 80,
    transformations: nude.permissions.canView ? {} : { blur: 500 },
  });

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-md cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt="nude"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full"
      />
      {!nude.permissions.canView && (
        <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl" />
      )}
    </div>
  );
};

export default NudeCard;
