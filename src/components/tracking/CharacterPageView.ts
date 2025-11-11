'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';

const CharacterPageView = () => {
  const { slug } = useParams();
  const { sendEventOnce } = useClientPostHogEvent();

  useEffect(() => {
    sendEventOnce({
      eventName: 'character_page_view',
      properties: { character_slug: slug },
    });
  }, [slug, sendEventOnce]);

  return null;
};

export default CharacterPageView;
