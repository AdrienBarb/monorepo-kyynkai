import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getUserSales } from '@/services/sales/getUserSales';
import { errorMessages } from '@/lib/constants/errorMessage';
import { getFiatWithCredits } from '@/utils/prices/getMediaPrice';
import { MIN_CREDITS_AMOUNT_FOR_WITHDRAWAL } from '@/constants/constants';
import { calculateNetRevenue } from '@/utils/revenues/calculateNetRevenue';

export const POST = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId! },
        select: {
          feeFreeUntil: true,
          settings: { select: { bankAccountName: true, iban: true } },
        },
      });

      if (!user?.settings?.bankAccountName || !user?.settings?.iban) {
        return NextResponse.json(
          { message: errorMessages.MISSING_BANK_ACCOUNT_INFORMATION },
          { status: 400 },
        );
      }

      const sales = await getUserSales({ userId: userId! });

      if (sales.length === 0) {
        return NextResponse.json(
          { message: errorMessages.NO_UNPAID_SALES },
          { status: 400 },
        );
      }

      const totalGrossAmount = sales.reduce(
        (sum: number, sale: { creditAmount: number }) =>
          sum + sale.creditAmount,
        0,
      );

      const totalNetAmount = calculateNetRevenue(
        totalGrossAmount,
        user?.feeFreeUntil,
      );

      if (totalNetAmount < MIN_CREDITS_AMOUNT_FOR_WITHDRAWAL) {
        return NextResponse.json(
          { message: errorMessages.INSUFFICIENT_CREDITS },
          { status: 400 },
        );
      }

      const saleIds = sales.map((sale) => sale.id);
      const { fiatPrice } = getFiatWithCredits(totalNetAmount);

      await prisma.$transaction([
        prisma.sale.updateMany({
          where: { id: { in: saleIds } },
          data: { isPaid: true },
        }),
        prisma.invoice.create({
          data: {
            userId: userId!,
            fiatAmount: fiatPrice,
            sales: {
              connect: saleIds.map((id) => ({ id })),
            },
          },
        }),
      ]);

      return NextResponse.json({ message: 'OK' });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
