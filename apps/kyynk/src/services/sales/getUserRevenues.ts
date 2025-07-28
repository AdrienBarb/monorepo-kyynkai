import { prisma } from '@/lib/db/client';
import { calculateNetRevenue } from '@/utils/revenues/calculateNetRevenue';
import { Sale } from '@prisma/client';
import { isBefore } from 'date-fns';

export const getUserRevenues = async ({
  userId,
}: {
  userId: string;
}): Promise<{ incomingRevenue: number; availableRevenue: number }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { feeFreeUntil: true },
    });

    const sales = await prisma.sale.findMany({
      where: {
        sellerId: userId,
        isPaid: false,
      },
    });
    const today = new Date();

    const incomingRevenue = sales
      .filter(
        (sale: Sale) => !sale.isPaid && isBefore(today, sale.availableDate),
      )
      .reduce((acc: number, sale: Sale) => acc + sale.creditAmount, 0);

    const availableRevenue = sales
      .filter(
        (sale: Sale) => sale.isPaid || !isBefore(today, sale.availableDate),
      )
      .reduce((acc: number, sale: Sale) => acc + sale.creditAmount, 0);

    return {
      incomingRevenue: calculateNetRevenue(incomingRevenue, user?.feeFreeUntil),
      availableRevenue: calculateNetRevenue(
        availableRevenue,
        user?.feeFreeUntil,
      ),
    };
  } catch (error) {
    console.error('Error fetching user sales:', error);
    throw error;
  }
};
