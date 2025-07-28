import { NextRequest, NextResponse } from 'next/server';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { getMessageSelectFields } from '@/utils/messages/getMessageSelectFields';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';
import { NudeFromPrisma } from '@/types/nudes';

export const GET = strictlyAuth(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;
      const { id: messageId } = await params;

      if (!messageId) {
        return NextResponse.json(
          { error: errorMessages.MISSING_FIELDS },
          { status: 400 },
        );
      }

      const message = await prisma.message.findUnique({
        where: {
          id: messageId,
        },
        select: getMessageSelectFields(),
      });

      if (!message) {
        return NextResponse.json(
          { error: errorMessages.NOT_FOUND },
          { status: 404 },
        );
      }

      const messageWithPermissions = message.attachment?.nude
        ? {
            ...message,
            attachment: {
              ...message.attachment,
              nude: formatNudeWithPermissions(
                message.attachment.nude as NudeFromPrisma,
                userId,
              ),
            },
          }
        : message;

      return NextResponse.json(messageWithPermissions, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
