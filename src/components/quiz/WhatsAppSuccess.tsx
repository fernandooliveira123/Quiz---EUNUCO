import { ArrowRight, CheckCircle2, Crown, Sparkles, Zap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OFFERS_LP_URL, isOffersLpConfigured, WHATSAPP_GROUP_URL, isWhatsAppConfigured } from "@/quiz/config";
import { track } from "@/quiz/analytics";
import { buildUrlWithUtm } from "@/quiz/utm";

export function WhatsAppSuccess({ leadId }: { leadId: string }) {
  const lpUrl = buildUrlWithUtm(OFFERS_LP_URL);

  const openOffers = () => {
    track("whatsapp_cta_click"); // compatibilidade de analytics
  };

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-12 sm:py-20 animate-fade-up" aria-live="polite">
      <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
      <h1 className="mt-5 text-center text-3xl font-extrabold leading-tight">Diagnóstico e cadastro confirmados!</h1>
      <p className="mt-4 text-center text-base text-foreground">
        Seu perfil foi analisado e seus dados foram registrados com sucesso.
      </p>
      <p className="mt-3 text-center text-[15px] leading-relaxed text-muted-foreground">
        Agora você já pode conferir as condições exclusivas das nossas opções de planos com aplicativo próprio para a sua consultoria.
      </p>

      <ul className="mt-8 space-y-3 rounded-2xl border border-border bg-card p-5">
        <li className="flex items-center gap-3 text-[15px]">
          <Zap className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <span><strong>Start:</strong> Mensalidade essencial para quem está começando.</span>
        </li>
        <li className="flex items-center gap-3 text-[15px]">
          <Sparkles className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <span><strong>Pro Mensal:</strong> Mensalidade flexível com aplicativo na sua marca e alunos ilimitados.</span>
        </li>
        <li className="flex items-center gap-3 text-[15px]">
          <Crown className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <span><strong>Plano Anual:</strong> Maior economia com aplicativo exclusivo na sua marca e suporte prioritário.</span>
        </li>
      </ul>

      <div className="mt-8 space-y-4">
        {isOffersLpConfigured ? (
          <Button asChild size="lg" className="w-full text-base">
            <a href={lpUrl} target="_blank" rel="noopener noreferrer" onClick={openOffers}>
              ACESSAR PÁGINA DE OFERTAS <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        ) : (
          <div className="rounded-xl border border-border bg-background-2 p-4 text-center text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Página de ofertas em configuração</p>
            <p className="mt-1">O link de direcionamento para a Landing Page de ofertas pode ser ajustado em <code>src/quiz/config.ts</code>.</p>
          </div>
        )}

        {isWhatsAppConfigured && (
          <Button asChild variant="outline" className="w-full text-sm">
            <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Falar com um consultor no WhatsApp
            </a>
          </Button>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Acesso direto às opções com aplicativo personalizado do Treino Inteligente.
      </p>
    </section>
  );
}
