import cors from "cors";
import "dotenv/config";
import express from "express";
import { transporter } from "../services/MailService.js";
import emailRouter from "./routes/email.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/application", emailRouter);

const verifyConnectionAndStart = async () => {
  try {
    console.log("📡 Validando conexão com Gmail...");

    await transporter.verify();

    console.log("✅ SMTP Autenticado.");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor pronto em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro crítico: Não foi possível autenticar no Gmail.");
    console.error("Verifique sua Senha de App e o arquivo .env");
    process.exit(1);
  }
};

verifyConnectionAndStart();
