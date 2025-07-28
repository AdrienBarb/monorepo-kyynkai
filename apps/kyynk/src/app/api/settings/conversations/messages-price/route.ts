import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { prisma } from '@/lib/db/client';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { getCreditsWithFiat } from '@/utils/prices/getMediaPrice';

const updatePriceSchema = z.object({
  fiatMessage: z.string().transform((val) => parseFloat(val)),
});

export const PUT = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;

      const currentUser = await getCurrentUser({ userId: userId! });

      if (!currentUser || !currentUser.settings) {
        return NextResponse.json(
          { error: errorMessages.USER_NOT_FOUND },
          { status: 400 },
        );
      }

      const body = await req.json();
      const { fiatMessage } = updatePriceSchema.parse(body);

      const { creditPrice, fiatPrice } = getCreditsWithFiat(fiatMessage);

      const updatedSettings = await prisma.userSettings.update({
        where: { userId },
        data: {
          fiatMessage: fiatPrice,
          creditMessage: creditPrice,
        },
      });

      return NextResponse.json(updatedSettings, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
