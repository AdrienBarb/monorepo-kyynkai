import { s3Client } from '@/lib/s3/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { generateFileKey } from './medias/generateFileKey';

export const uploadToS3 = async ({
  file,
  folder,
  fileType,
}: {
  file: Buffer;
  folder: 'medias' | 'thumbnails' | 'identity' | 'generated_medias';
  fileType: string;
}) => {
  const bucketName = process.env.S3_BUCKET;
  if (!bucketName) throw new Error('S3 Bucket name is missing');

  const fileKey = generateFileKey(fileType, folder);

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file,
    ContentType: fileType,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return fileKey;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
