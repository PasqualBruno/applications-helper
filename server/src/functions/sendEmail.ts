
import * as azure from "@azure/functions";


import type {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";


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


azure.app.http("sendEmail", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: sendEmail,
});
