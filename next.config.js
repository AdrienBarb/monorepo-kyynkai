import createNextIntlPlugin from 'next-intl/plugin';
import { withAxiom } from 'next-axiom';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  crossOrigin: 'anonymous',
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.devtool = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kyynk-296765883.imgix.net',
      },
    ],
  },
};

export default withAxiom(withNextIntl(nextConfig));
