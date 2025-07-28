import { sendGTMEvent } from '@next/third-parties/google';
import { isProduction } from '../environments';

interface SendGTMEventParams {
  event: string;
  [key: string]: any;
}

export const sendGTMEventToGTM = (params: SendGTMEventParams) => {
  try {
    if (isProduction) {
      sendGTMEvent(params);
    } else {
      console.log('GTM event:', params);
    }
  } catch (error) {
    console.error('Error sending GTM event:', error);
  }
};
