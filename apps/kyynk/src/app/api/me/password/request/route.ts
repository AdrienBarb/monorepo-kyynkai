import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { resendClient } from '@/lib/resend/resendClient';
import { errorHandler } from '@/utils/errors/errorHandler';
import { randomBytes } from 'crypto';
import { NextResponse, NextRequest } from 'next/server';
import ResetPasswordEmail from '@kyynk/transactional/emails/ResetPasswordEmail';
import { CONTACT_EMAIL } from '@/constants/constants';

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { message: errorMessages.USER_NOT_FOUND },
        { status: 400 },
      );
    }

    let userToken = await prisma.userToken.findUnique({
      where: { userId: user.id },
    });

    if (!userToken) {
      userToken = await prisma.userToken.create({
        data: {
          userId: user.id,
          token: randomBytes(32).toString('hex'),
        },
      });
    }

    const link = `${process.env.CLIENT_URL}/login/password-reset/${user.id}/${userToken.token}`;

    const { data, error } = await resendClient.emails.send({
      from: CONTACT_EMAIL,
      to: user.email,
      subject: 'Password reset',
      react: ResetPasswordEmail({ link: link }),
    });

    if (error) {
      return NextResponse.json(
        { message: errorMessages.EMAIL_ERROR },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
