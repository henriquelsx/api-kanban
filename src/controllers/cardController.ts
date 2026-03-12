import { Request, Response } from 'express';
import { z } from 'zod';
import { CardService } from '../services/cardService.js';

const cardService = new CardService();

// Criação do esquema de validação para os campos do Card
const cardSchema = z.object({
  title: z.string().min(1, "O título do card é obrigatório"),
  description: z.string().optional(),
  author_id: z.number().int({ message: "O ID do autor deve ser um número inteiro" }),
  column_id: z.number().int({ message: "O ID da coluna deve ser um número inteiro" })
});

// Esquema para a movimentação do Card (apenas a nova coluna)
const moveCardSchema = z.object({
  column_id: z.number().int({ message: "O ID da nova coluna deve ser um número inteiro" })
});

export const createCard = async (req: Request, res: Response) => {
  try {
    const validatedData = cardSchema.parse(req.body);
    const newCard = await cardService.create(validatedData);
    return res.status(201).json(newCard);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Erro de validação", 
        errors: error.issues 
      });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const moveCard = async (req: Request, res: Response) => {
  try {
    
    const cardId = parseInt(req.params.id as string);
    const { column_id } = moveCardSchema.parse(req.body);
    const updatedCard = await cardService.updateColumn(cardId, column_id);
    
    if (!updatedCard) {
      return res.status(404).json({ error: "Card não encontrado" });
    }
    
    return res.json({
      message: "Card movido com sucesso",
      card: updatedCard
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Erro de validação na movimentação", 
        errors: error.issues 
      });
    }
    return res.status(500).json({ error: error.message });
  }
};
