import cors from "cors";
import "dotenv/config";
import express from "express";
import emailRouter from "./routes/email.routes.js";
import { transporter } from "./services/MailService.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  }),
);

app.use(express.json());
app.use("/application", emailRouter);

const verifyConnectionAndStart = async () => {
  try {
    console.log("📡 Validando conexão com Gmail...");
    await transporter.verify();
    console.log("✅ SMTP Autenticado.");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro crítico: Não foi possível autenticar no Gmail.");
    process.exit(1);
  }
};

verifyConnectionAndStart();
