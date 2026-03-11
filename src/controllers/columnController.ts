import { Request, Response } from 'express';
import { z } from 'zod';
import { ColumnService } from '../services/columnService.js';

const columnService = new ColumnService();

const columnSchema = z.object({
  name: z.string().min(1, "Nome da coluna é obrigatório"),
  display_order: z.number().int().nonnegative(),
  board_id: z.number().int()
});

export const createColumn = async (req: Request, res: Response) => {
  try {
    const validatedData = columnSchema.parse(req.body);
    const newColumn = await columnService.create(validatedData);
    return res.status(201).json(newColumn);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ errors: error.issues });
    return res.status(500).json({ error: error.message });
  }
};