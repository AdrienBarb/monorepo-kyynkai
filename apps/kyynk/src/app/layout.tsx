import type { Metadata } from 'next';
import '@/styles/globals.scss';
import '@/styles/tailwind.css';
import siteMetadata from '@/data/siteMetadata';
import { NextIntlClientProvider } from 'next-intl';
import GlobalErrorProvider from '@/components/provider/GlobalErrorProvider';
import { Toaster } from 'react-hot-toast';
import { FC, ReactNode } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Karla, Rubik } from 'next/font/google';
import clsx from 'clsx';
import GlobalConfig from '@/components/GlobalConfig';
import { getLocale, getMessages } from 'next-intl/server';
import CustomQueryClientProvider from '@/components/provider/CustomQueryClientProvider';
import CustomSessionProvider from '@/components/provider/CustomSessionProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { PostHogProvider } from '@/components/provider/PostHogProvider';
import { AxiomWebVitals } from 'next-axiom';
import LoggedUserProvider from '@/components/provider/LoggedUserProvider';
import UTMTracking from '@/components/tracking/UTMTracking';
import ModalWrapper from '@/components/layout/ModalWrapper';
import { GoogleTagManager } from '@next/third-parties/google';

config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl!),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

const karlaFont = Karla({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-karla',
});

const rubikFont = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik',
});

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = async ({ children }) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <CustomQueryClientProvider>
      <CustomSessionProvider>
        <NextIntlClientProvider messages={messages}>
          <html
            lang={locale}
            className={clsx(karlaFont.variable, rubikFont.variable)}
          >
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/images/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/images/favicon-16x16.png"
            />
            <GoogleTagManager gtmId="GTM-KHBKVG2G" />
            <body>
              <NuqsAdapter>
                <Toaster position="bottom-center" />
                <GlobalConfig>
                  <LoggedUserProvider>
                    <PostHogProvider>{children}</PostHogProvider>
                  </LoggedUserProvider>
                </GlobalConfig>
                <UTMTracking />
                <GlobalErrorProvider />

                {/* Modals */}
                <ModalWrapper />
                <AxiomWebVitals />
              </NuqsAdapter>
            </body>
          </html>
        </NextIntlClientProvider>
      </CustomSessionProvider>
    </CustomQueryClientProvider>
  );
};

export default RootLayout;
