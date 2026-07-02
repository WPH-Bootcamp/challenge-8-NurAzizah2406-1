import { z } from 'zod';

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, { message: 'Search query cannot be empty' })
    .max(100, { message: 'Search query is too long' }),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
