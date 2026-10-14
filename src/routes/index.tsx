import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { QuizIntro } from "@/components/quiz/QuizIntro";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { QuizResult } from "@/components/quiz/QuizResult";
import { calculateRecommendation, isComplete, QUESTIONS, type Answers } from "@/quiz/questions";
import { track } from "@/quiz/analytics";
import { captureUtm } from "@/quiz/utm";

const TITLE = "Qual versão do Treino Inteligente combina com você? | Diagnóstico";
const DESC = "Responda 14 perguntas rápidas e descubra qual versão do Treino Inteligente faz mais sentido para sua rotina como personal trainer.";

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

type Stage = "landing" | "quiz" | "processing" | "result";
const KEY = "ti_quiz_progress_v2"; // invalida versões anteriores e persiste apenas respostas válidas

function Index() {
  const [stage, setStage] = useState<Stage>("landing");
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    captureUtm();
    track("quiz_landing_view");
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) ?? "null") as { stage: Stage; answers: Answers; index: number } | null;
      if (saved && typeof saved === "object" && saved.answers && saved.stage !== "landing") {
        setAnswers(saved.answers);
        setIndex(Math.min(Math.max(saved.index ?? 0, 0), QUESTIONS.length - 1));
        setStage(saved.stage === "result" && isComplete(saved.answers) ? "result" : "quiz");
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      if (stage !== "landing") {
        sessionStorage.setItem(KEY, JSON.stringify({ stage: stage === "processing" ? "result" : stage, answers, index }));
      }
    } catch { /* ignore */ }
  }, [stage, answers, index]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage]);

  useEffect(() => {
    if (stage !== "processing") return;
    const rec = calculateRecommendation(answers);
    track("recommendation_generated", { product: rec.recommendedProduct });
    const t = window.setTimeout(() => setStage("result"), 1600);
    return () => clearTimeout(t);
  }, [stage, answers]);

  return (
    <main>
      {stage === "landing" && <QuizIntro onStart={() => { track("quiz_start"); setStage("quiz"); }} />}
      {stage === "quiz" && (
        <QuizContainer index={index} answers={answers} onAnswer={setAnswers} onIndex={setIndex}
          onComplete={(a) => { setAnswers(a); setStage("processing"); }} />
      )}
      {stage === "processing" && (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 px-6 text-center" aria-live="polite">
          <LoaderCircle className="h-10 w-10 animate-spin text-primary" aria-hidden />
          <p className="text-xl font-bold">Analisando suas respostas...</p>
          <p className="text-sm text-muted-foreground">Estamos identificando a versão que mais combina com você.</p>
        </div>
      )}
      {stage === "result" && <QuizResult answers={answers} />}
    </main>
  );
}
