import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import apiVideoClient from '@/lib/api-video/client';
import { uploadToS3 } from '@/utils/s3Uploader';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { videoId, type, encoding, quality } = body;

    if (!videoId || !type || !encoding || !quality) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (
      type === 'video.encoding.quality.completed' &&
      encoding === 'hls' &&
      quality === '240p'
    ) {
      const video = await apiVideoClient.videos.get(videoId);

      if (!video) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
      }

      const thumbnailUrl = video.assets?.thumbnail;

      if (thumbnailUrl) {
        try {
          const response = await fetch(thumbnailUrl);

          if (!response.ok) {
            throw new Error('Failed to fetch thumbnail');
          }

          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const fileKey = await uploadToS3({
            file: buffer,
            folder: 'thumbnails',
            fileType: 'image/jpeg',
          });

          await prisma.media.update({
            where: { videoId },
            data: {
              thumbnailId: fileKey,
              isReady: true,
            },
          });

          return NextResponse.json({ message: 'OK', fileKey }, { status: 200 });
        } catch (uploadError) {
          return errorHandler(uploadError);
        }
      }
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
