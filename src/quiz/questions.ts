import { PRODUCTS } from "./config";

export type Product = "personalizado" | "mensal";

/** Pesos ajustáveis: pontos somados a cada produto. */
export interface Weights { p?: number; m?: number }

export interface QuizOption { id: string; text: string; weights?: Weights | undefined }

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
  { id: "q1", stage: 1, text: "Como você trabalha atualmente como personal trainer?", options: [
    o("A", "Atendo presencialmente."),
    o("B", "Trabalho com consultoria online."),
    o("C", "Atendo presencialmente e online."),
    o("D", "Estou começando a conquistar meus alunos."),
  ] },
  { id: "q2", stage: 1, text: "Quantos alunos você atende atualmente?", options: [
    o("A", "Até 10 alunos."),
    o("B", "De 11 a 20 alunos."),
    o("C", "De 21 a 40 alunos."),
    o("D", "Mais de 40 alunos."),
  ] },
  { id: "q3", stage: 1, text: "Como você organiza e entrega os treinos hoje?", options: [
    o("A", "Planilhas ou PDFs."),
    o("B", "WhatsApp e mensagens."),
    o("C", "Um aplicativo de prescrição."),
    o("D", "Uso ferramentas diferentes, dependendo do aluno."),
  ] },
  { id: "q4", stage: 2, transitionBefore: "Agora vamos identificar as dificuldades e oportunidades da sua rotina.",
    text: "Qual atividade mais consome seu tempo durante a semana?", options: [
    o("A", "Montar e atualizar treinos."),
    o("B", "Organizar informações dos alunos."),
    o("C", "Responder mensagens e acompanhar alunos."),
    o("D", "Administrar minha consultoria."),
    o("E", "Divulgar meu trabalho e conquistar alunos."),
  ] },
  { id: "q5", stage: 2, text: "Quando sua rotina fica corrida, o que costuma ser mais difícil manter em dia?", options: [
    o("A", "A atualização dos treinos."),
    o("B", "A organização das informações dos alunos."),
    o("C", "O acompanhamento e a comunicação."),
    o("D", "O planejamento da consultoria."),
    o("E", "Consigo manter tudo em dia, mas quero trabalhar com mais praticidade."),
  ] },
  { id: "q6", stage: 3, transitionBefore: "Vamos imaginar uma rotina mais prática e a experiência que você quer oferecer aos alunos.",
    text: "O que você mais gostaria de melhorar no seu processo de prescrição?", options: [
    o("A", "Criar e atualizar treinos com mais agilidade."),
    o("B", "Deixar os treinos mais organizados."),
    o("C", "Facilitar o acesso dos alunos aos treinos."),
    o("D", "Reunir minha rotina em uma ferramenta mais prática."),
    o("E", "Melhorar a apresentação profissional do meu serviço."),
  ] },
  { id: "q7", stage: 3, text: "Se você ganhasse mais praticidade na prescrição, onde gostaria de usar esse tempo?", options: [
    o("A", "Dar mais atenção aos meus alunos.", { m: 3 }),
    o("B", "Atender mais alunos.", { m: 2 }),
    o("C", "Desenvolver minha consultoria.", { p: 5 }),
    o("D", "Estudar e me especializar.", { p: 3, m: 2 }),
    o("E", "Ter mais equilíbrio entre trabalho e vida pessoal."),
  ] },
  { id: "q8", stage: 3, text: "O que você considera mais importante na experiência que entrega aos seus alunos?", options: [
    o("A", "Treinos organizados e fáceis de consultar."),
    o("B", "Acompanhamento próximo e individualizado."),
    o("C", "Uma experiência prática e moderna."),
    o("D", "Uma apresentação profissional do meu serviço."),
    o("E", "Uma combinação desses aspectos."),
  ] },
  { id: "q9", stage: 3, text: "Como você gostaria que sua consultoria fosse percebida pelos alunos?", options: [
    o("A", "Profissional e organizada.", { p: 1, m: 1 }),
    o("B", "Personalizada e próxima.", { p: 2 }),
    o("C", "Moderna e prática.", { p: 3 }),
    o("D", "Diferenciada em relação a outras opções.", { p: 1, m: 1 }),
    o("E", "Ainda estou definindo esse posicionamento.", { p: 2, m: 1 }),
  ] },
  { id: "q10", stage: 4, transitionBefore: "Para finalizar, vamos entender suas prioridades e o que faz sentido para sua consultoria.",
    text: "Qual benefício faria mais diferença na sua rotina neste momento?", options: [
    o("A", "Prescrever treinos com mais praticidade.", { p: 5 }),
    o("B", "Organizar melhor o atendimento aos alunos.", { p: 4 }),
    o("C", "Ter mais recursos para apoiar meu trabalho.", { p: 1, m: 2 }),
    o("D", "Fortalecer a identidade da minha consultoria.", { m: 4 }),
    o("E", "Conhecer uma solução que reúna vários desses benefícios.", { p: 1, m: 1 }),
  ] },
  { id: "q11", stage: 4, text: "Qual importância teria para você oferecer os treinos em uma plataforma com a identidade visual da sua consultoria?", options: [
    o("A", "É uma prioridade para mim.", { p: 5 }),
    o("B", "Seria um diferencial importante.", { p: 3 }),
    o("C", "Tenho curiosidade, mas não é prioridade agora.", { p: 1, m: 2 }),
    o("D", "Prefiro priorizar os recursos de prescrição.", { m: 4 }),
    o("E", "Ainda preciso entender melhor essa possibilidade."),
  ] },
  { id: "q12", stage: 4, text: "Ao escolher uma ferramenta para sua consultoria, o que mais pesa na decisão?", options: [
    o("A", "Preço acessível e pagamento que caiba no orçamento.", { m: 5 }),
    o("B", "Recursos que facilitem minha rotina.", { p: 5 }),
    o("C", "Possibilidade de ampliar a estrutura do meu serviço.", { p: 1, m: 1 }),
    o("D", "Personalização com a minha própria marca."),
    o("E", "Equilíbrio entre recursos, investimento e praticidade."),
  ] },
  { id: "q13", stage: 4, text: "Qual frase mais representa o seu momento profissional?", options: [
    o("A", "Quero começar com o essencial e evoluir aos poucos.", { m: 6 }),
    o("B", "Quero mais recursos para organizar e desenvolver meu trabalho.", { p: 6 }),
    o("C", "Quero oferecer uma experiência com a identidade da minha própria marca.", { p: 1, m: 1 }),
    o("D", "Quero comparar as possibilidades antes de decidir.", { p: 2, m: 1 }),
    o("E", "Ainda estou entendendo o que preciso."),
  ] },
  { id: "q14", stage: 4, text: "Depois de conhecer uma plataforma de prescrição, o que você precisaria ver para considerar que ela vale a pena?", options: [
    o("A", "Que ela torne minha rotina mais prática.", { m: 3 }),
    o("B", "Que os recursos atendam às necessidades do meu trabalho.", { p: 4 }),
    o("C", "Que a experiência dos alunos seja organizada.", { p: 1, m: 1 }),
    o("D", "Que eu possa fortalecer minha marca com uma plataforma própria.", { m: 2 }),
    o("E", "Que o investimento faça sentido para os benefícios oferecidos.", { p: 1, m: 1 }),
  ] },
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
  personalizedScore: number;
  mensalScore: number;
  primaryMotivation: string;
  resultTitle: string;
  resultDescription: string[];
  resultBenefits: string[];
  resultReasons: string[];
  price: string;
}

