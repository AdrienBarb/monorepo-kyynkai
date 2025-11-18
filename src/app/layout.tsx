import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
import siteMetadata from '@/data/siteMetadata';
import { genPageMetadata } from '@/app/seo';
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
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { PostHogProvider } from '@/components/provider/PostHogProvider';
import { AxiomWebVitals } from 'next-axiom';
import UTMTracking from '@/components/tracking/UTMTracking';
import PostHogIdentify from '@/components/tracking/PostHogIdentify';
import { GoogleTagManager } from '@next/third-parties/google';
import ModalWrapper from '@/components/layout/ModalWrapper';
import AutoMergeWrapper from '@/components/auth/AutoMergeWrapper';
import Script from 'next/script';
import GlobalTracking from '@/components/GlobalTracking';

config.autoAddCss = false;

export const metadata: Metadata = genPageMetadata({
  title: siteMetadata.title,
  description: siteMetadata.description,
  url: './',
});

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
      <NextIntlClientProvider messages={messages}>
        <html
          lang={locale}
          className={clsx(karlaFont.variable, rubikFont.variable)}
        >
          <GoogleTagManager gtmId="GTM-KHBKVG2G" />
          <body>
            <Script
              id="tolt-script"
              src="https://cdn.tolt.io/tolt.js"
              strategy="afterInteractive"
              data-tolt="pk_TvByUWFwkBvHWJ92kgcAvf6e"
            />
            <NuqsAdapter>
              <Toaster position="bottom-center" />

              <PostHogProvider>
                <PostHogIdentify />
                {children}
              </PostHogProvider>
              <GlobalConfig />
              <GlobalTracking />
              <UTMTracking />
              <GlobalErrorProvider />
              <AutoMergeWrapper />

              <ModalWrapper />
              <AxiomWebVitals />
            </NuqsAdapter>
          </body>
        </html>
      </NextIntlClientProvider>
    </CustomQueryClientProvider>
  );
};

export default RootLayout;
