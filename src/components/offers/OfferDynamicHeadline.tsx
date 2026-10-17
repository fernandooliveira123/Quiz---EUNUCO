import { useEffect, useState } from "react";
import { Crown, Sparkles, Target, Zap, Clock, ShieldCheck } from "lucide-react";
import type { Answers } from "@/quiz/questions";

interface Props {
  plan: "pro" | "start";
  answersOverride?: Answers;
}

interface DynamicCopy {
  badge: string;
  badgeIcon: typeof Crown;
  h1Highlight: string;
  h1Prefix: string;
  h1Suffix: string;
  subheadline: string;
}

export function OfferDynamicHeadline({ plan, answersOverride }: Props) {
  const [answers, setAnswers] = useState<Answers>(answersOverride ?? {});

  useEffect(() => {
    if (answersOverride && Object.keys(answersOverride).length > 0) {
      setAnswers(answersOverride);
      return;
    }

    try {
      const saved = JSON.parse(sessionStorage.getItem("ti_quiz_progress_v3") ?? "null") as {
        answers?: Answers;
      } | null;
      if (saved?.answers) {
        setAnswers(saved.answers);
      }
    } catch {
      /* fallback */
    }
  }, [answersOverride]);

  const copy = getDynamicCopy(plan, answers);

  return (
    <div className="text-center animate-fade-up max-w-4xl mx-auto">
      {/* Selo Dinâmico de Diagnóstico */}
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm">
        <copy.badgeIcon className="h-4 w-4 shrink-0 text-primary animate-pulse" />
        <span>{copy.badge}</span>
      </div>

      {/* H1 Principal com Destaque */}
      <h1 className="mt-5 text-3xl font-extrabold leading-[1.2] sm:text-4xl lg:text-5xl text-foreground">
        {copy.h1Prefix}{" "}
        <span className="text-primary underline decoration-primary/40 underline-offset-4 decoration-2">
          {copy.h1Highlight}
        </span>{" "}
        {copy.h1Suffix}
      </h1>

      {/* Subheadline persuasiva */}
      <p className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground leading-relaxed sm:text-lg">
        {copy.subheadline}
      </p>
    </div>
  );
}

