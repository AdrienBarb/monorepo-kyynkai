'use client';

import React, { FC } from 'react';

interface ProfilePlaceholderProps {
  pseudo?: string;
}

const ProfilePlaceholder: FC<ProfilePlaceholderProps> = ({ pseudo }) => {
  return (
    <div className="w-full h-full bg-primary flex items-center justify-center text-white font-bold text-2xl">
      {pseudo?.charAt(0)?.toUpperCase() || 'U'}
    </div>
  );
};

export default ProfilePlaceholder;
