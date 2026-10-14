import { useEffect, useRef, useState } from "react";
import { ArrowDown, Check, Lightbulb, PlayCircle, Dumbbell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateRecommendation, type Answers } from "@/quiz/questions";
import { PRODUCTS } from "@/quiz/config";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { WhatsAppSuccess } from "./WhatsAppSuccess";

export function QuizResult({ answers }: { answers: Answers }) {
  const rec = calculateRecommendation(answers);
  const [leadId, setLeadId] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (leadId) window.scrollTo({ top: 0 }); }, [leadId]);

  if (leadId) return <WhatsAppSuccess leadId={leadId} />;

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:py-16 animate-fade-up">
      <p className="text-center text-[11px] font-bold text-primary sm:text-xs">SEU RESULTADO · {PRODUCTS[rec.recommendedProduct].name.toUpperCase()}</p>
      <h1 className="mt-4 text-center text-2xl font-extrabold leading-tight sm:text-3xl">{rec.resultTitle}</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
        {rec.resultDescription.map((p) => <p key={p}>{p}</p>)}
      </div>

      <ul className="mt-6 space-y-3">
        {rec.resultBenefits.map((b) => (
          <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-[15px]">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{b}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl border-l-4 border-primary bg-card px-4 py-4">
        <p className="flex items-center gap-2 text-sm font-bold"><Lightbulb className="h-4 w-4 text-primary" /> Por que recomendamos essa versão?</p>
        <ul className="mt-3 space-y-2 text-[15px] text-muted-foreground">
          {rec.resultReasons.map((r) => <li key={r}>• {r}</li>)}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">Sugestão baseada nas suas respostas — não é uma avaliação definitiva.</p>
      </div>

      <div className="mt-12 rounded-2xl border-2 border-primary/60 bg-card p-6 shadow-glow sm:p-8">
        <h2 className="text-2xl font-extrabold leading-tight">Agora, imagine experimentar o Treino Inteligente na prática.</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">Entre para a lista de espera do grupo VIP e tenha a oportunidade de testar o Treino Inteligente durante 7 dias, conhecendo na prática seus recursos e a experiência personalizada da plataforma.</p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">Durante o teste, você poderá conhecer o Treino Inteligente completo, incluindo a possibilidade de visualizar sua própria logo, suas cores e a identidade da sua consultoria na plataforma personalizada.</p>
        <ul className="mt-5 space-y-3 text-[15px]">
          {[[PlayCircle, "Conhecer a ferramenta na prática."], [Dumbbell, "Explorar os recursos de prescrição de treinos."], [Palette, "Descobrir como funciona a experiência com personalização."]].map(([Icon, t]) => {
            const I = Icon as typeof Check;
            return <li key={t as string} className="flex items-center gap-3"><I className="h-5 w-5 shrink-0 text-primary" aria-hidden />{t as string}</li>;
          })}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">O teste é disponibilizado conforme as condições da campanha.</p>
        <Button type="button" className="mt-6 w-full" onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
          QUERO ENTRAR NA LISTA DE ESPERA <ArrowDown className="h-5 w-5" aria-hidden />
        </Button>
      </div>

      <div ref={formRef} className="scroll-mt-6 pt-12">
        <LeadCaptureForm answers={answers} onSaved={setLeadId} />
      </div>
    </section>
  );
}
