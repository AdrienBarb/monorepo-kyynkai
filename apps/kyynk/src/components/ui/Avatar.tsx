'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/utils/tailwind/cn';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';
import { User, UserRound } from 'lucide-react';

interface AvatarProps {
  imageId?: string | null;
  size?: number;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarProps
>(({ className, imageId, size = 64, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex shrink-0 overflow-hidden rounded-full border border-background',
      className,
    )}
    style={{ width: size, height: size }}
    {...props}
  >
    {imageId ? (
      <AvatarImage alt={imageId} imageId={imageId} size={size} />
    ) : (
      <AvatarFallback size={size} />
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
    width: size * 2,
    quality: 100,
  });

  return (
    <Image
      ref={ref}
      src={imageUrl}
      alt={alt ?? 'Image'}
      width={size}
      height={size}
      quality={100}
      priority
      className="object-cover object-center"
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    size?: number;
  }
>(({ className, size = 64, ...props }, ref) => {
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
      <UserRound strokeWidth={1} color="#1c131e" />
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export default Avatar;
