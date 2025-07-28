import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { getNudeSelectFields } from '@/utils/nudes/getNudeSelectFields';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';
import { NudeFromPrisma } from '@/types/nudes';

export const POST = strictlyAuth(
  async (req: NextRequest, { params }): Promise<NextResponse> => {
    const { auth } = req;
    const userId = auth?.user.id;
    const nudeId = params.id;

    try {
      const nude = await prisma.nude.findUnique({
        where: { id: nudeId },
        include: { user: true },
      });

      if (!nude || nude.userId === userId) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 400 },
        );
      }

      if (nude.buyers.includes(userId!)) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 400 },
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return NextResponse.json(
          { error: errorMessages.USER_NOT_FOUND },
          { status: 404 },
        );
      }

      if (user.creditsAmount < nude.creditPrice) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 400 },
        );
      }

      await prisma.$transaction([
        prisma.nude.update({
          where: { id: nudeId },
          data: { buyers: { push: userId } },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { creditsAmount: { decrement: nude.creditPrice } },
        }),
        prisma.sale.create({
          data: {
            creditAmount: nude.creditPrice,
            type: 'nude',
            seller: {
              connect: {
                id: nude.userId!,
              },
            },
            buyer: {
              connect: {
                id: userId!,
              },
            },
          },
        }),
      ]);

      const boughtNude = (await prisma.nude.findUnique({
        where: { id: nudeId },
        select: getNudeSelectFields(),
      })) as NudeFromPrisma;

      const formattedNude = formatNudeWithPermissions(
        boughtNude,
        auth?.user.id,
      );

      return NextResponse.json(formattedNude, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
