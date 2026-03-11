import { pool } from '../config/database.js';
import { column } from '../models/column.js';

export class ColumnService {
  async create(columnData: Omit<column, 'id'>): Promise<column> {
    const { name, display_order, board_id } = columnData;
    const query = `
      INSERT INTO columns (name, display_order, board_id) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [name, display_order, board_id]);
    return result.rows[0];
  }

  async findByBoardId(boardId: number): Promise<column[]> {
    const query = 'SELECT * FROM columns WHERE board_id = $1 ORDER BY display_order ASC';
    const result = await pool.query(query, [boardId]);
    return result.rows;
  }
}