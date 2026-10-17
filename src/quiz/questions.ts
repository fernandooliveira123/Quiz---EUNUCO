import { PRODUCTS } from "./config";

export type Product = "start" | "pro" | "whitelabel";

/** Pesos ajustáveis: pontos somados a cada produto. */
export interface Weights {
  start?: number;
  pro?: number;
  whitelabel?: number;
}

export interface QuizOption {
  id: string;
  text: string;
  weights?: Weights | undefined;
}

export type QuizStageNumber = 1 | 2 | 3 | 4 | 5;

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  stage: QuizStageNumber;
  /** Frase exibida antes desta pergunta, até clicar em Próximo. */
  transitionBefore?: string;
}

const o = (id: string, text: string, weights?: Weights): QuizOption => ({ id, text, weights });

export const QUIZ_STAGES = [
  "Entender a realidade do profissional",
  "Explorar as dores e despertar o desejo por praticidade",
  "Mostrar o potencial de crescimento e profissionalização",
  "Evidenciar a dor da falta de personalização",
  "Entender o momento de decisão",
] as const;

export const QUESTIONS: QuizQuestion[] = [
  // ETAPA 1 — Entender a realidade do profissional
  {
    id: "q1",
    stage: 1,
    text: "Quantos alunos você atende atualmente?",
    options: [
      o("A", "Ainda não tenho alunos ou estou conquistando os primeiros.", { start: 3 }),
      o("B", "De 1 a 9 alunos.", { start: 2, pro: 1 }),
      o("C", "De 10 a 30 alunos.", { pro: 3, whitelabel: 1 }),
      o("D", "Mais de 30 alunos.", { pro: 2, whitelabel: 3 }),
    ],
  },
  {
    id: "q2",
    stage: 1,
    text: "Como você organiza e entrega os treinos para seus alunos hoje?",
    options: [
      o("A", "Por planilhas ou documentos.", { start: 2, pro: 1 }),
      o("B", "Pelo WhatsApp ou por mensagens individuais.", { start: 2, pro: 1 }),
      o("C", "Por um aplicativo de prescrição.", { pro: 2, whitelabel: 2 }),
      o("D", "Utilizando diferentes ferramentas, sem centralizar tudo em um único lugar.", { pro: 2, start: 1 }),
    ],
  },
  {
    id: "q3",
    stage: 1,
    text: "Como você realiza seus atendimentos atualmente?",
    options: [
      o("A", "Principalmente de forma presencial.", { start: 1, pro: 1 }),
      o("B", "Principalmente por consultoria online.", { pro: 2, whitelabel: 3 }),
      o("C", "Combino atendimentos presenciais e online.", { pro: 2, whitelabel: 2 }),
      o("D", "Ainda estou estruturando meu modelo de atendimento.", { start: 2 }),
    ],
  },
  {
    id: "q4",
    stage: 1,
    text: "O que você mais gostaria de conquistar na sua consultoria nos próximos 12 meses?",
    options: [
      o("A", "Conquistar meus primeiros alunos e estabelecer minha carreira.", { start: 4 }),
      o("B", "Aumentar minha carteira de alunos e ampliar meu faturamento.", { pro: 3 }),
      o("C", "Organizar melhor minha operação para atender com mais eficiência.", { pro: 4 }),
      o("D", "Fortalecer minha marca e oferecer uma experiência mais profissional aos meus alunos.", { whitelabel: 5, pro: 1 }),
    ],
  },

  // ETAPA 2 — Explorar as dores e despertar o desejo por praticidade
  {
    id: "q5",
    stage: 2,
    transitionBefore: "Agora vamos entender sua rotina atual e o que você gostaria de tornar mais prático no dia a dia.",
    text: "Se você pudesse melhorar uma parte da sua rotina profissional hoje, qual escolheria?",
    options: [
      o("A", "Criar e atualizar os treinos com mais praticidade.", { start: 3, pro: 2 }),
      o("B", "Organizar melhor os alunos e suas informações.", { pro: 3, start: 1 }),
      o("C", "Ter mais tempo disponível para atender alunos e desenvolver minha consultoria.", { pro: 3, whitelabel: 2 }),
      o("D", "Oferecer uma experiência mais profissional aos meus alunos.", { whitelabel: 4, pro: 1 }),
    ],
  },
  {
    id: "q6",
    stage: 2,
    text: "Qual é o seu maior desafio ao gerenciar seus alunos no dia a dia?",
    options: [
      o("A", "Manter os treinos de cada aluno organizados e atualizados.", { start: 2, pro: 2 }),
      o("B", "Acompanhar as informações e a evolução de cada aluno.", { pro: 3 }),
      o("C", "Conciliar a gestão dos alunos com as demais atividades da consultoria.", { pro: 3, start: 1 }),
      o("D", "Administrar tudo de forma organizada enquanto minha carteira de alunos cresce.", { pro: 3, whitelabel: 2 }),
    ],
  },
  {
    id: "q7",
    stage: 2,
    text: "Quanto tempo você costuma levar para montar ou atualizar o treino de um aluno?",
    options: [
      o("A", "Até 3 minutos.", { pro: 1, whitelabel: 1 }),
      o("B", "Entre 4 e 10 minutos.", { start: 2, pro: 2 }),
      o("C", "Entre 11 e 20 minutos.", { pro: 3, start: 2 }),
      o("D", "Mais de 20 minutos.", { pro: 3, start: 2 }),
    ],
  },
  {
    id: "q8",
    stage: 2,
    text: "Como você gostaria que fosse sua rotina de prescrição de treinos?",
    options: [
      o("A", "Mais rápida, para conseguir montar e atualizar treinos com praticidade.", { start: 3, pro: 2 }),
      o("B", "Mais organizada, com os treinos e as informações dos alunos centralizados.", { pro: 3, start: 1 }),
      o("C", "Mais eficiente, para dedicar menos tempo às tarefas operacionais.", { pro: 3, whitelabel: 1 }),
      o("D", "Mais estruturada, para conseguir atender meus alunos sem complicar minha rotina.", { pro: 2, start: 2 }),
    ],
  },

  // ETAPA 3 — Mostrar o potencial de crescimento e profissionalização
  {
    id: "q9",
    stage: 3,
    transitionBefore: "Vamos ver o potencial de crescimento da sua consultoria e a percepção que você quer gerar nos alunos.",
    text: "Como você gostaria que sua consultoria fosse percebida pelos seus alunos?",
    options: [
      o("A", "Como um serviço prático e acessível.", { start: 3 }),
      o("B", "Como um serviço organizado e profissional.", { pro: 3, start: 1 }),
      o("C", "Como uma consultoria moderna, que oferece uma experiência diferenciada.", { pro: 3, whitelabel: 2 }),
      o("D", "Como uma marca própria, com identidade e presença digital reconhecíveis.", { whitelabel: 6 }),
    ],
  },
  {
    id: "q10",
    stage: 3,
    text: "Em qual estágio está a identidade visual da sua consultoria hoje?",
    options: [
      o("A", "Ainda não tenho uma identidade visual definida.", { start: 3, pro: 1 }),
      o("B", "Tenho uma logo, mas ainda não desenvolvi uma identidade visual consistente.", { start: 2, pro: 2 }),
      o("C", "Já tenho uma identidade visual definida e quero aplicá-la melhor ao meu serviço.", { whitelabel: 4, pro: 1 }),
      o("D", "Minha marca está estruturada e quero incorporá-la à experiência digital dos meus alunos.", { whitelabel: 7 }),
    ],
  },
  {
    id: "q11",
    stage: 3,
    text: "O que você gostaria de proporcionar aos seus alunos por meio de um aplicativo de prescrição?",
    options: [
      o("A", "Uma maneira mais prática de consultar os treinos.", { start: 3, pro: 1 }),
      o("B", "Uma experiência mais organizada, com os treinos reunidos em um só lugar.", { pro: 3, start: 1 }),
      o("C", "Uma experiência digital que transmita mais profissionalismo e cuidado.", { pro: 3, whitelabel: 2 }),
      o("D", "Uma experiência personalizada, alinhada à identidade da minha consultoria.", { whitelabel: 7 }),
    ],
  },

  // ETAPA 4 — Evidenciar a dor da falta de personalização
  {
    id: "q12",
    stage: 4,
    transitionBefore: "Agora vamos falar sobre o peso da identidade visual e a personalização da sua marca na escolha da plataforma.",
    text: "O que você mais considera ao escolher uma ferramenta para sua consultoria?",
    options: [
      o("A", "Facilidade de uso e praticidade na rotina.", { start: 3, pro: 2 }),
      o("B", "Capacidade de acompanhar o crescimento da minha carteira de alunos.", { pro: 4 }),
      o("C", "Possibilidade de ter um aplicativo com a identidade da minha consultoria.", { whitelabel: 7 }),
      o("D", "Adequação da solução às necessidades atuais e futuras do meu negócio.", { pro: 3, whitelabel: 2 }),
    ],
  },
  {
    id: "q13",
    stage: 4,
    text: "Como você gostaria que a marca da plataforma aparecesse para os seus alunos?",
    options: [
      o("A", "Não me importo com a marca que aparece no aplicativo.", { start: 3, pro: 3 }),
      o("B", "Prefiro usar o aplicativo com a marca da própria plataforma.", { pro: 5, start: 2 }),
      o("C", "Gostaria de ter um aplicativo com a minha identidade visual, sem a marca da plataforma.", { whitelabel: 8 }),
    ],
  },
  {
    id: "q14",
    stage: 4,
    text: "Você já sentiu falta de poder personalizar um aplicativo de prescrição com a identidade da sua própria consultoria?",
    options: [
      o("A", "Sim, gostaria de ter um aplicativo com minha própria marca, mas a plataforma que conheço não oferece essa possibilidade.", { whitelabel: 8 }),
      o("B", "Sim, encontrei limitações nas opções de personalização disponíveis.", { whitelabel: 6, pro: 1 }),
      o("C", "Não, a personalização nunca foi uma necessidade para mim.", { pro: 4, start: 3 }),
      o("D", "Ainda não conheço plataformas o suficiente para avaliar.", { start: 2, pro: 2 }),
    ],
  },

  // ETAPA 5 — Entender o momento de decisão
  {
    id: "q15",
    stage: 5,
    transitionBefore: "Para finalizar, vamos entender seus critérios de decisão e o que é essencial para sua consultoria.",
    text: "Como você costuma decidir se uma nova ferramenta vale a pena para sua consultoria?",
    options: [
      o("A", "Quando percebo que ela pode simplificar minhas tarefas diárias.", { start: 3, pro: 2 }),
      o("B", "Quando vejo que ela atende às necessidades dos meus alunos e da minha operação.", { pro: 4 }),
      o("C", "Quando consigo visualizar como ela se encaixa na minha rotina profissional.", { pro: 3, start: 2 }),
      o("D", "Quando percebo que ela oferece recursos que não encontro nas ferramentas que utilizo atualmente.", { whitelabel: 5, pro: 2 }),
    ],
  },
  {
    id: "q16",
    stage: 5,
    text: "O que você gostaria de conhecer melhor em uma plataforma de prescrição antes de decidir utilizá-la?",
    options: [
      o("A", "Como criar e atualizar treinos com mais praticidade.", { start: 4, pro: 2 }),
      o("B", "Como organizar os alunos e seus treinos em um único lugar.", { pro: 4, start: 1 }),
      o("C", "Como ter um aplicativo com a identidade visual da minha consultoria.", { whitelabel: 8 }),
      o("D", "Como a plataforma pode se adaptar à minha rotina e ao meu modelo de atendimento.", { pro: 3, whitelabel: 2 }),
    ],
  },
];

