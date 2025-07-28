import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { prisma } from '@/lib/db/client';
import { NextResponse, NextRequest } from 'next/server';
import { bankDetailsSchema } from '@/schemas/settings/payment/bankDetails';

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
      const { bankAccountName, iban } = bankDetailsSchema.parse(body);

      const updatedSettings = await prisma.userSettings.update({
        where: { userId },
        data: {
          bankAccountName,
          iban,
        },
      });

      return NextResponse.json(updatedSettings, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
