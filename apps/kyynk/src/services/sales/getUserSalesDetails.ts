import { prisma } from '@/lib/db/client';

export const getUserSalesDetails = async ({ userId }: { userId: string }) => {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        sellerId: userId,
      },
      select: {
        buyer: {
          select: {
            pseudo: true,
          },
        },
        creditAmount: true,
      },
    });

    return sales.map((sale) => ({
      buyerPseudo: sale.buyer.pseudo,
      creditAmount: sale.creditAmount,
      fiatAmount: sale.creditAmount * 0.1, // Assuming a conversion rate
    }));
  } catch (error) {
    console.error('Error fetching user sales details:', error);
    throw error;
  }
};
