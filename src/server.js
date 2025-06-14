import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Rota de status
app.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API rodando com sucesso 🚀' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});