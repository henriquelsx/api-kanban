import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import apiRouter from './routes/index.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Inicia o teste de conexão com o Postgres assim que o servidor sobe
testConnection();

// Rota de Health Check (Essencial para monitoramento e Docker)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Centraliza todas as rotas da aplicação sob o prefixo /api
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📂 Endpoints da API em http://localhost:${PORT}/api`);
});

export default app;