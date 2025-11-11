import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { auth } from '@/lib/better-auth/auth';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: errorMessages.AUTH_REQUIRED },
        { status: 401 },
      );
    }

    const generatedMedia = await prisma.generatedMedia.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      select: {
        id: true,
        status: true,
        mediaKey: true,
        type: true,
      },
    });

    if (!generatedMedia) {
      return NextResponse.json(
        { error: errorMessages.NOT_FOUND },
        { status: 404 },
      );
    }

    return NextResponse.json(generatedMedia, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
