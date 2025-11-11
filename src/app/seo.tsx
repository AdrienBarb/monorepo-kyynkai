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
  const absoluteUrl = url.startsWith('http')
    ? url
    : `${siteMetadata.siteUrl}${url}`;

  const imageUrl = image
    ? image
    : `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`;

  return {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
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
    ...rest,
  };
}
