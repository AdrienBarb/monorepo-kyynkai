import { z } from 'zod';

export const playFantasyChoiceSchema = z.object({
  fantasyId: z.string(),
  choiceId: z.string(),
});
