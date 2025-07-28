export const getEncodedFullUrl = (): string => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    const fullUrl = url.pathname + url.search;
    return encodeURIComponent(fullUrl);
  }

  return '';
};
