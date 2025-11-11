import { z } from 'zod';

export const nudeSchema = z.object({
  description: z
    .string({ required_error: 'This field is required' })
    .min(1, {
      message: 'This field is required',
    })
    .max(300, {
      message: 'Description must be at most 300 characters long.',
    }),
  price: z.number().int(),
  tags: z.array(z.object({ value: z.string(), label: z.string() })),
});

export const privateNudeSchema = z.object({
  description: z.string({ required_error: 'This field is required' }).min(1, {
    message: 'This field is required',
  }),
  price: z.number().int(),
});
