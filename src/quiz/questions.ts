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

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  stage: 1 | 2 | 3 | 4;
  /** Frase exibida antes desta pergunta, até clicar em Próximo. */
  transitionBefore?: string;
}

const o = (id: string, text: string, weights?: Weights): QuizOption => ({ id, text, weights });

export const QUIZ_STAGES = [
  "Entender a realidade profissional",
  "Reconhecer dificuldades e oportunidades",
  "Construir desejo por uma rotina melhor",
  "Identificar prioridades e preparar a escolha",
] as const;

export const QUESTIONS: QuizQuestion[] = [
  // ETAPA 1 — Entender a realidade profissional
  {
    id: "q1",
    stage: 1,
    text: "Como você trabalha atualmente como personal trainer?",
    options: [
      o("A", "Atendo presencialmente."),
      o("B", "Trabalho com consultoria online."),
      o("C", "Atendo presencialmente e online."),
      o("D", "Estou começando a conquistar meus alunos."),
    ],
  },
  {
    id: "q2",
    stage: 1,
    text: "Quantos alunos você atende atualmente?",
    options: [
      o("A", "Até 10 alunos."),
      o("B", "De 11 a 20 alunos."),
      o("C", "De 21 a 40 alunos."),
      o("D", "Mais de 40 alunos."),
    ],
  },
  {
    id: "q3",
    stage: 1,
    text: "Como você organiza e entrega os treinos hoje?",
    options: [
      o("A", "Planilhas ou PDFs."),
      o("B", "WhatsApp e mensagens."),
      o("C", "Um aplicativo de prescrição."),
      o("D", "Uso ferramentas diferentes, dependendo do aluno."),
    ],
  },

  // ETAPA 2 — Reconhecer dificuldades e oportunidades
  {
    id: "q4",
    stage: 2,
    transitionBefore: "Agora vamos identificar as dificuldades e oportunidades da sua rotina.",
    text: "Qual atividade mais consome seu tempo durante a semana?",
    options: [
      o("A", "Montar e atualizar treinos."),
      o("B", "Organizar informações dos alunos."),
      o("C", "Responder mensagens e acompanhar alunos."),
      o("D", "Administrar minha consultoria."),
      o("E", "Divulgar meu trabalho e conquistar alunos."),
    ],
  },
  {
    id: "q5",
    stage: 2,
    text: "Quando sua rotina fica corrida, o que costuma ser mais difícil manter em dia?",
    options: [
      o("A", "A atualização dos treinos."),
      o("B", "A organização das informações dos alunos."),
      o("C", "O acompanhamento e a comunicação."),
      o("D", "O planejamento da consultoria."),
      o("E", "Consigo manter tudo em dia, mas quero trabalhar com mais praticidade."),
    ],
  },
  {
    id: "q6",
    stage: 2,
    text: "O que você mais gostaria de melhorar no seu processo de prescrição?",
    options: [
      o("A", "Criar e atualizar treinos com mais agilidade."),
      o("B", "Deixar os treinos mais organizados."),
      o("C", "Facilitar o acesso dos alunos aos treinos."),
      o("D", "Reunir minha rotina em uma ferramenta mais prática."),
      o("E", "Melhorar a apresentação profissional do meu serviço."),
    ],
  },

  // ETAPA 3 — Construir desejo por uma rotina melhor
  {
    id: "q7",
    stage: 3,
    transitionBefore: "Vamos imaginar uma rotina mais prática e a experiência que você quer oferecer aos alunos.",
    text: "Se você ganhasse mais praticidade na prescrição, onde gostaria de usar esse tempo?",
    options: [
      o("A", "Dar mais atenção aos meus alunos.", { start: 1, pro: 2 }),
      o("B", "Atender mais alunos.", { pro: 3 }),
      o("C", "Desenvolver minha consultoria.", { whitelabel: 3, pro: 2 }),
      o("D", "Estudar e me especializar.", { pro: 2, start: 1 }),
      o("E", "Ter mais equilíbrio entre trabalho e vida pessoal.", { start: 2 }),
    ],
  },
  {
    id: "q8",
    stage: 3,
    text: "O que você considera mais importante na experiência que entrega aos seus alunos?",
    options: [
      o("A", "Treinos organizados e fáceis de consultar."),
      o("B", "Acompanhamento próximo e individualizado."),
      o("C", "Uma experiência prática e moderna."),
      o("D", "Uma apresentação profissional do meu serviço."),
      o("E", "Uma combinação desses aspectos."),
    ],
  },
  {
    id: "q9",
    stage: 3,
    text: "Como você gostaria que sua consultoria fosse percebida pelos alunos?",
    options: [
      o("A", "Profissional e organizada.", { start: 1, pro: 2 }),
      o("B", "Personalizada e próxima.", { whitelabel: 3, pro: 1 }),
      o("C", "Moderna e prática.", { pro: 3 }),
      o("D", "Diferenciada em relação a outras opções.", { whitelabel: 3 }),
      o("E", "Ainda estou definindo esse posicionamento.", { start: 1 }),
    ],
  },

  // ETAPA 4 — Identificar prioridades e preparar a escolha
  {
    id: "q10",
    stage: 4,
    transitionBefore: "Para finalizar, vamos entender suas prioridades e o que faz sentido para sua consultoria.",
    text: "Qual benefício faria mais diferença na sua rotina neste momento?",
    options: [
      o("A", "Prescrever treinos com mais praticidade.", { start: 4, pro: 1 }),
      o("B", "Organizar melhor o atendimento aos alunos.", { pro: 4, start: 1 }),
      o("C", "Ter mais recursos para apoiar meu trabalho.", { pro: 5 }),
      o("D", "Fortalecer a identidade da minha consultoria.", { whitelabel: 6 }),
      o("E", "Conhecer uma solução que reúna vários desses benefícios.", { pro: 2, whitelabel: 2 }),
    ],
  },
  {
    id: "q11",
    stage: 4,
    text: "Qual importância teria para você oferecer os treinos em uma plataforma com a identidade visual da sua consultoria?",
    options: [
      o("A", "É uma prioridade para mim.", { whitelabel: 6 }),
      o("B", "Seria um diferencial importante.", { whitelabel: 4 }),
      o("C", "Tenho curiosidade, mas não é prioridade agora.", { pro: 3, start: 2 }),
      o("D", "Prefiro priorizar os recursos de prescrição.", { pro: 4, start: 3 }),
      o("E", "Ainda preciso entender melhor essa possibilidade.", { start: 2, pro: 1 }),
    ],
  },
  {
    id: "q12",
    stage: 4,
    text: "Ao escolher uma ferramenta para sua consultoria, o que mais pesa na decisão?",
    options: [
      o("A", "Preço acessível e pagamento que caiba no orçamento.", { start: 6 }),
      o("B", "Recursos que facilitem minha rotina.", { pro: 5, start: 2 }),
      o("C", "Possibilidade de ampliar a estrutura do meu serviço.", { pro: 5, whitelabel: 2 }),
      o("D", "Personalização com a minha própria marca.", { whitelabel: 6 }),
      o("E", "Equilíbrio entre recursos, investimento e praticidade.", { pro: 3, start: 3 }),
    ],
  },
  {
    id: "q13",
    stage: 4,
    text: "Qual frase mais representa o seu momento profissional?",
    options: [
      o("A", "Quero começar com o essencial e evoluir aos poucos.", { start: 7 }),
      o("B", "Quero mais recursos para organizar e desenvolver meu trabalho.", { pro: 7 }),
      o("C", "Quero oferecer uma experiência com a identidade da minha própria marca.", { whitelabel: 7 }),
      o("D", "Quero comparar as possibilidades antes de decidir.", { start: 1, pro: 1 }),
      o("E", "Ainda estou entendendo o que preciso.", { start: 2 }),
    ],
  },
  {
    id: "q14",
    stage: 4,
    text: "Depois de conhecer uma plataforma de prescrição, o que você precisaria ver para considerar que ela vale a pena?",
    options: [
      o("A", "Que ela torne minha rotina mais prática.", { start: 4, pro: 2 }),
      o("B", "Que os recursos atendam às necessidades do meu trabalho.", { pro: 5 }),
      o("C", "Que a experiência dos alunos seja organizada.", { start: 2, pro: 3 }),
      o("D", "Que eu possa fortalecer minha marca com uma plataforma própria.", { whitelabel: 6 }),
      o("E", "Que o investimento faça sentido para os benefícios oferecidos.", { start: 2, pro: 3 }),
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
      "Pelas suas respostas, oferecer uma experiência diferenciada e posicionar sua própria marca no centro do atendimento são prioridades estratégicas para sua consultoria.",
      "Com a versão White Label Anual, seus alunos acessam os treinos em uma plataforma personalizada com sua logo, suas cores e a identidade da sua consultoria, somando todos os recursos com a melhor condição no plano anual.",
    ],
    benefits: [
      "Plataforma personalizada com a sua logo e as cores da sua marca.",
      "Experiência exclusiva para os alunos sem marcas de terceiros.",
      "Todos os recursos de prescrição com economia na contratação anual.",
    ],
  },
  pro: {
    title: "A opção que mais combina com seus objetivos é o Treino Inteligente Pro.",
    badge: "MENSALIDADE COMPLETA",
    description: [
      "Pelas suas respostas, você valoriza uma ferramenta completa e robusta para agilizar a montagem de treinos, organizar informações dos alunos e dar escala ao seu atendimento.",
      "O plano Pro oferece todas as funcionalidades avançadas de prescrição e acompanhamento com a flexibilidade da mensalidade.",
    ],
    benefits: [
      "Conjunto completo de ferramentas avançadas de prescrição.",
      "Organização centralizada dos alunos e acompanhamento facilitado.",
      "Modelo mensal flexível, ideal para quem quer crescer.",
    ],
  },
  start: {
    title: "A opção que mais combina com seu momento é o Treino Inteligente Start.",
    badge: "MENSALIDADE ESSENCIAL",
    description: [
      "Pelas suas respostas, você busca dar os primeiros passos com uma ferramenta prática, acessível e focada em organizar a prescrição de treinos sem custos elevados.",
      "O plano Start foi desenhado para quem quer começar com o essencial e ter mais agilidade na entrega dos treinos.",
    ],
    benefits: [
      "Prescrição prática e rápida para o dia a dia.",
      "Menor investimento mensal para caber com folga no orçamento.",
      "Evolução gradual conforme sua base de alunos cresce.",
    ],
  },
};

