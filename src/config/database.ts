import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

// Configuração do Pool de Conexões
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//Função para validar a conexão com o banco de dados.
//Essencial para o ciclo de vida da aplicação.

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log('✅ Banco de dados conectado com sucesso! (Timestamp:', res.rows[0].now, ')');
    client.release(); // Libera o cliente de volta para o pool
  } catch (err) {
    console.error('❌ Erro crítico ao conectar no banco de dados:', err);
    // Em um ambiente de produção/DevOps, aqui você poderia disparar um alerta
    // ou decidir se a aplicação deve continuar rodando.
  }
};