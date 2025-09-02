'use client';

import { isProduction } from '../environments';
import { usePostHog } from 'posthog-js/react';

interface SendPostHogEventParams {
  eventName: string;
  properties?: Record<string, any>;
}

export const useClientPostHogEvent = () => {
  const posthog = usePostHog();

  const sendEvent = ({ eventName, properties }: SendPostHogEventParams) => {
    if (isProduction) {
      posthog.capture(eventName, properties);
    } else {
      console.log('Client PostHog event:', eventName, properties);
    }
  };

  const identify = (distinctId: string) => {
    if (isProduction) {
      posthog.identify(distinctId);
    } else {
      console.log('Client PostHog identify:', distinctId);
    }
  };

  return { sendEvent, identify };
};
