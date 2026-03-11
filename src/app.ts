import express from 'express';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'up', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});

export default app;