const RESULT_COPY: Record<Product, { title: string; description: string[]; benefits: string[] }> = {
  personalizado: {
    title: "A versão que mais combina com seus objetivos é o Treino Inteligente Personalizado.",
    description: [
      "Pelas suas respostas, fortalecer sua identidade profissional e oferecer uma experiência alinhada à sua marca são aspectos importantes para você.",
      "O Treino Inteligente Personalizado permite utilizar sua logo e suas cores na plataforma, levando a identidade da sua consultoria para a experiência de acesso aos treinos.",
    ],
    benefits: ["Plataforma com identidade visual própria.", "Sua logo e suas cores presentes na experiência.", "Uma solução alinhada à construção da sua marca profissional."],
  },
  mensal: {
    title: "A versão que mais combina com suas prioridades é o Treino Inteligente Mensal.",
    description: [
      "Pelas suas respostas, você valoriza principalmente a praticidade e prefere um modelo de investimento mensal.",
      "O Treino Inteligente Mensal oferece acesso à plataforma padrão de prescrição de treinos, sendo uma alternativa para apoiar sua rotina profissional sem o investimento inicial da versão personalizada.",
    ],
    benefits: ["Modelo de pagamento mensal.", "Acesso à plataforma padrão de prescrição.", "Uma alternativa para organizar sua rotina profissional."],
  },
};