/** Motivos ligados a respostas reais: [pergunta, alternativas, produto, texto]. */
const REASONS: [string, string[], Product, string][] = [
  // White Label
  ["q11", ["A", "B"], "whitelabel", "Você indicou que ter sua marca e identidade visual na plataforma é uma prioridade importante."],
  ["q13", ["C"], "whitelabel", "Seu momento profissional busca entregar uma experiência com a identidade da sua própria consultoria."],
  ["q12", ["D"], "whitelabel", "A personalização com a sua marca própria é o fator decisivo para a escolha da sua ferramenta."],
  ["q10", ["D"], "whitelabel", "Fortalecer a identidade e a autoridade da sua consultoria é o benefício que mais fará diferença agora."],
  ["q14", ["D"], "whitelabel", "Você valoriza poder fortalecer sua marca exclusiva com uma plataforma própria."],
  ["q7", ["C"], "whitelabel", "Você tem como foco o crescimento estratégico e o desenvolvimento da sua marca."],

  // Pro
  ["q13", ["B"], "pro", "Você busca mais recursos avançados para organizar, acompanhar e acelerar o desenvolvimento do seu trabalho."],
  ["q10", ["B", "C"], "pro", "Ter recursos completos e organização robusta do atendimento aos alunos é sua maior prioridade."],
  ["q12", ["B", "C"], "pro", "Você valoriza recursos que facilitem a rotina diária e permitam ampliar a estrutura dos seus serviços."],
  ["q14", ["B"], "pro", "O que mais importa para você é contar com recursos que atendam a todas as necessidades do seu trabalho."],
  ["q7", ["B"], "pro", "Você quer praticidade para escalar sua consultoria e atender mais alunos com qualidade."],
  ["q11", ["D"], "pro", "Neste momento, você prefere priorizar os recursos de prescrição e acompanhamento técnico."],

  // Start
  ["q13", ["A"], "start", "Você busca começar com o essencial e evoluir sua consultoria aos poucos, com segurança."],
  ["q12", ["A"], "start", "Preço acessível e pagamento que caiba perfeitamente no seu orçamento são seus critérios principais."],
  ["q10", ["A"], "start", "Prescrever treinos com máxima agilidade e praticidade é o benefício que você mais necessita."],
  ["q14", ["A"], "start", "Para você, a ferramenta precisa antes de tudo tornar a prescrição do dia a dia mais prática."],
  ["q7", ["A", "E"], "start", "Você busca simplicidade para focar na atenção aos seus primeiros alunos e no seu equilíbrio."],
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

  // Empates ou proximidades: Q13 tem o maior peso declarativo sobre o momento profissional
  if (answers["q13"] === "C") return "whitelabel";
  if (answers["q13"] === "B") return "pro";
  if (answers["q13"] === "A") return "start";

  // Q11 (importância da identidade visual)
  if (answers["q11"] === "A" || answers["q11"] === "B") return "whitelabel";

  // Q12 (critério de decisão)
  if (answers["q12"] === "D") return "whitelabel";
  if (answers["q12"] === "A") return "start";
  if (answers["q12"] === "B" || answers["q12"] === "C") return "pro";

  // Default para caso não haja preferência explícita
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

  const q14 = QUESTIONS[13]?.options.find((op) => op.id === answers["q14"])?.text ?? "";
  const copy = RESULT_COPY[product];

  return {
    recommendedProduct: product,
    startScore: start,
    proScore: pro,
    whitelabelScore: whitelabel,
    personalizedScore: whitelabel,
    mensalScore: Math.max(start, pro),
    primaryMotivation: q14,
    resultTitle: copy.title,
    resultBadge: copy.badge,
    resultDescription: copy.description,
    resultBenefits: copy.benefits,
    resultReasons: reasons,
    recommendedProductSummary: PRODUCTS[product].description,
  };
}
