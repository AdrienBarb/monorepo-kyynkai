'use client';

import { useEffect, useRef } from 'react';
import { useSession } from '@/lib/better-auth/auth-client';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';

const PostHogIdentify = () => {
  const { data: session } = useSession();
  const { identify } = useClientPostHogEvent();
  const isIdentified = useRef(false);

  useEffect(() => {
    if (session?.user?.id) {
      if (!isIdentified.current) {
        identify(session.user.id);
        isIdentified.current = true;
      }
    }
  }, [session?.user?.id, identify]);

  return null;
};

export default PostHogIdentify;