export type Answers = Record<string, string>; // { q1: "A", ... }

export function progressFor(index: number, total = QUESTIONS.length): number {
  return Math.round(((index + 1) / total) * 100);
}

export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => q.options.some((op) => op.id === answers[q.id]));
}

export interface Recommendation {
  recommendedProduct: Product;
  startScore: number;
  proScore: number;
  whitelabelScore: number;
  personalizedScore: number; // alias para whitelabel
  mensalScore: number; // alias para maior score mensal
  primaryMotivation: string;
  resultTitle: string;
  resultBadge: string;
  resultDescription: string[];
  resultBenefits: string[];
  resultReasons: string[];
  recommendedProductSummary: string;
}

const RESULT_COPY: Record<
  Product,
  { title: string; badge: string; description: string[]; benefits: string[] }
> = {
  whitelabel: {
    title: "A opção ideal para você é o Treino Inteligente White Label Anual.",
    badge: "MARCA PRÓPRIA · PLANO ANUAL",
    description: [
      "Pelas suas respostas, você busca superar as limitações das ferramentas tradicionais do mercado e posicionar sua própria marca no centro do atendimento aos alunos.",
      "Com a versão White Label Anual, seus alunos acessam os treinos em um aplicativo com a sua identidade visual, seu logotipo e suas cores, enquanto você prescreve treinos completos em até 3 minutos.",
    ],
    benefits: [
      "Aplicativo personalizado com a sua marca, logotipo e cores para os alunos.",
      "Prescrição ágil em até 3 minutos, eliminando horas de trabalho operacional.",
      "Experiência exclusiva sem logotipos de plataformas concorrentes.",
      "Condição especial com a melhor economia na contratação anual.",
    ],
  },
  pro: {
    title: "A opção que mais combina com seus objetivos é o Treino Inteligente Pro.",
    badge: "MENSALIDADE COMPLETA",
    description: [
      "Pelas suas respostas, você busca agilidade para prescrever treinos em até 3 minutos e recursos completos para organizar e escalar seus atendimentos sem complicações.",
      "O plano Pro oferece todas as funcionalidades avançadas de prescrição e acompanhamento com a flexibilidade da assinatura mensal.",
    ],
    benefits: [
      "Prescrição e atualização de treinos em até 3 minutos.",
      "Organização centralizada de alunos, treinos e acompanhamento em um só lugar.",
      "Assinatura mensal flexível com suporte ao crescimento da consultoria.",
    ],
  },
  start: {
    title: "A opção que mais combina com seu momento é o Treino Inteligente Start.",
    badge: "MENSALIDADE ESSENCIAL",
    description: [
      "Pelas suas respostas, você busca simplificar a rotina, parar de perder tempo com métodos manuais e mensagens soltas e dar os primeiros passos com uma ferramenta prática e acessível.",
      "O plano Start foi desenhado para quem quer prescrever treinos com máxima agilidade em até 3 minutos, com o menor investimento mensal.",
    ],
    benefits: [
      "Prescrição prática e rápida em até 3 minutos para o dia a dia.",
      "Fim do improviso de mensagens e treinos soltos no WhatsApp.",
      "Menor investimento mensal para caber com folga no orçamento.",
    ],
  },
};

