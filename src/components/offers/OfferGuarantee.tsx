import { ShieldCheck, RotateCcw } from "lucide-react";

export function OfferGuarantee() {
  return (
    <div className="rounded-2xl border border-primary/30 bg-card/80 p-6 sm:p-8 backdrop-blur shadow-glow">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
          <ShieldCheck className="h-9 w-9" />
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-primary">
            <RotateCcw className="h-3.5 w-3.5" /> Garantia Incondicional de 7 Dias
          </span>
          <h3 className="mt-1 text-xl font-bold sm:text-2xl">
            Risco absolutamente zero para a sua consultoria
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed sm:text-base">
            Entre na plataforma, personalize seu aplicativo, prescreva treinos em até 3 minutos e sinta o impacto nos seus alunos. Se por qualquer motivo você achar que a ferramenta não facilitou sua rotina profissional, basta nos enviar um e-mail em até 7 dias e devolveremos 100% do seu valor. Sem letras miúdas.
          </p>
        </div>
      </div>
    </div>
  );
}
