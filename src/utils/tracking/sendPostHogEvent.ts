import { postHogClient } from '@/lib/post-hog/postHogClient';
import { isProduction } from '../environments';

interface SendPostHogEventParams {
  distinctId: string;
  event: string;
  properties?: Record<string, any>;
}

export const sendPostHogEvent = ({
  distinctId,
  event,
  properties,
}: SendPostHogEventParams) => {
  try {
    if (isProduction) {
      postHogClient.capture({
        distinctId,
        event,
        properties,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
