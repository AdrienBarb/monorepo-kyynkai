'use server';

import { signIn } from '@/auth';
import { appRouter } from '@/constants/appRouter';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { UTMValues } from '@/utils/tracking/getUTMFromLocalStorage';
import { sendPostHogEvent } from '@/utils/tracking/sendPostHogEvent';
import { sendTrafficJunkyCreatorConversion } from '@/utils/tracking/traffic-junky/sendTrafficJunkyCreatorConversion';
import { checkOrCreateSlug } from '@/utils/users/checkOrCreateSlug';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function register({
  pseudo,
  email,
  password,
  utmTracking,
}: {
  pseudo: string;
  email: string;
  password: string;
  utmTracking: UTMValues | null;
}) {
  try {
    if (!pseudo || !email || !password) {
      return { success: false, error: errorMessages.MISSING_FIELDS };
    }

    const lowerCaseEmail = email.toLowerCase();
    const lowerCasePseudo = pseudo.toLowerCase();

    const userExists = await prisma.user.findUnique({
      where: { email: lowerCaseEmail },
    });

    if (userExists) {
      return { success: false, error: errorMessages.USER_ALREADY_EXIST };
    }

    const pseudoExist = await prisma.user.findFirst({
      where: { pseudo: lowerCasePseudo },
    });

    if (pseudoExist) {
      return { success: false, error: errorMessages.PSEUDO_ALREADY_EXIST };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await prisma.user.create({
      data: {
        pseudo: lowerCasePseudo,
        email: lowerCaseEmail,
        password: hashedPassword,
        slug: await checkOrCreateSlug(lowerCasePseudo),
        ...(utmTracking && { utmTracking }),
        settings: {
          create: {},
        },
      },
      select: {
        id: true,
        pseudo: true,
        email: true,
        slug: true,
      },
    });

    // Send event to posthog when user sign up
    sendPostHogEvent({
      distinctId: createdUser.id,
      event: 'user_signed_up',
      properties: {
        email: lowerCaseEmail,
        pseudo: lowerCasePseudo,
        ...(utmTracking && { ...utmTracking }),
        $process_person_profile: false,
      },
    });

    // Send event to traffic junky when user sign up
    if (
      utmTracking?.aclid &&
      utmTracking?.utm_source === 'trafficjunky' &&
      utmTracking?.utm_campaign?.includes('CREATOR')
    ) {
      sendTrafficJunkyCreatorConversion({
        userId: createdUser.id,
        aclid: utmTracking?.aclid,
      });
    }

    await signIn('credentials', {
      email: lowerCaseEmail,
      password: password,
      redirect: true,
      redirectTo: `${appRouter.onboarding}?step=user-type`,
    });

    return { success: true };
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return { success: false, error: error?.cause?.err?.message };
    }

    return { success: false, error: errorMessages.FAILED_TO_AUTHENTICATE };
  }
}
