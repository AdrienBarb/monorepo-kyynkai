import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { GenerationStatus } from '@prisma/client';
import { downloadAndUploadToS3 } from '@/utils/medias/downloadAndUploadToS3';

export const POST = async (req: NextRequest) => {
  try {
    const { request_id, status, payload } = await req.json();

    const generatedMedia = await prisma.generatedMedia.findFirst({
      where: {
        externalId: request_id,
        status: GenerationStatus.PROCESSING,
      },
    });

    if (!generatedMedia) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    if (
      status === 'OK' &&
      payload &&
      'images' in payload &&
      payload.images?.[0]
    ) {
      const falImageUrl = payload.images[0].url;

      let s3Key: string;
      try {
        s3Key = await downloadAndUploadToS3(falImageUrl);
      } catch (uploadError) {
        await prisma.generatedMedia.update({
          where: { id: generatedMedia.id },
          data: {
            status: GenerationStatus.FAILED,
          },
        });
        throw uploadError;
      }

      const result = await prisma.$transaction(async (tx) => {
        const updatedGeneratedMedia = await tx.generatedMedia.update({
          where: { id: generatedMedia.id },
          data: {
            status: GenerationStatus.COMPLETED,
            mediaKey: s3Key,
          },
        });

        return { generatedMedia: updatedGeneratedMedia };
      });

      return NextResponse.json(result, { status: 200 });
    }

    if (status === 'ERROR') {
      await prisma.generatedMedia.update({
        where: { id: generatedMedia.id },
        data: {
          status: GenerationStatus.FAILED,
        },
      });

      return NextResponse.json(
        { message: 'Generation failed, user notified' },
        { status: 200 },
      );
    }

    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
