import { ArrowRight, Clock3, Compass, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import trainerImage from "@/assets/trainer-platform.jpg";

const BENEFITS = [
  { icon: Target, text: "Entenda suas prioridades profissionais." },
  { icon: Compass, text: "Descubra qual versão combina com seu momento." },
  { icon: Sparkles, text: "Conheça uma nova possibilidade para sua rotina." },
];

export function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <p className="text-lg font-extrabold">treino<span className="text-primary">.</span><span className="ml-1 font-medium">inteligente</span></p>
        <span className="hidden text-xs text-muted-foreground sm:block">DIAGNÓSTICO PARA PERSONAL TRAINERS</span>
      </header>
      <section className="landing-hero relative isolate overflow-hidden">
        <img src={trainerImage} alt="Aluna consultando o treino no celular na academia" width={1536} height={1024} fetchPriority="high" className="hero-photo absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 sm:py-24">
          <div className="max-w-[620px] animate-fade-up">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold text-primary"><span className="h-px w-8 bg-primary" /> DIAGNÓSTICO GRATUITO · 16 PERGUNTAS</p>
            <h1 className="text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-[56px]">Qual versão do Treino Inteligente <span className="text-primary">combina com você?</span></h1>
            <p className="mt-6 max-w-lg text-base leading-[1.75] text-hero-muted sm:text-lg">Descubra qual solução faz mais sentido para sua rotina como personal trainer. Responda a 16 perguntas rápidas sobre seu trabalho, seus objetivos e o que você procura em uma plataforma de prescrição de treinos.</p>
            <ul className="mt-7 space-y-3">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-card/80 text-primary"><Icon className="h-4 w-4" aria-hidden /></span>{text}
                </li>
              ))}
            </ul>
            <Button type="button" onClick={onStart} className="mt-9 w-full sm:w-auto">DESCOBRIR MINHA VERSÃO IDEAL <ArrowRight className="h-5 w-5" aria-hidden /></Button>
            <p className="mt-4 flex items-center gap-2 text-xs text-hero-muted"><Clock3 className="h-3.5 w-3.5" /> Cerca de 3 minutos · sem cadastro para começar</p>
          </div>
        </div>
      </section>
    </div>
  );
}
