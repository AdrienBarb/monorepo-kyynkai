'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import logo from '../../public/images/logo.svg';
import { appRouter } from '@/constants/appRouter';

interface Props {}

const NavLogo: FC<Props> = ({}) => {
  return (
    <Link href={appRouter.home} passHref prefetch>
      <div className="cursor-pointer">
        <Image
          src={logo}
          alt="Logo KYYNK"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default NavLogo;
