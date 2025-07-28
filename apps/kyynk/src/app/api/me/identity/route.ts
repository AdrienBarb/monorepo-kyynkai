import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { NextResponse, NextRequest } from 'next/server';

export const POST = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;

      const body = await req.json();
      const { frontIdentity, backIdentity, frontAndFaceIdentity } = body;

      if (!frontIdentity || !backIdentity || !frontAndFaceIdentity) {
        return NextResponse.json(
          { error: errorMessages.MISSING_FIELDS },
          { status: 400 },
        );
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          identityVerificationStatus: 'pending',
          frontIdentity,
          backIdentity,
          frontAndFaceIdentity,
        },
      });

      return NextResponse.json({ message: 'OK' }, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
