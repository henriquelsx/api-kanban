import { Request, Response } from 'express';
import { z } from 'zod';
import { BoardService } from '../services/boardService.js';

const boardService = new BoardService();

const boardSchema = z.object({
  name: z.string().min(3, "O nome do quadro deve ter no mínimo 3 caracteres")
});

export const createBoard = async (req: Request, res: Response) => {
  try {
    const { name } = boardSchema.parse(req.body);
    const newBoard = await boardService.create(name);
    return res.status(201).json(newBoard);
  } catch (error: any) {
    if (error instanceof z.ZodError) return res.status(400).json({ errors: error.issues });
    return res.status(500).json({ error: error.message });
  }
};