function getDynamicCopy(plan: "pro" | "start", answers: Answers): DynamicCopy {
  const q1 = answers["q1"] ?? ""; // Alunos: A (0), B (1-9), C (10-30), D (30+)
  const q2 = answers["q2"] ?? ""; // Entrega: A (planilhas), B (WhatsApp), C (app concorrente), D (disperso)
  const q7 = answers["q7"] ?? ""; // Tempo: A (<=3m), B (4-10m), C (11-20m), D (>20m)
  const q13 = answers["q13"] ?? ""; // Marca: C (White Label)
  const q14 = answers["q14"] ?? ""; // Dor concorrente: A (concorrente não tem), B (limitações)

  if (plan === "pro") {
    // 1. Dor com concorrentes / desejo de marca própria
    if (q14 === "A" || q14 === "B" || q13 === "C") {
      return {
        badge: "Diagnóstico: Personal com Carteira Ativa · Frustração com Apps Concorrentes",
        badgeIcon: Crown,
        h1Prefix: "Pare de fazer propaganda para o aplicativo dos outros: tenha o seu",
        h1Highlight: "próprio aplicativo com a sua marca",
        h1Suffix: "para proteger sua margem e cobrar mais caro.",
        subheadline:
          "Seus alunos devem associar a qualidade do treino à sua consultoria, não a uma plataforma de terceiros. Com o Treino Inteligente Anual, você coloca seu logotipo e suas cores no bolso do aluno e prescreve fichas completas em até 3 minutos.",
      };
    }

    // 2. Gargalo crítico de tempo (>20 min ou 11-20 min)
    if (q7 === "D" || q7 === "C") {
      return {
        badge: "Diagnóstico: Carteira em Expansão · Gargalo Crítico de Prescrição",
        badgeIcon: Clock,
        h1Prefix: "Pare de perder mais de 10 horas semanais montando treinos: prescreva em até",
        h1Highlight: "3 minutos no seu próprio aplicativo",
        h1Suffix: "e dobre sua capacidade de atendimento.",
        subheadline:
          "Você atingiu o ponto onde o tempo virou o maior teto do seu faturamento. Com a tecnologia ágil do Treino Inteligente e sua marca própria, você escala sua consultoria sem passar noites de domingo digitando exercícios.",
      };
    }

    // 3. Carteira consolidada (10 a 30 ou 30+ alunos)
    if (q1 === "C" || q1 === "D") {
      const volumeText = q1 === "D" ? "mais de 30 alunos" : "10 a 30 alunos";
      return {
        badge: `Diagnóstico: Carteira de ${volumeText} · Consultoria Consolidada`,
        badgeIcon: Target,
        h1Prefix: "Sua consultoria atingiu o nível onde você precisa do seu",
        h1Highlight: "próprio aplicativo",
        h1Suffix: "para proteger sua margem e cobrar até R$ 300 por aluno.",
        subheadline:
          "Quem tem mais de 10 alunos não pode continuar com ferramentas genéricas ou métodos manuais. Posicione-se como uma consultoria de elite com aplicativo exclusivo e prescreva treinos em até 3 minutos.",
      };
    }

    // Default Pro
    return {
      badge: "Diagnóstico Oficial Treino Inteligente · Plano Anual com Sua Marca",
      badgeIcon: Crown,
      h1Prefix: "Sua consultoria atingiu o nível onde você precisa do seu",
      h1Highlight: "próprio aplicativo",
      h1Suffix: "para proteger sua margem e cobrar mais caro dos seus alunos.",
      subheadline:
        "Pare de promover marcas de terceiros que fazem seu trabalho parecer comum e desvalorizado. Tenha seu próprio aplicativo exclusivo com seu logotipo e prescreva treinos completos em até 3 minutos.",
    };
  }

  // PLANO START (LP2)
  // 1. Dor do WhatsApp
  if (q2 === "B") {
    return {
      badge: "Diagnóstico: Início de Consultoria · Fim do Caos do WhatsApp",
      badgeIcon: Zap,
      h1Prefix: "Chega de perder mensagens e treinos no WhatsApp: organize seus alunos em um",
      h1Highlight: "aplicativo profissional moderno",
      h1Suffix: "por menos de R$ 1,50 por dia.",
      subheadline:
        "Sua rotina não precisa ser um emaranhado de conversas perdidas e PDFs desformatados. Entregue um aplicativo de verdade para seus primeiros alunos pagando apenas R$ 44,90/mês, sem taxa de adesão e sem fidelidade.",
    };
  }

  // 2. Evolução de Métodos Manuais
  if (q2 === "A") {
    return {
      badge: "Diagnóstico: Evolução Digital · Organização Imediata",
      badgeIcon: ShieldCheck,
      h1Prefix: "Evolua para além dos métodos manuais no celular: prescreva treinos em até",
      h1Highlight: "3 minutos em um aplicativo moderno",
      h1Suffix: "sem compromisso de fidelidade.",
      subheadline:
        "Métodos manuais e anotações soltas consomem seu tempo e dificultam o acompanhamento. Comece a prescrever em um aplicativo fluido e profissional desde o primeiro aluno com investimento acessível.",
    };
  }

  // 3. Conquista dos primeiros alunos (0 a 9)
  if (q1 === "A" || q1 === "B") {
    return {
      badge: "Diagnóstico: Conquista de Carteira · Entrada Acessível",
      badgeIcon: Sparkles,
      h1Prefix: "A ferramenta ideal para você começar com",
      h1Highlight: "postura profissional desde o 1º aluno",
      h1Suffix: "e prescrever treinos em até 3 minutos.",
      subheadline:
        "Tudo o que você precisa para sair do amadorismo, encantar seus alunos e cobrar com segurança, com uma mensalidade que cabe no seu bolso e liberdade total para cancelar quando quiser.",
    };
  }

  // Default Start
  return {
    badge: "Diagnóstico Oficial Treino Inteligente · Entrada Essencial",
    badgeIcon: Zap,
    h1Prefix: "A solução ideal para você sair do improviso de mensagens e métodos manuais sem",
    h1Highlight: "comprometer seu orçamento",
    h1Suffix: "ou assumir contratos longos.",
    subheadline:
      "Comece a prescrever com agilidade em até 3 minutos, organize seus alunos em um aplicativo moderno e teste sem qualquer compromisso de fidelidade por apenas R$ 44,90/mês.",
  };
}
