import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, Cpu } from "lucide-react";

interface Props {
  onFinish: () => void;
  durationMs?: number;
}

const STEPS = [
  "Cruzando tamanho da carteira e modelo de atendimento...",
  "Analisando gargalos de prescrição e tempo operacional...",
  "Definindo diagnóstico e a melhor rota para sua consultoria...",
];

export function QuizAnalyzing({ onFinish, durationMs = 3500 }: Props) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(Math.round((elapsed / durationMs) * 100), 100);
      setProgress(pct);

      if (elapsed < durationMs * 0.35) {
        setStepIndex(0);
      } else if (elapsed < durationMs * 0.72) {
        setStepIndex(1);
      } else {
        setStepIndex(2);
      }

      if (elapsed >= durationMs) {
        clearInterval(interval);
        onFinish();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [durationMs, onFinish]);

  return (
    <section
      className="mx-auto flex min-h-[90dvh] w-full max-w-xl flex-col items-center justify-center px-4 py-12 text-center animate-fade-up"
      aria-live="polite"
    >
      {/* Indicador de processamento em radar */}
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <div className="absolute -inset-2 animate-pulse rounded-full border border-primary/40 bg-primary/5" />
        <div className="relative grid h-20 w-20 place-items-center rounded-2xl border border-primary/50 bg-card shadow-glow">
          <Cpu className="h-10 w-10 text-primary animate-pulse" />
        </div>
      </div>

      {/* Badge */}
      <div className="mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Inteligência de Diagnóstico
        </span>
      </div>

      {/* Headline exata do briefing */}
      <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
        Cruzando seus dados profissionais e gerando a versão recomendada...
      </h2>

      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        Avaliando suas respostas para direcionar a oferta ideal ao momento da sua consultoria.
      </p>

      {/* Barra de progresso dinâmica */}
      <div className="mt-8 w-full max-w-md">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="text-foreground transition-all duration-300">
            {STEPS[stepIndex]}
          </span>
          <span className="font-mono text-primary font-bold">{progress}%</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-75 shadow-glow"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Selo discreto de segurança */}
      <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <span>Seus dados são protegidos e confidenciais</span>
      </div>
    </section>
  );
}
