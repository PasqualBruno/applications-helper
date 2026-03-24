import { type Request, type Response } from "express";
import { sendJobEmail } from "../../services/MailService.js";
import type { ISendEmailRequest } from "../types/mail.js";

export class EmailController {
  async send(req: Request<{}, {}, ISendEmailRequest>, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).json({ error: "Body vazio" });
      }

      const { jobName, recipientEmail, postLink } = req.body;
      if (!jobName || !recipientEmail) {
        return res
          .status(400)
          .json({ error: "Nome da vaga e e-mail são obrigatórios" });
      }
      await sendJobEmail({ jobName, recipientEmail });

      /* 

      Salva na tabela do mongo caso tenha sido sucesso
      applicationId, userId, email, post, applicationStatus
      Poderá ser trocado, entre : 
      - Enviado
      - Contato de retorno
      - Entrevista
      - Aprovado
      - Reprovado
      
      */

      return res.status(200).json({ message: "E-mail enviado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro no envio." });
    }
  }
}

export default new EmailController();
