/**
 * Função responsável por gerar o corpo do e-mail formatado.
 * Segue o padrão de 'Separation of Concerns' (Separação de Preocupações).
 */
export const generateJobEmail = (nomeVaga: string): string => {
  return `
Olá, boa noite.

Me chamo Bruno Pasqual e estou enviando meu currículo para participar do processo seletivo para a vaga de ${nomeVaga}. Possuo experiência prévia na área, tendo atuado como:

Desenvolvedor Front-End (Júnior) — AGX Software
React, TypeScript, MongoDB, Node, Antd
mar/2025 - atual
Resumo: Evolução de um CRM financeiro white-label e estruturação do Design System interno da empresa.

Desenvolvedor Full Stack (Estágio) — Fazsoft Solutions
C#, ASP.NET, TypeScript, React, Bootstrap, CSS, MySQL, MongoDB, REST API
fev/2024 - mar/2025
Resumo: Manutenção de sistemas ERP e desenvolvimento de ponta a ponta de microsserviços web e APIs RESTful.

Desenvolvedor Front-End (Voluntário) — Flowon
TypeScript, JavaScript, React, CSS, Tailwind
ago/2023 - fev/2024
Resumo: Criação de um sistema de gerenciamento de eventos corporativos com credenciamento instantâneo via QR Code.

Fico à disposição para maiores esclarecimentos.

Obrigado pela atenção.
Bruno Henrique Pasqual
  `.trim();
};
