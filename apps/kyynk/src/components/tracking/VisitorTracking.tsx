'use client';

import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import generateVisitorId from '@/utils/users/generateVisitorId';
import { VISITOR_TRACKING } from '@/constants/visitorTracking';

const VisitorTracking: React.FC = () => {
  useEffect(() => {
    const existingVisitorId = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${VISITOR_TRACKING.COOKIE_NAME}=`))
      ?.split('=')[1];

    if (!existingVisitorId) {
      const newVisitorId = generateVisitorId();
      setCookie(VISITOR_TRACKING.COOKIE_NAME, newVisitorId, {
        maxAge: VISITOR_TRACKING.MAX_AGE,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }
  }, []);

  return null;
};

export default VisitorTracking;
