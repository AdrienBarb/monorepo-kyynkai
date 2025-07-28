import { isBefore } from 'date-fns';

export const calculateNetRevenue = (
  grossRevenue: number,
  feeFreeUntil: Date | null | undefined,
): number => {
  const today = new Date();
  const feePercentage = 0.1;

  if (feeFreeUntil && isBefore(today, feeFreeUntil)) {
    return grossRevenue;
  }

  return grossRevenue * (1 - feePercentage);
};
