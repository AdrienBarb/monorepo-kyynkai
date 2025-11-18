import { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  url = './',
  ...rest
}: PageSEOProps): Metadata {
  const siteUrl = siteMetadata.siteUrl || 'https://kyynk.ai';

  const absoluteUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  const imageUrl = image ? image : `${siteUrl}${siteMetadata.socialBanner}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title || siteMetadata.title,
      template: `%s | ${siteMetadata.title}`,
    },
    description: description || siteMetadata.description,
    keywords: [
      'AI girlfriend',
      'virtual companion',
      'AI chat',
      'adult AI',
      'MILF AI',
      'AI companion',
      'chatbot',
      'virtual girlfriend',
      'AI conversation',
      'adult chatbot',
    ],
    authors: [{ name: siteMetadata.title }],
    creator: siteMetadata.title,
    publisher: siteMetadata.title,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: absoluteUrl,
      siteName: siteMetadata.title,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteMetadata.title}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      card: 'summary_large_image',
      images: [
        {
          url: imageUrl,
          alt: `${title} | ${siteMetadata.title}`,
        },
      ],
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
    alternates: {
      canonical: absoluteUrl,
    },
    ...rest,
  };
}
