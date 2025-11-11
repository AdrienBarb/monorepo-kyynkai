import { cookies } from 'next/headers';
import { VISITOR_TRACKING } from '@/constants/visitorTracking';

export const getVisitorId = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(VISITOR_TRACKING.COOKIE_NAME)?.value || null;
  } catch (error) {
    console.warn('Could not read visitor ID cookie:', error);
    return null;
  }
};
