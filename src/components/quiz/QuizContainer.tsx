import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { QUESTIONS, QUIZ_STAGES, progressFor, type Answers, type QuizOption } from "@/quiz/questions";
import { track } from "@/quiz/analytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ADVANCE_DELAY = 450;

export function QuizProgress({ index, total }: { index: number; total: number }) {
  const pct = progressFor(index, total);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>Pergunta <span className="text-foreground">{index + 1}</span> de {total}</span>
        <span className="text-primary">{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso do questionário">
        <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function AnswerOption({ option, selected, onSelect, disabled }: { option: QuizOption; selected: boolean; onSelect: () => void; disabled: boolean }) {
  return (
    <button type="button" role="radio" aria-checked={selected} disabled={disabled} onClick={onSelect}
      className={cn(
        "flex w-full min-h-14 items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-[15px] font-medium transition-all duration-200 sm:text-base",
        selected ? "border-primary bg-accent text-foreground" : "border-border bg-card hover:border-primary/60",
      )}>
      <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-sm font-bold transition-colors duration-200",
        selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground")}>
        {selected ? <Check className="h-4 w-4" aria-hidden /> : option.id}
      </span>
      <span className="min-w-0 flex-1">{option.text}</span>
    </button>
  );
}

export function QuizTransition({ text, onNext }: { text: string; onNext: () => void }) {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center px-2 text-center animate-fade-up" aria-live="polite">
      <div>
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-primary" />
        <p className="text-2xl font-bold leading-snug sm:text-3xl">{text}</p>
      </div>
      <Button type="button" size="lg" onClick={onNext} className="mt-10 w-full max-w-xs gap-2">
        Próximo
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Button>
    </div>
  );
}

interface Props {
  index: number; answers: Answers;
  onAnswer: (a: Answers) => void; onIndex: (i: number) => void; onComplete: (a: Answers) => void;
}

export function QuizContainer({ index, answers, onAnswer, onIndex, onComplete }: Props) {
  const [transition, setTransition] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
    };
  }, []);
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  const q = QUESTIONS[index];
  const total = QUESTIONS.length;
  if (!q) return null;

  const select = (optId: string) => {
    if (locked) return;
    const next = { ...answers, [q.id]: optId };
    onAnswer(next);
    setLocked(true);
    track("quiz_question_answered", { question: q.id, step: index + 1 });
    later(() => {
      if (index === total - 1) { track("quiz_completed", { total }); onComplete(next); return; }
      const nq = QUESTIONS[index + 1];
      if (nq?.transitionBefore && !answers[nq.id]) { setTransition(nq.transitionBefore); return; }
      onIndex(index + 1);
      setLocked(false);
    }, ADVANCE_DELAY);
  };

  /** Segue para a próxima pergunta a partir da frase de transição. */
  const continueFromTransition = () => {
    if (!transition) return;
    setTransition(null);
    onIndex(index + 1);
    setLocked(false);
  };

  const back = () => {
    if (transition) { setTransition(null); setLocked(false); return; }
    if (index > 0 && !locked) onIndex(index - 1);
  };

  return (
    <section className="mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col px-4 pb-8 pt-5 sm:justify-center sm:py-12">
      <div className="mb-6 flex items-center gap-3">
        <button type="button" onClick={back} aria-label={transition ? "Voltar para a pergunta respondida" : "Voltar para a pergunta anterior"}
          className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground", index === 0 && "invisible")}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1"><QuizProgress index={index} total={total} /></div>
      </div>
      {transition ? <QuizTransition text={transition} onNext={continueFromTransition} /> : (
        <div key={q.id} className="rounded-2xl border border-border bg-background-2/80 p-5 shadow-card animate-fade-up sm:p-8">
          <p className="mb-4 text-xs font-semibold text-muted-foreground">Etapa {q.stage} de {QUIZ_STAGES.length} · {QUIZ_STAGES[q.stage - 1]}</p>
          <h2 className="text-xl font-bold leading-snug sm:text-2xl">{q.text}</h2>
          <div role="radiogroup" aria-label={q.text} className="mt-6 flex flex-col gap-3">
            {q.options.map((op) => (
              <AnswerOption key={op.id} option={op} selected={answers[q.id] === op.id} disabled={locked} onSelect={() => select(op.id)} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
