import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { nudeSchema } from '@/schemas/nudeSchema';
import { errorHandler } from '@/utils/errors/errorHandler';
import { getCreditsWithFiat } from '@/utils/prices/getMediaPrice';
import { getNudeSelectFields } from '@/utils/nudes/getNudeSelectFields';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';

const formSchema = nudeSchema.extend({
  mediaId: z.string(),
});

export const POST = strictlyAuth(async (req: NextRequest): Promise<any> => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const body = await req.json();
    const payload = formSchema.parse(body);

    const { creditPrice, fiatPrice } = getCreditsWithFiat(payload.price);

    const newNude = await prisma.nude.create({
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
        tags: payload.tags?.map((tag) => tag.value) || [],
        currency: 'EUR',
      },
      select: getNudeSelectFields(),
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { tags: true },
    });

    const updatedTags = Array.from(
      new Set([
        ...(user?.tags || []),
        ...(payload.tags?.map((tag) => tag.value) || []),
      ]),
    );

    await prisma.user.update({
      where: { id: userId },
      data: {
        nudesCount: { increment: 1 },
        tags: updatedTags,
      },
    });

    const formattedNude = formatNudeWithPermissions(newNude, userId);

    return NextResponse.json(formattedNude, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});
