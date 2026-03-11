import { Request, Response } from 'express';
import { z } from 'zod';
import { UserService } from '../services/userService.js';

const userService = new UserService();

const userSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(8, "Telefone muito curto")
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body);   
    const newUser = await userService.create(validatedData);
    return res.status(201).json(newUser);

} catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Dados de entrada inválidos",
        errors: error.issues 
      });
    }
    
    // ADICIONE ESTA LINHA AQUI EMBAIXO:
    console.error("❌ Erro no Controller:", error); 
    
    return res.status(500).json({ error: "Erro interno" });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.findAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};