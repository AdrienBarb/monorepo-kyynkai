export const getPaymentPageLink = (userId: string, redirectUrl: string) => {
  return `${process.env.NEXT_PUBLIC_PAYMENT_PAGE}?userId=${userId}&redirectUrl=${redirectUrl}`;
};