/** Motivos ligados a respostas reais: [pergunta, alternativas, produto, texto]. */
const REASONS: [string, string[], Product, string][] = [
  // White Label
  ["q13", ["C"], "whitelabel", "Você prefere entregar um aplicativo com a sua própria identidade visual, sem a marca da plataforma."],
  ["q14", ["A", "B"], "whitelabel", "Você já sentiu na prática as limitações de ferramentas concorrentes que não oferecem personalização com a sua marca."],
  ["q11", ["D"], "whitelabel", "Sua prioridade é proporcionar aos alunos uma experiência personalizada e alinhada à sua identidade."],
  ["q16", ["C"], "whitelabel", "Seu maior interesse é ver como ter um aplicativo próprio com a identidade visual da sua consultoria."],
  ["q12", ["C"], "whitelabel", "A possibilidade de ter um app com a sua própria marca é o fator determinante na escolha da ferramenta."],
  ["q10", ["C", "D"], "whitelabel", "Sua identidade visual está pronta para ser incorporada à experiência digital dos seus alunos."],
  ["q9", ["D"], "whitelabel", "Você quer posicionar sua consultoria como uma marca reconhecível e com forte presença digital."],
  ["q4", ["D"], "whitelabel", "Seu objetivo principal é fortalecer sua marca e entregar uma experiência exclusiva aos alunos."],

  // Pro (Mensalidade Completa)
  ["q16", ["B", "D"], "pro", "Você busca centralizar e organizar todos os alunos, treinos e rotina em um único ambiente integrado."],
  ["q12", ["B", "D"], "pro", "Você prioriza uma ferramenta robusta e flexível, capaz de acompanhar o crescimento contínuo da sua carteira."],
  ["q6", ["B", "C", "D"], "pro", "Seu foco é otimizar o acompanhamento dos alunos e conciliar a gestão da consultoria sem sobrecarga."],
  ["q8", ["B", "C"], "pro", "Você quer uma rotina mais rápida e eficiente, dedicando menos tempo às tarefas operacionais."],
  ["q13", ["B"], "pro", "Para você, utilizar o aplicativo com a marca oficial da plataforma atende perfeitamente ao seu modelo de negócio."],
  ["q4", ["B", "C"], "pro", "Seu objetivo é ampliar sua carteira de alunos e organizar a operação com eficiência profissional."],

  // Start (Mensalidade Essencial)
  ["q1", ["A", "B"], "start", "Você está no momento ideal para prescrever treinos de forma ágil, com baixo investimento mensal."],
  ["q7", ["B", "C", "D"], "start", "Você quer simplificar a prescrição e montar treinos completos em até 3 minutos."],
  ["q8", ["A"], "start", "Sua meta imediata é criar e atualizar treinos com praticidade e rapidez no dia a dia."],
  ["q16", ["A"], "start", "Você quer conhecer como criar e atualizar treinos com máxima facilidade e agilidade."],
  ["q4", ["A"], "start", "Seu foco é conquistar os primeiros alunos e consolidar seu atendimento com segurança."],
  ["q13", ["A"], "start", "Para o seu momento atual, a praticidade de prescrição é mais importante do que a marca do aplicativo."],
];

