import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { parse } from 'cookie';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie');
  const cookies = cookieHeader ? parse(cookieHeader) : {};

  const locale = cookies['NEXT_LOCALE'] || 'en';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
