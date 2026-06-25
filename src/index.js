// src/index.js - Versão organizada
import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js"
import postRoutes from "./routes/postRoutes.js";
import { toNodeHandler } from "better-auth/node";
import { requireAuth } from "./middleware/auth.js";
import cors from "cors";

// Configuração inicial

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware global
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log("Origin:", req.headers.origin);
  next();
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    message: "Bem-vindo ao seu perfil!",
    user: req.user, // Dados vindos do middleware
  });
});

// Rota de autenticação do Better Auth
// Isso cria todas as rotas automaticamente!
app.all("/api/auth/*path", toNodeHandler(auth));

// Rota de health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/posts", postRoutes);

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