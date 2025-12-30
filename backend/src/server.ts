// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração básica de segurança e JSON
app.use(cors());
app.use(express.json());

// Prefixo global para as rotas
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Teste em: http://localhost:${PORT}/api/investigation/search?q=Fabio`);
});