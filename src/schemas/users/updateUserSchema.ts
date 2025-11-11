import { z } from 'zod';

export const updateUserSchema = z.object({
  pseudo: z.string().optional(),
  email: z.string().email().optional(),
  userType: z.enum(['member', 'creator']).optional(),
  preferences: z.array(z.string()).optional(),
  age: z.number().min(0).optional(),
  description: z.string().optional(),
  profileImageId: z.string().optional(),
  gender: z.string().optional(),
  bodyType: z.string().optional(),
  hairColor: z.string().optional(),
  country: z.string().optional(),
  languages: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  contentProviderPolicyAccepted: z.boolean().optional(),
});
