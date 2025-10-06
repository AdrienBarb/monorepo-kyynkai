import { getCookie, deleteCookie } from 'cookies-next';

export const TRACKDESK_COOKIE_NAME = 'trakdesk_cid';

export interface TrackdeskCidValue {
  tenantId: string;
  cid: string;
}

export const getTrackdeskCidFromCookie = (): TrackdeskCidValue | null => {
  if (typeof window === 'undefined') return null;

  let cookieValue = getCookie(TRACKDESK_COOKIE_NAME) as string | undefined;

  if (!cookieValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(cookieValue);

    if (
      typeof parsed === 'object' &&
      parsed &&
      typeof parsed.tenantId === 'string' &&
      typeof parsed.cid === 'string'
    ) {
      return {
        tenantId: parsed.tenantId,
        cid: parsed.cid,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const cleanTrackdeskCidFromCookie = () => {
  if (typeof window === 'undefined') return;

  deleteCookie(TRACKDESK_COOKIE_NAME);
};
