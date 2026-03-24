import nodemailer from "nodemailer";
import { generateJobEmail } from "../src/templates/jobTemplate.js";
import type { MailRequest } from "../src/types/mail.js";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendJobEmail = async ({
  nomeVaga,
  emailDestino,
}: MailRequest): Promise<void> => {
  const template = generateJobEmail(nomeVaga);

  await transporter.sendMail({
    from: `Bruno Pasqual <${process.env.EMAIL_USER}>`,
    to: emailDestino,
    subject: `Currículo ${nomeVaga} - Bruno Pasqual`,
    text: template,
    attachments: [
      {
        filename: "curriculo - Bruno Pasqual.pdf",
        path: "./curriculo - Bruno Pasqual.pdf",
      },
    ],
  });
};
