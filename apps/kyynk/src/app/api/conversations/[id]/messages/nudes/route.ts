import { NextRequest, NextResponse } from 'next/server';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { z } from 'zod';
import { getCreditsWithFiat } from '@/utils/prices/getMediaPrice';
import { privateNudeSchema } from '@/schemas/nudeSchema';
import { MessageAttachmentType } from '@prisma/client';
import { getMessageSelectFields } from '@/utils/messages/getMessageSelectFields';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';
import { NudeFromPrisma } from '@/types/nudes';

const formSchema = privateNudeSchema.extend({
  mediaId: z.string(),
});

export const POST = strictlyAuth(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;
      const { id: conversationId } = await params;
      const requestBody = await req.json();

      if (!conversationId) {
        return NextResponse.json(
          { error: errorMessages.MISSING_FIELDS },
          { status: 400 },
        );
      }

      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          participants: { some: { id: userId } },
        },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 400 },
        );
      }

      const payload = formSchema.parse(requestBody);
      const { creditPrice, fiatPrice } = getCreditsWithFiat(payload.price);

      const result = await prisma.$transaction(async (tx) => {
        const newNude = await tx.nude.create({
          data: {
            media: {
              connect: {
                id: payload.mediaId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
            description: payload.description,
            fiatPrice: fiatPrice,
            creditPrice: creditPrice,
            currency: 'EUR',
            isPrivate: true,
          },
        });

        const message = await tx.message.create({
          data: {
            content: payload.description,
            conversationId,
            senderId: userId!,
            attachment: {
              create: {
                type: MessageAttachmentType.nude,
                nudeId: newNude.id,
              },
            },
          },
          select: getMessageSelectFields(),
        });

        await tx.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        });

        return message;
      });

      const messageWithPermissions = {
        ...result,
        attachment: {
          ...result.attachment!,
          nude: formatNudeWithPermissions(
            result.attachment!.nude as NudeFromPrisma,
            userId,
          ),
        },
      };

      return NextResponse.json(messageWithPermissions, { status: 201 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
