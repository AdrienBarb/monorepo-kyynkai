export const getPaymentPageLink = (
  userId: string,
  redirectUrl: string,
  discount?: number,
) => {
  const url = new URL(process.env.NEXT_PUBLIC_PAYMENT_PAGE!);
  url.searchParams.set('userId', userId);
  url.searchParams.set('redirectUrl', redirectUrl);

  if (discount) {
    url.searchParams.set('discount', discount.toString());
  }

  return url.toString();
};
