import { z } from 'zod';

export const bankDetailsSchema = z.object({
  bankAccountName: z
    .string()
    .min(1, { message: 'Bank Account Name is required.' }),
  iban: z.string().min(1, { message: 'IBAN is required.' }),
});
