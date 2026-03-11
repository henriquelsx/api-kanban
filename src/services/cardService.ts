import { pool } from '../config/database.js';
import { card } from '../models/card.js';

export class CardService {
  // 1. Criar Card
  async create(cardData: Omit<card, 'id'>): Promise<card> {
    const { title, description, author_id, column_id } = cardData;
    
    // SQL Manual com Parâmetros
    const query = `
      INSERT INTO cards (title, description, author_id, column_id) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const values = [title, description, author_id, column_id];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  //Mover Card
  async updateColumn(cardId: number, newColumnId: number): Promise<card | null> {
    // SQL Manual para atualizar apenas a coluna 
    const query = `
      UPDATE cards 
      SET column_id = $1 
      WHERE id = $2 
      RETURNING *
    `;
    const values = [newColumnId, cardId];

    const result = await pool.query(query, values);

    // Retorna null se o ID não existir no banco
    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

 //Listar cards por coluna
  async findByColumn(columnId: number): Promise<card[]> {
    const query = 'SELECT * FROM cards WHERE column_id = $1 ORDER BY id ASC';
    const result = await pool.query(query, [columnId]);
    return result.rows;
  }
}