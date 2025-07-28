import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { resendClient } from '@/lib/resend/resendClient';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { NextResponse, NextRequest } from 'next/server';
import { generateRandomCode } from '@/utils/numbers/generateRandomCode';
import VerificationCodeEmail from '@kyynk/transactional/emails/VerificationCodeEmail';
import { CONTACT_EMAIL } from '@/constants/constants';

export const POST = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return NextResponse.json(
          { message: errorMessages.USER_NOT_FOUND },
          { status: 400 },
        );
      }

      await prisma.verificationCode.deleteMany({
        where: { userId: userId },
      });

      const code = generateRandomCode(6);

      await prisma.verificationCode.create({
        data: {
          userId: userId!,
          code: code.toString(),
        },
      });

      const { error } = await resendClient.emails.send({
        from: CONTACT_EMAIL,
        to: user.email,
        subject: 'Verification Code',
        react: VerificationCodeEmail({ code }),
      });

      if (error) {
        return NextResponse.json(
          { message: errorMessages.EMAIL_ERROR },
          { status: 400 },
        );
      }

      return NextResponse.json('Ok', { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
