export const getCreditsWithFiat = (price: number) => {
  if (isNaN(price)) return { fiatPrice: 0, creditPrice: 0 };

  return {
    fiatPrice: Math.round(price),
    creditPrice: Math.round(price * 2),
  };
};

export const getFiatWithCredits = (credits: number) => {
  if (isNaN(credits)) return { fiatPrice: 0, creditPrice: 0 };

  return {
    fiatPrice: Math.round(credits / 2),
    creditPrice: Math.round(credits),
  };
};
