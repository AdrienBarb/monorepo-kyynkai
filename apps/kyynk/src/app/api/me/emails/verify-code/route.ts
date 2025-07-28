import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { NextResponse, NextRequest } from 'next/server';
import { createMarketingContact } from '@/utils/emailing/createMarketingContact';
import { CREATOR_AUDIENCE_ID } from '@/constants/resend/audiences';
import { sendPostHogEvent } from '@/utils/tracking/sendPostHogEvent';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { UTMValues } from '@/utils/tracking/getUTMFromLocalStorage';

export const POST = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;
      const { code } = await req.json();

      if (!code) {
        return NextResponse.json(
          { message: errorMessages.MISSING_FIELDS },
          { status: 400 },
        );
      }

      const user = await getCurrentUser({ userId: userId! });

      if (!user) {
        return NextResponse.json(
          { message: errorMessages.USER_NOT_FOUND },
          { status: 400 },
        );
      }

      const verificationCode = await prisma.verificationCode.findFirst({
        where: {
          userId: user.id,
          code: code,
        },
      });

      if (!verificationCode) {
        return NextResponse.json(
          { message: errorMessages.INVALID_CODE },
          { status: 400 },
        );
      }

      await prisma.$transaction(async (prisma) => {
        await prisma.user.update({
          where: { id: user.id },
          data: { isEmailVerified: true },
        });

        await prisma.verificationCode.delete({
          where: { id: verificationCode.id },
        });
      });

      // Send event to posthog when user verify his email
      const utmTracking = user.utmTracking as UTMValues | null;
      sendPostHogEvent({
        distinctId: user.id,
        event: 'creator_email_verified',
        properties: {
          ...(utmTracking && utmTracking),
          $process_person_profile: false,
        },
      });

      // Create marketing contact
      await createMarketingContact(user.email!, CREATOR_AUDIENCE_ID);

      return NextResponse.json({ emailVerified: true }, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
