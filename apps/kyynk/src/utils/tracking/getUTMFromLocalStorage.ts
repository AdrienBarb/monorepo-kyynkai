export const KYYNK_UTM_KEY = 'kyynk_utm';

export const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'aclid',
] as const;

export type UTMParam = (typeof UTM_PARAMS)[number];
export type UTMValues = Partial<Record<UTMParam, string>>;

export const getUTMFromLocalStorage = (): UTMValues | null => {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(KYYNK_UTM_KEY);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || !parsed) return null;

    const utm: UTMValues = {};
    UTM_PARAMS.forEach((param) => {
      if (typeof parsed[param] === 'string') {
        utm[param] = parsed[param];
      }
    });
    return utm;
  } catch {
    return null;
  }
};
