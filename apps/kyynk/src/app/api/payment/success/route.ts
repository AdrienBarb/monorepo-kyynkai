import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/utils/errors/errorHandler';
import { prisma } from '@/lib/db/client';
import { errorMessages } from '@/lib/constants/errorMessage';
import { TransactionStatus } from '@prisma/client';
import { sendPostHogEvent } from '@/utils/tracking/sendPostHogEvent';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const transactionId = body?.MerchantInfo?.externalId;

    if (!transactionId) {
      return NextResponse.json(
        { message: errorMessages.SERVER_ERROR },
        { status: 400 },
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: errorMessages.SERVER_ERROR },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: transaction.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: errorMessages.SERVER_ERROR },
        { status: 400 },
      );
    }

    sendPostHogEvent({
      distinctId: user.id,
      event: 'user_credit_purchase',
      properties: {
        amount: transaction.creditAmount,
        currency: transaction.currency,
        fiatAmount: transaction.fiatAmount,
        $process_person_profile: false,
      },
    });

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { creditsAmount: { increment: transaction.creditAmount } },
      }),
      prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: TransactionStatus.success },
      }),
    ]);

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
