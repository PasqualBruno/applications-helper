// 1. Importamos o pacote inteiro como 'azure' (para o runtime)
import * as azure from "@azure/functions";

// 2. Importamos apenas os TIPOS separadamente (usando 'import type')
import type {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

// 3. Importamos o seu service e tipos
import { sendJobEmail } from "../services/MailService.js";
import type { ISendEmailRequest } from "../types/mail.js";

export async function sendEmail(
  req: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  try {
    const body = (await req.json()) as ISendEmailRequest;

    if (!body || !body.jobName || !body.recipientEmail) {
      return {
        status: 400,
        jsonBody: { error: "Nome da vaga e e-mail são obrigatórios" },
      };
    }

    await sendJobEmail({
      jobName: body.jobName,
      recipientEmail: body.recipientEmail,
    });

    return {
      status: 200,
      jsonBody: { message: "E-mail enviado com sucesso pelo Azure!" },
    };
  } catch (error) {
    context.log(`Erro: ${error}`);
    return {
      status: 500,
      jsonBody: { error: "Erro interno no envio." },
    };
  }
}

// 4. Atenção aqui: Usamos 'azure.app' em vez de apenas 'app'
azure.app.http("sendEmail", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: sendEmail,
});
