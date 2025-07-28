'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';
import imgixLoader from '@/lib/imgix/loader';
import Image from 'next/image';
import { User } from '@prisma/client';

export const IdentityCarousel = ({ user }: { user: User }) => {
  const imageUrl = imgixLoader({
    src: user.frontIdentity || '',
    width: 400,
    quality: 80,
  });
  const imageUrl2 = imgixLoader({
    src: user.backIdentity || '',
    width: 400,
    quality: 80,
  });
  const imageUrl3 = imgixLoader({
    src: user.frontAndFaceIdentity || '',
    width: 400,
    quality: 80,
  });

  return (
    <div className="mx-auto max-w-xs">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          <CarouselItem key={0}>
            <Card>
              <CardContent>
                <Image
                  src={imageUrl}
                  alt="Identity Image"
                  width={400}
                  height={400}
                  layout="responsive"
                />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem key={1}>
            <Card>
              <CardContent>
                <Image
                  src={imageUrl2}
                  alt="Identity Image"
                  width={400}
                  height={400}
                  layout="responsive"
                />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem key={2}>
            <Card>
              <CardContent>
                <Image
                  src={imageUrl3}
                  alt="Identity Image"
                  width={400}
                  height={400}
                  layout="responsive"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
