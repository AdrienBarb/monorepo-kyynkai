import { NextRequest, NextResponse } from 'next/server';
import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';

export const PUT = strictlyAuth(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;
      const { id: nudeId } = await params;

      const nude = await prisma.nude.findUnique({
        where: {
          id: nudeId,
        },
      });

      if (!nude || nude.userId !== userId) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 401 },
        );
      }

      const archivedNude = await prisma.nude.update({
        where: {
          id: nudeId,
        },
        data: {
          isArchived: true,
        },
      });

      return NextResponse.json(archivedNude, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