/** Motivos ligados a respostas reais: [pergunta, alternativas, produto, texto]. */
const REASONS: [string, string[], Product, string][] = [
  ["q13", ["B"], "personalizado", "Você indicou preferência pela plataforma personalizada com sua logo e suas cores."],
  ["q13", ["A"], "mensal", "Você indicou preferência pela plataforma padrão com pagamento mensal."],
  ["q12", ["B"], "personalizado", "Você prefere investir inicialmente em uma plataforma personalizada."],
  ["q12", ["A"], "mensal", "Você prefere o pagamento mensal, começando com um valor menor."],
  ["q10", ["A", "B"], "personalizado", "Você considera a identidade visual própria importante para sua consultoria."],
  ["q10", ["D"], "mensal", "Neste momento, você valoriza mais a praticidade da ferramenta."],
  ["q11", ["A", "B"], "personalizado", "Você demonstrou interesse em ter sua marca presente na plataforma dos alunos."],
  ["q11", ["C", "D"], "mensal", "A personalização não é sua principal prioridade neste momento."],
  ["q7", ["C", "D"], "personalizado", "Você valoriza unir a ferramenta à identidade da sua marca."],
  ["q7", ["A", "B"], "mensal", "Você prioriza a praticidade e a organização da rotina."],
  ["q9", ["B", "C"], "personalizado", "Você quer que sua consultoria seja percebida como uma experiência diferenciada."],
  ["q14", ["B"], "personalizado", "Você quer ver primeiro como sua marca ficaria na plataforma."],
  ["q14", ["A", "D"], "mensal", "Você quer avaliar primeiro como a ferramenta facilita sua rotina."],
];

function scoreOf(answers: Answers) {
  let p = 0, m = 0;
  for (const q of QUESTIONS) {
    const w = q.options.find((op) => op.id === answers[q.id])?.weights;
    p += w?.p ?? 0; m += w?.m ?? 0;
  }
  return { p, m };
}

function decide(answers: Answers, p: number, m: number): Product {
  if (p > m) return "personalizado";
  if (m > p) return "mensal";
  if (answers["q13"] === "A") return "mensal";
  if (answers["q13"] === "B") return "personalizado";
  if (answers["q12"] === "A") return "mensal";
  if (answers["q12"] === "B") return "personalizado";
  if (["A", "B"].includes(answers["q10"] ?? "")) return "personalizado";
  if (["C", "D"].includes(answers["q10"] ?? "")) return "mensal";
  // Sem preferência clara: segue a prioridade declarada na pergunta 7.
  return ["A", "B"].includes(answers["q7"] ?? "") ? "mensal" : "personalizado";
}

export function calculateRecommendation(answers: Answers): Recommendation {
  const { p, m } = scoreOf(answers);
  const product = decide(answers, p, m);
  const reasons = REASONS.filter(([q, ids, prod]) => prod === product && ids.includes(answers[q] ?? ""))
    .map(([, , , text]) => text).filter((t, i, a) => a.indexOf(t) === i).slice(0, 3);
  if (reasons.length === 0) reasons.push("Esta é uma sugestão baseada no conjunto das suas respostas, já que você ainda está avaliando as opções.");
  const q14 = QUESTIONS[13]?.options.find((op) => op.id === answers["q14"])?.text ?? "";
  const copy = RESULT_COPY[product];
  return {
    recommendedProduct: product, personalizedScore: p, mensalScore: m, primaryMotivation: q14,
    resultTitle: copy.title, resultDescription: copy.description, resultBenefits: copy.benefits,
    resultReasons: reasons, price: PRODUCTS[product].price,
  };
}
