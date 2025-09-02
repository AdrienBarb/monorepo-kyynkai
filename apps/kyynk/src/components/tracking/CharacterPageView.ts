'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';

const CharacterPageView = () => {
  const { slug } = useParams();
  const eventSent = useRef(false);

  const { sendEvent } = useClientPostHogEvent();

  useEffect(() => {
    if (eventSent.current) return;
    sendEvent({
      eventName: 'character_page_view',
      properties: { character_slug: slug },
    });
    eventSent.current = true;
  }, [slug, sendEvent]);

  return null;
};

export default CharacterPageView;
