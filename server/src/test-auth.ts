import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Erro de autenticação:");
    console.error(error.message);

    if (error.message.includes("535")) {
      console.log(
        '\nDica: O erro 535 geralmente significa que a "Senha de App" está incorreta ou você está tentando usar sua senha normal do Gmail.',
      );
    }
  } else {
    console.log(
      "✅ As credenciais estão válidas! O servidor está pronto para enviar e-mails.",
    );
  }
});
