import { ArrowRight, Clock3, Check, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import trainerImage from "@/assets/trainer-platform.jpg";

export function LandingHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="landing-page">
      <header className="landing-header mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <p className="text-lg font-extrabold">treino<span className="text-primary">.</span><span className="ml-1 font-medium">inteligente</span></p>
        <span className="hidden text-xs text-muted-foreground sm:block">PARA PERSONAL TRAINERS</span>
      </header>
      <section className="landing-hero relative isolate overflow-hidden">
        <img src={trainerImage} alt="Aluna consultando seu celular após o treino na academia" width={1536} height={1024} fetchPriority="high" className="hero-photo absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
          <div className="hero-copy max-w-[620px] animate-fade-up">
            <p className="mb-7 flex items-center gap-3 text-xs font-semibold text-primary"><span className="h-px w-8 bg-primary" /> SUA CONSULTORIA. SUA IDENTIDADE.</p>
            <h1 className="text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-[56px]">E se seus alunos treinassem em uma plataforma <span className="text-primary">com a sua marca?</span></h1>
            <p className="mt-7 max-w-lg text-base leading-[1.8] text-hero-muted sm:text-lg">Imagine seus alunos acessando os treinos em uma plataforma com sua logo, suas cores e a identidade da sua consultoria. Responda algumas perguntas rápidas e descubra essa possibilidade.</p>
            <Button type="button" onClick={onStart} className="mt-9 w-full sm:w-auto">Quero descobrir <ArrowRight className="h-5 w-5" aria-hidden /></Button>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-hero-muted"><span className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" /> Cerca de 3 minutos</span><span className="flex items-center gap-2"><Check className="h-3.5 w-3.5" /> Gratuito e sem compromisso</span></p>
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-background-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-9 sm:grid-cols-3 sm:px-10 sm:py-12">
          {[['01', 'Sua marca em evidência', 'Sua logo, suas cores, sua identidade.'], ['02', 'Uma experiência profissional', 'Seus alunos conectados à sua consultoria.'], ['03', 'Mais praticidade na rotina', 'Uma nova possibilidade para seus treinos.']].map(([number, title, text]) => <div key={number} className="flex gap-4"><span className="pt-1 text-xs text-primary">{number}</span><div><h2 className="flex items-center gap-3 text-sm font-bold">{title}<MoveUpRight className="h-3.5 w-3.5 text-muted-foreground" /></h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div></div>)}
        </div>
      </section>
    </div>
  );
}
