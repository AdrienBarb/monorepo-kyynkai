'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/utils/tailwind/cn';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';

interface AvatarProps {
  pseudo?: string;
  imageId?: string | null;
  size?: number;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarProps
>(({ className, pseudo, imageId, size = 64, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex shrink-0 overflow-hidden rounded-full',
      className,
    )}
    style={{ width: size, height: size }}
    {...props}
  >
    {imageId ? (
      <AvatarImage alt={pseudo} imageId={imageId} size={size} />
    ) : (
      <AvatarFallback pseudo={pseudo} size={size} />
    )}
  </AvatarPrimitive.Root>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    imageId: string;
    alt?: string;
    size?: number;
  }
>(({ alt, imageId, size = 64 }, ref) => {
  const imageUrl = imgixLoader({
    src: imageId,
    width: size,
    quality: 80,
  });

  return (
    <Image
      ref={ref}
      src={imageUrl}
      alt={alt ?? 'Image'}
      width={size}
      height={size}
      quality={80}
      priority
      className="object-cover object-center"
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    pseudo?: string;
    size?: number;
  }
>(({ className, pseudo, size = 64, ...props }, ref) => {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex items-center justify-center rounded-full bg-primary text-white font-bold',
        className,
      )}
      style={{ width: size, height: size, fontSize: size / 2 }}
      {...props}
    >
      {pseudo?.charAt(0).toUpperCase() || '?'}
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export default Avatar;
