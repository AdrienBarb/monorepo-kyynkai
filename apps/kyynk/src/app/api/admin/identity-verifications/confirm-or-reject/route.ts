import { prisma } from '@/lib/db/client';
import { NextResponse } from 'next/server';
import { withAdminSecret } from '@/hoc/api/withAdminSecret';
import { errorHandler } from '@/utils/errors/errorHandler';
import { z } from 'zod';
import { resendClient } from '@/lib/resend/resendClient';
import IdentityVerifiedEmail from '@kyynk/transactional/emails/IdentityVerifiedEmail';
import IdentityRejectedEmail from '@kyynk/transactional/emails/IdentityRejectedEmail';
import { errorMessages } from '@/lib/constants/errorMessage';
import { CONTACT_EMAIL } from '@/constants/constants';
import { sendPostHogEvent } from '@/utils/tracking/sendPostHogEvent';
import { VerificationStatus } from '@prisma/client';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { UTMValues } from '@/utils/tracking/getUTMFromLocalStorage';

const confirmOrReject = z.object({
  userId: z.string(),
  status: z.enum([VerificationStatus.verified, VerificationStatus.rejected]),
});

export const PUT = withAdminSecret(async (req: Request) => {
  try {
    const body = await req.json();
    const validatedBody = confirmOrReject.parse(body);

    const currentUser = await getCurrentUser({ userId: validatedBody.userId });

    if (!currentUser) {
      return NextResponse.json(
        { message: errorMessages.USER_NOT_FOUND },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: { id: currentUser?.id },
      data: { identityVerificationStatus: validatedBody.status },
    });

    if (validatedBody.status === VerificationStatus.verified) {
      const utmTracking = currentUser.utmTracking as UTMValues | null;

      // Send POSTHOG event
      sendPostHogEvent({
        distinctId: currentUser?.id!,
        event: 'creator_identity_verified',
        properties: {
          ...(utmTracking && utmTracking),
          $process_person_profile: false,
        },
      });
    }

    const emailTemplate =
      validatedBody.status === VerificationStatus.verified
        ? IdentityVerifiedEmail
        : IdentityRejectedEmail;
    const subject =
      validatedBody.status === VerificationStatus.verified
        ? 'Your account has been verified'
        : 'Your account verification was rejected';

    const { data, error } = await resendClient.emails.send({
      from: CONTACT_EMAIL,
      to: user.email,
      subject: subject,
      react: emailTemplate({ link: process.env.CLIENT_URL! }),
    });

    if (error) {
      return NextResponse.json(
        { message: errorMessages.EMAIL_ERROR },
        { status: 400 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
