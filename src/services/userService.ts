import { pool } from '../config/database.js';
import { user } from '../models/user.js';

export class UserService {
  async create(userData: user): Promise<user> {
    const { name, email, phone } = userData;
    // SQL Manual: Usamos $1, $2, $3 para evitar SQL Injection
    const query = `
      INSERT INTO users (name, email, phone) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [name, email, phone]);
    return result.rows[0];
  }

  async findAll(): Promise<user[]> {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    return result.rows;
  }
}