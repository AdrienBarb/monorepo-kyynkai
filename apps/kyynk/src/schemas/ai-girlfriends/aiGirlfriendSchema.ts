import { z } from 'zod';

export const aiGirlfriendSchema = z.object({
  pseudo: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  archetype: z.string().min(1, 'Archetype is required'),
  isActive: z.boolean(),
  traits: z.array(z.string()).min(1, 'At least one trait is required'),
  hook: z.string().min(1, 'Hook is required'),
});

export type AiGirlfriendFormData = z.infer<typeof aiGirlfriendSchema>;
