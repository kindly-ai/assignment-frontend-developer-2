import { z } from 'zod';

export const inputMessageSchema = z.object({
    text: z.string(),
});

export const outputMessageSchema = z.object({
    status: z.enum(['processing', 'completed', 'error']),
    response: z.string().optional(),
    error: z.string().optional(),
});