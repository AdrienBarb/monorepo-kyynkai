import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '@/lib/s3/client';
import { generateFileKey } from '@/utils/medias/generateFileKey';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { fileType, folder } = body;

    if (!fileType || !folder) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const bucketName = process.env.S3_BUCKET;
    if (!bucketName) throw new Error('S3 Bucket name is missing');

    const fileKey = generateFileKey(fileType, folder);

    const params = {
      Bucket: bucketName,
      Key: fileKey,
      ContentType: fileType,
    };

    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return NextResponse.json({ signedUrl, fileKey }, { status: 200 });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json(
      { error: 'Error generating signed URL' },
      { status: 500 },
    );
  }
};
