import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/utils/errors/errorHandler';
import { prisma } from '@/lib/db/client';
import { errorMessages } from '@/lib/constants/errorMessage';
import { TransactionStatus } from '@prisma/client';

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

    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { status: TransactionStatus.failed },
    });

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
