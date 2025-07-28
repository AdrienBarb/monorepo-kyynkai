import { auth } from '@/lib/better-auth/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { UTMValues } from '@/utils/tracking/getUTMFromLocalStorage';
import { sendPostHogEvent } from '@/utils/tracking/sendPostHogEvent';
import { sendTrafficJunkyCreatorConversion } from '@/utils/tracking/traffic-junky/sendTrafficJunkyCreatorConversion';
import { checkOrCreateSlug } from '@/utils/users/checkOrCreateSlug';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { pseudo, email, password, utmTracking } = await request.json();

    if (!pseudo || !email || !password) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const lowerCaseEmail = email.toLowerCase();
    const lowerCasePseudo = pseudo.toLowerCase();

    const userExists = await prisma.user.findUnique({
      where: { email: lowerCaseEmail },
    });

    if (userExists) {
      return NextResponse.json(
        { error: errorMessages.USER_ALREADY_EXIST },
        { status: 400 },
      );
    }

    const pseudoExist = await prisma.user.findFirst({
      where: { pseudo: lowerCasePseudo },
    });

    if (pseudoExist) {
      return NextResponse.json(
        { error: errorMessages.PSEUDO_ALREADY_EXIST },
        { status: 400 },
      );
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

    // Create session using better-auth
    const session = await auth.api.createSession({
      userId: createdUser.id,
      expiresIn: 60 * 60 * 24 * 7, // 7 days
    });

    // Set the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth-session', session.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: errorMessages.FAILED_TO_AUTHENTICATE },
      { status: 500 },
    );
  }
}
