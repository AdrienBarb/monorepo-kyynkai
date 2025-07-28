import { NextRequest, NextResponse } from 'next/server';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { nudeSchema } from '@/schemas/nudeSchema';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { getNudeSelectFields } from '@/utils/nudes/getNudeSelectFields';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';
import { NudeFromPrisma } from '@/types/nudes';

export const PUT = strictlyAuth(async (req: NextRequest, { params }) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;
    const { id: nudeId } = params;

    const body = await req.json();
    const payload = nudeSchema.parse(body);

    const existingNude = await prisma.nude.findUnique({
      where: { id: nudeId },
    });

    if (!existingNude || existingNude.userId !== userId) {
      return NextResponse.json(
        { error: errorMessages.NOT_AUTHORIZED },
        { status: 401 },
      );
    }

    const updatedNude = (await prisma.nude.update({
      where: { id: nudeId },
      data: {
        description: payload.description,
        fiatPrice: payload.price,
        creditPrice: payload.price * 2,
        tags: payload.tags.map((tag) => tag.value) || [],
        currency: 'USD',
      },
      select: getNudeSelectFields(),
    })) as NudeFromPrisma;

    const formattedNude = formatNudeWithPermissions(updatedNude, userId);

    return NextResponse.json(formattedNude, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
