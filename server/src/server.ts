import cors from "cors";
import "dotenv/config";
import express from "express";
import { sendJobEmail, transporter } from "../services/MailService.js";

const app = express();
app.use(cors());
app.use(express.json());

console.log("DEBUG - User:", process.env.EMAIL_USER);
console.log("DEBUG - Pass:", process.env.EMAIL_PASS);

app.post("/enviar", async (req, res) => {
  try {
    await sendJobEmail(req.body);
    res.status(200).json({ message: "E-mail enviado!" });
  } catch (error) {
    res.status(500).json({ error: "Erro no envio." });
  }
});

app.get("/teste-rapido", async (req, res) => {
  try {
    await sendJobEmail({
      nomeVaga: "Vaga de Teste do Back",
      emailDestino: "brunopasqual0@gmail.com",
    });
    res.send(
      "<h1>✅ E-mail de teste enviado! Confira sua caixa de entrada.</h1>",
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("<h1>❌ Erro no teste. Verifique o console.</h1>");
  }
});

const bootstrap = async () => {
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
    process.exit(1); // Encerra a aplicação com erro
  }
};

bootstrap();