function scoreOf(answers: Answers) {
  let start = 0, pro = 0, whitelabel = 0;
  for (const q of QUESTIONS) {
    const w = q.options.find((op) => op.id === answers[q.id])?.weights;
    start += w?.start ?? 0;
    pro += w?.pro ?? 0;
    whitelabel += w?.whitelabel ?? 0;
  }
  return { start, pro, whitelabel };
}

function decide(answers: Answers, start: number, pro: number, wl: number): Product {
  // Se White Label se destacou claramente
  if (wl > pro && wl > start) return "whitelabel";
  // Se Pro se destacou claramente
  if (pro > wl && pro > start) return "pro";
  // Se Start se destacou claramente
  if (start > wl && start > pro) return "start";

  // Desempates por intenção declarada:
  // Q13 (marca da plataforma vs marca própria) e Q14 (dor da falta de personalização) são decisivas para White Label
  if (answers["q13"] === "C" || answers["q16"] === "C") return "whitelabel";
  if (answers["q14"] === "A" && wl >= pro) return "whitelabel";

  // Q16 (o que quer conhecer melhor) e Q4 (objetivo 12 meses)
  if (answers["q16"] === "A" && start >= pro) return "start";
  if (answers["q4"] === "A" && start >= pro) return "start";
  if (answers["q1"] === "A" || answers["q1"] === "B") {
    if (start >= pro) return "start";
  }

  return "pro";
}

