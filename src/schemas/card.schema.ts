import { z } from 'zod';

export const moveCardSchema = z.object({
  column_id: z.number().positive("O ID da coluna deve ser um número positivo")
});

export type MoveCardInput = z.infer<typeof moveCardSchema>;