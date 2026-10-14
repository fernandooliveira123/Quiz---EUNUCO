import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Crown,
  ExternalLink,
  Lightbulb,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateRecommendation, type Answers, type Product } from "@/quiz/questions";
import { PRODUCTS, OFFERS_LP_URL, isOffersLpConfigured } from "@/quiz/config";
import { buildUrlWithUtm } from "@/quiz/utm";
import { track } from "@/quiz/analytics";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { WhatsAppSuccess } from "./WhatsAppSuccess";

export function QuizResult({ answers }: { answers: Answers }) {
  const rec = calculateRecommendation(answers);
  const [leadId, setLeadId] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leadId) window.scrollTo({ top: 0 });
  }, [leadId]);

  const lpUrl = buildUrlWithUtm(OFFERS_LP_URL);

  const handleLpClick = (productChosen?: string) => {
    track("whatsapp_cta_click"); // compatibilidade de evento
    if (productChosen) {
      track("recommendation_generated", { product: productChosen });
    }
  };

  if (leadId) return <WhatsAppSuccess leadId={leadId} />;

  const offersList: Array<{
    id: Product;
    name: string;
    badge: string;
    tagline: string;
    features: string[];
    icon: typeof Zap;
  }> = [
    {
      id: "start",
      name: PRODUCTS.start.name,
      badge: PRODUCTS.start.badge,
      tagline: PRODUCTS.start.headline,
      icon: Zap,
      features: [
        "Prescrição ágil e prática para o dia a dia",
        "Organização centralizada dos treinos dos alunos",
        "Menor investimento mensal para começar com segurança",
      ],
    },
    {
      id: "pro",
      name: PRODUCTS.pro.name,
      badge: PRODUCTS.pro.badge,
      tagline: PRODUCTS.pro.headline,
      icon: Sparkles,
      features: [
        "Recursos completos de prescrição e acompanhamento avançado",
        "Maior agilidade para gerenciar e escalar sua base de alunos",
        "Modelo de mensalidade flexível com máxima produtividade",
      ],
    },
    {
      id: "whitelabel",
      name: PRODUCTS.whitelabel.name,
      badge: PRODUCTS.whitelabel.badge,
      tagline: PRODUCTS.whitelabel.headline,
      icon: Crown,
      features: [
        "Plataforma personalizada com sua logo e as cores da sua marca",
        "Experiência exclusiva para os alunos sem marcas de terceiros",
        "Todos os recursos liberados com o melhor valor no plano anual",
      ],
    },
  ];

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16 animate-fade-up">
      {/* Badge de recomendação */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> {rec.resultBadge}
        </span>
      </div>

      {/* Título Principal */}
      <h1 className="mt-4 text-center text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
        {rec.resultTitle}
      </h1>

      {/* Descrição contextual */}
      <div className="mt-6 space-y-4 text-center text-[15px] leading-relaxed text-muted-foreground sm:text-base">
        {rec.resultDescription.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {/* Benefícios da recomendação */}
      <ul className="mt-7 space-y-3">
        {rec.resultBenefits.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-[15px] sm:text-base shadow-sm"
          >
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Motivos baseados nas respostas */}
      <div className="mt-8 rounded-2xl border-l-4 border-primary bg-card p-5 sm:p-6 shadow-sm">
        <p className="flex items-center gap-2 text-sm font-bold text-foreground sm:text-base">
          <Lightbulb className="h-5 w-5 text-primary shrink-0" />
          Por que essa versão é a mais indicada para você?
        </p>
        <ul className="mt-3.5 space-y-2 text-[14px] sm:text-[15px] text-muted-foreground">
          {rec.resultReasons.map((r) => (
            <li key={r} className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground/80">
          Diagnóstico baseado nas suas respostas sobre momento profissional e prioridades.
        </p>
      </div>

      {/* Botão de ação rápida para a LP */}
      <div className="mt-10 text-center">
        {isOffersLpConfigured ? (
          <Button asChild size="lg" className="w-full text-base sm:w-auto shadow-glow">
            <a href={lpUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleLpClick()}>
              CONHECER OFERTAS NA PÁGINA OFICIAL <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        ) : (
          <Button
            type="button"
            size="lg"
            className="w-full text-base sm:w-auto"
            onClick={() => offersRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            COMPARAR AS OPÇÕES ABAIXO <ArrowDown className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Seção Comparativa das Ofertas (Start, Pro, White Label) */}
      <div ref={offersRef} className="mt-14 scroll-mt-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Conheça as opções disponíveis</h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Escolha o modelo que melhor atende à realidade e ao crescimento da sua consultoria:
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-1">
          {offersList.map((plan) => {
            const isRecommended = plan.id === rec.recommendedProduct;
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-6 transition-all duration-300 sm:p-7 ${
                  isRecommended
                    ? "border-2 border-primary bg-card shadow-glow ring-1 ring-primary/20"
                    : "border-border bg-card/60 hover:border-primary/40"
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3.5 right-6">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-black uppercase tracking-wide text-primary-foreground shadow">
                      <Sparkles className="h-3 w-3" /> Sua Recomendação
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${
                      isRecommended
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border bg-background-2 text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground sm:text-xl">{plan.name}</h3>
                    <span className="text-xs font-semibold text-primary">{plan.badge}</span>
                  </div>
                </div>

                <p className="mt-3.5 text-sm text-muted-foreground leading-relaxed">{plan.tagline}</p>

                <ul className="mt-4 space-y-2 border-t border-border pt-4 text-[14px]">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-foreground/90">{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {isOffersLpConfigured ? (
                    <Button
                      asChild
                      variant={isRecommended ? "primary" : "outline"}
                      className="w-full"
                    >
                      <a
                        href={lpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLpClick(plan.id)}
                      >
                        VER CONDIÇÕES DO {plan.name.toUpperCase()} <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant={isRecommended ? "primary" : "outline"}
                      disabled
                      className="w-full"
                    >
                      VER CONDIÇÕES DO {plan.name.toUpperCase()} <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Formulário para salvar o diagnóstico ou pedir contato personalizado */}
      <div ref={formRef} className="scroll-mt-6 pt-14">
        <LeadCaptureForm answers={answers} onSaved={setLeadId} />
      </div>
    </section>
  );
}
