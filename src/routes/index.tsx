import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { QuizIntro } from "@/components/quiz/QuizIntro";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { LeadCaptureForm } from "@/components/quiz/LeadCaptureForm";
import { QuizAnalyzing } from "@/components/quiz/QuizAnalyzing";
import { QuizResult } from "@/components/quiz/QuizResult";
import {
  calculateRecommendation,
  decideOfferRoute,
  isComplete,
  QUESTIONS,
  type Answers,
} from "@/quiz/questions";
import { track } from "@/quiz/analytics";
import { captureUtm, readUtm } from "@/quiz/utm";
import { recordQuizCompletion } from "@/quiz/leads.functions";
import { supabase } from "@/integrations/supabase/client";

const TITLE = "Qual versão do Treino Inteligente combina com você? | Diagnóstico";
const DESC = "Responda 16 perguntas rápidas e descubra qual versão do Treino Inteligente faz mais sentido para sua rotina como personal trainer.";

function safeUUID(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* fallback */
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "landing" | "quiz" | "lead_capture" | "processing" | "result";
const KEY = "ti_quiz_progress_v3";

function Index() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("landing");
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [leadId, setLeadId] = useState<string>(() => {
    try {
      const stored = sessionStorage.getItem("ti_lead_id");
      if (stored && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(stored)) {
        return stored;
      }
      const gen = safeUUID();
      sessionStorage.setItem("ti_lead_id", gen);
      return gen;
    } catch {
      return safeUUID();
    }
  });
  const aiRouteRef = useRef<"/oferta-pro" | "/oferta-start" | null>(null);

  useEffect(() => {
    captureUtm();
    track("quiz_landing_view");
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) ?? "null") as {
        stage: Stage;
        answers: Answers;
        index: number;
      } | null;
      if (saved && typeof saved === "object" && saved.answers && saved.stage !== "landing") {
        setAnswers(saved.answers);
        setIndex(Math.min(Math.max(saved.index ?? 0, 0), QUESTIONS.length - 1));
        if (saved.stage === "lead_capture" && isComplete(saved.answers)) {
          setStage("lead_capture");
        } else if (saved.stage === "result" && isComplete(saved.answers)) {
          setStage("result");
        } else {
          setStage("quiz");
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (stage !== "landing") {
        sessionStorage.setItem(
          KEY,
          JSON.stringify({
            stage: stage === "processing" ? "lead_capture" : stage,
            answers,
            index,
          }),
        );
      }
    } catch {
      /* ignore */
    }
  }, [stage, answers, index]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage]);

  // Chamado assim que a 16ª pergunta for respondida no questionário
  const handleQuestionsComplete = (finalAnswers: Answers) => {
    setAnswers(finalAnswers);
    setStage("lead_capture");
    track("lead_form_view");
  };

  // Chamado quando o usuário preenche o nome, WhatsApp e e-mail e clica no botão
  const handleLeadSubmit = (
    savedId: string,
    leadInfo?: { fullName: string; email: string; phone: string },
  ) => {
    setLeadId(savedId);
    setStage("processing");

    const targetRoute = decideOfferRoute(answers);
    const rec = calculateRecommendation(answers);
    const utmData = readUtm();

    track("quiz_completed", {
      total: QUESTIONS.length,
      targetRoute,
      product: rec.recommendedProduct,
    });

    // 1. Salva diretamente no Supabase a partir do navegador (garantia instantânea)
    void Promise.resolve(
      supabase.from("quiz_leads").upsert(
        {
          id: savedId,
          answers,
          recommended_route: targetRoute,
          utm: {
            ...(utmData ?? {}),
            full_name: leadInfo?.fullName,
            email: leadInfo?.email,
            phone: leadInfo?.phone,
          },
        },
        { onConflict: "id" },
      ),
    )
      .then((res) => {
        if (res && "error" in res && res.error) {
          console.error("[quiz_leads client upsert error]", res.error.message);
        } else {
          console.log("[quiz_leads client upsert success]", savedId);
        }
      })
      .catch((err: unknown) => {
        console.error("[quiz_leads client catch]", err);
      });

    // 2. Salva payload com os dados de contato via serverFn e aciona o Agente IA no n8n
    recordQuizCompletion({
      data: {
        id: savedId,
        fullName: leadInfo?.fullName,
        email: leadInfo?.email,
        phone: leadInfo?.phone,
        answers,
        recommendedRoute: targetRoute,
        utm: utmData,
      },
    })
      .then((res) => {
        if (res && res.recommendedRoute) {
          aiRouteRef.current = res.recommendedRoute as "/oferta-pro" | "/oferta-start";
          console.log("[Rota validada pela IA no n8n]:", res.recommendedRoute);
        }
      })
      .catch((err: unknown) => {
        console.warn("Aviso ao registrar conclusão do quiz via serverFn:", err);
      });
  };

  const handleAnalyzingFinish = () => {
    // Redireciona para a rota decidida pela IA se já retornou, ou para a rota calculada como fallback seguro
    const targetRoute = aiRouteRef.current || decideOfferRoute(answers);
    const utms = readUtm();
    navigate({
      to: targetRoute,
      search: {
        lead_id: leadId,
        utm_source: utms.utm_source,
        utm_medium: utms.utm_medium,
        utm_campaign: utms.utm_campaign,
        utm_content: utms.utm_content,
        utm_term: utms.utm_term,
      },
    });
  };

  return (
    <main>
      {stage === "landing" && (
        <QuizIntro
          onStart={() => {
            const freshLeadId = safeUUID();
            setLeadId(freshLeadId);
            try {
              sessionStorage.setItem("ti_lead_id", freshLeadId);
              sessionStorage.removeItem(KEY);
            } catch {
              /* ignore */
            }
            track("quiz_start");
            setAnswers({});
            setIndex(0);
            setStage("quiz");
          }}
        />
      )}
      {stage === "quiz" && (
        <QuizContainer
          index={index}
          answers={answers}
          onAnswer={setAnswers}
          onIndex={setIndex}
          onComplete={handleQuestionsComplete}
        />
      )}
      {stage === "lead_capture" && (
        <section className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-14 animate-fade-up">
          <LeadCaptureForm
            answers={answers}
            onSaved={handleLeadSubmit}
            title="Seu diagnóstico exclusivo está pronto!"
            subtitle="Informe seu WhatsApp e E-mail para desbloquear a análise da sua consultoria e acessar as condições de teste grátis com R$ 0,00 no checkout."
            badgeText="Diagnóstico Concluído · Última Etapa"
            ctaText="VER MEU DIAGNÓSTICO E LIBERAR OFERTA"
          />
        </section>
      )}
      {stage === "processing" && (
        <QuizAnalyzing onFinish={handleAnalyzingFinish} durationMs={3500} />
      )}
      {stage === "result" && <QuizResult answers={answers} />}
    </main>
  );
}
