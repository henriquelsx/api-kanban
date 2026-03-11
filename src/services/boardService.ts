import { pool } from '../config/database.js';
import { board } from '../models/board.js';

export class BoardService {
  async create(name: string): Promise<board> {
    const query = 'INSERT INTO boards (name) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [name]);
    return result.rows[0];
  }

  async findAll(): Promise<board[]> {
    const result = await pool.query('SELECT * FROM boards ORDER BY id ASC');
    return result.rows;
  }
}