export function calculateRecommendation(answers: Answers): Recommendation {
  const { start, pro, whitelabel } = scoreOf(answers);
  const product = decide(answers, start, pro, whitelabel);
  const reasons = REASONS.filter(([q, ids, prod]) => prod === product && ids.includes(answers[q] ?? ""))
    .map(([, , , text]) => text)
    .filter((t, i, a) => a.indexOf(t) === i)
    .slice(0, 3);

  if (reasons.length === 0) {
    reasons.push("Esta é uma sugestão baseada no conjunto das suas respostas e no equilíbrio entre recursos e investimento.");
  }

  const q16 = QUESTIONS[15]?.options.find((op) => op.id === answers["q16"])?.text ?? "";
  const copy = RESULT_COPY[product];

  return {
    recommendedProduct: product,
    startScore: start,
    proScore: pro,
    whitelabelScore: whitelabel,
    personalizedScore: whitelabel,
    mensalScore: Math.max(start, pro),
    primaryMotivation: q16,
    resultTitle: copy.title,
    resultBadge: copy.badge,
    resultDescription: copy.description,
    resultBenefits: copy.benefits,
    resultReasons: reasons,
    recommendedProductSummary: PRODUCTS[product].description,
  };
}

export type OfferRoute = "/oferta-pro" | "/oferta-start";

/**
 * Roteamento Inteligente baseado no briefing:
 * - LP2 (/oferta-start): iniciantes sem alunos ou com menos de 10 alunos, operando via planilhas ou WhatsApp.
 * - LP1 (/oferta-pro): profissionais estabelecidos com mais de 10 alunos, que buscam marca própria ou já faturam com consultoria.
 */
export function decideOfferRoute(answers: Answers): OfferRoute {
  const q1 = answers["q1"] ?? "";
  const q3 = answers["q3"] ?? "";
  const q13 = answers["q13"] ?? "";
  const q16 = answers["q16"] ?? "";

  // 1. Mais de 10 alunos (C = 10 a 30, D = mais de 30) -> LP1 (/oferta-pro)
  if (q1 === "C" || q1 === "D") {
    return "/oferta-pro";
  }

  // 2. Já fatura com consultoria online ou híbrida (e possui alunos) -> LP1 (/oferta-pro)
  if ((q3 === "B" || q3 === "C") && q1 !== "A") {
    return "/oferta-pro";
  }

  // 3. Busca expressa por aplicativo com marca própria (Q13 = C, Q16 = C ou Q14 = A) tendo alunos -> LP1 (/oferta-pro)
  const q14 = answers["q14"] ?? "";
  if ((q13 === "C" || q16 === "C" || q14 === "A") && q1 !== "A") {
    return "/oferta-pro";
  }

  // 4. Iniciantes sem alunos (q1 = A), 1 a 9 alunos (q1 = B) ou operando via planilhas/WhatsApp -> LP2 (/oferta-start)
  return "/oferta-start";
}

