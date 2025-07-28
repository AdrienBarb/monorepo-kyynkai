import { resendClient } from '@/lib/resend/resendClient';
import { isProduction } from '@/utils/environments';

export const createMarketingContact = async (
  email: string,
  audienceId: string,
) => {
  if (!isProduction) {
    return;
  }

  try {
    await resendClient.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
  } catch (error) {
    console.error(error);
  }
};
