import { z } from 'zod';

export const messageSchema = z.string().min(1, 'Message cannot be empty');
