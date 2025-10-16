'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useClientPostHogEvent } from '@/utils/tracking/useClientPostHogEvent';

const FantasyPageView = () => {
  const { slug, fantasyId } = useParams();
  const { sendEventOnce } = useClientPostHogEvent();

  useEffect(() => {
    sendEventOnce({
      eventName: 'fantasy_page_view',
      properties: { character_slug: slug, fantasy_id: fantasyId },
    });
  }, [slug, fantasyId, sendEventOnce]);

  return null;
};

export default FantasyPageView;
