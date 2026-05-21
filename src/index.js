// src/index.js - Versão organizada
import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js"
import { toNodeHandler } from "better-auth/node";

// Configuração inicial
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware global
app.use(express.json());

// Rota de autenticação do Better Auth
// Isso cria todas as rotas automaticamente!
app.all("/api/auth/*path", toNodeHandler(auth));

// Rota de health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Rota de teste
app.get("/", (req, res) => {
  res.json({
    message: "🚀 MinURL API rodando!",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      docs: "/api/docs",
    },
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`);
});