import { X, Check } from "lucide-react";

interface ComparisonItem {
  feature: string;
  traditional: string;
  treinoInteligente: string;
}

interface Props {
  title: string;
  subtitle: string;
  items: ComparisonItem[];
}

export function OfferComparisonTable({ title, subtitle, items }: Props) {
  return (
    <section className="my-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Lado Tradicional / Concorrentes */}
          <div className="p-6 sm:p-8 bg-background/50">
            <div className="flex items-center gap-2 mb-6 text-destructive font-bold text-sm uppercase tracking-wider">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-destructive/10">
                <X className="h-4 w-4" />
              </span>
              Como você trabalha hoje / Concorrentes
            </div>
            <ul className="space-y-4">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-[15px] text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/80" />
                  <div>
                    <span className="font-semibold text-foreground/80">{item.feature}:</span> {item.traditional}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Lado Treino Inteligente */}
          <div className="p-6 sm:p-8 bg-card relative">
            <div className="absolute top-0 right-0 rounded-bl-xl bg-primary/20 px-3 py-1 text-[11px] font-black uppercase text-primary border-b border-l border-primary/30">
              Vantagem Exclusiva
            </div>
            <div className="flex items-center gap-2 mb-6 text-primary font-bold text-sm uppercase tracking-wider">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/20">
                <Check className="h-4 w-4" />
              </span>
              Com o Treino Inteligente
            </div>
            <ul className="space-y-4">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-[15px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <span className="font-bold text-foreground">{item.feature}:</span>{" "}
                    <span className="text-foreground/90">{item.treinoInteligente}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
