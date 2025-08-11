import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.KYYNK_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.KYYNK_AWS_SECRET_ACCESS_KEY!,
  },
});
