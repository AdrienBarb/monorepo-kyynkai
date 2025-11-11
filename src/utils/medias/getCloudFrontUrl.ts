export const getCloudFrontUrl = (videoKey: string): string => {
  const cloudFrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

  if (!cloudFrontUrl) {
    throw new Error('NEXT_PUBLIC_CLOUDFRONT_URL is not configured');
  }

  return `${cloudFrontUrl}/${videoKey}`;
};
