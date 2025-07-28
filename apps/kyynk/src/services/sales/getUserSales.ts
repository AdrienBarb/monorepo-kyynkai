import { prisma } from '@/lib/db/client';

export const getUserSales = async ({ userId }: { userId: string }) => {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        sellerId: userId,
        isPaid: false,
        availableDate: {
          lte: new Date(),
        },
      },
    });

    return sales;
  } catch (error) {
    console.error('Error fetching user sales:', error);
    throw error;
  }
};
