import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Gift,
  ExternalLink,
  ShieldCheck,
  Zap,
  Users,
  TrendingUp,
  Clock,
  MessageCircle,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { OfferHeader } from "@/components/offers/OfferHeader";
import { OfferDynamicHeadline } from "@/components/offers/OfferDynamicHeadline";
import { OfferVslPlayer } from "@/components/offers/OfferVslPlayer";
import { OfferSocialProof } from "@/components/offers/OfferSocialProof";
import { OfferArguments } from "@/components/offers/OfferArguments";
import { AppBrandingShowcase } from "@/components/offers/AppBrandingShowcase";
import { AppMockup3DCarousel } from "@/components/offers/AppMockup3DCarousel";
import { AppFeaturesGrid } from "@/components/offers/AppFeaturesGrid";
import { OfferGuarantee } from "@/components/offers/OfferGuarantee";
import { OfferComparisonTable } from "@/components/offers/OfferComparisonTable";
import { OfferFaqSection } from "@/components/offers/OfferFaqSection";
import {
  STRIPE_CHECKOUT_PRO_URL,
  isStripeProConfigured,
  VSL_VIDEO_PRO_URL,
} from "@/quiz/config";
import { buildStripeCheckoutUrl } from "@/quiz/utm";
import { track } from "@/quiz/analytics";
import { markLeadCheckoutStarted } from "@/quiz/crm.functions";

const searchSchema = z.object({
  lead_id: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
});

export const Route = createFileRoute("/oferta-pro")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Seu Diagnóstico: Plano Anual com Sua Marca | Treino Inteligente" },
      {
        name: "description",
        content:
          "Sua consultoria atingiu o nível onde você precisa do seu próprio aplicativo para proteger sua margem e cobrar mais caro dos seus alunos.",
      },
    ],
  }),
  component: OfertaProPage,
});

function OfertaProPage() {
  const search = Route.useSearch();
  const leadId = search.lead_id;
  const stripeUrl = buildStripeCheckoutUrl(STRIPE_CHECKOUT_PRO_URL, leadId);

  const handleCheckoutClick = () => {
    track("stripe_checkout_click", { plan: "whitelabel_anual", lead_id: leadId ?? "" });
    if (leadId) {
      markLeadCheckoutStarted({ data: { id: leadId, plan: "pro_anual" } }).catch(() => {});
    }
  };

  const comparisonItems = [
    {
      feature: "Identidade Visual e Marca",
      traditional: "Marca do aplicativo concorrente em destaque. Seus alunos acham que o serviço é da plataforma, não seu.",
      treinoInteligente: "Aplicativo exclusivo com seu logotipo, cores e identidade. Seus alunos só veem a SUA marca.",
    },
    {
      feature: "Limite de Alunos",
      traditional: "Cobranças extras por faixas de alunos que encarecem conforme sua consultoria cresce.",
      treinoInteligente: "Alunos Ilimitados! Cadastre e atenda quantos alunos quiser sem nenhuma cobrança por aluno adicional.",
    },
    {
      feature: "Condição de Entrada",
      traditional: "Cobrança imediata e contratos com multas pesadas de fidelidade.",
      treinoInteligente: "Teste 3 dias grátis por R$ 0,00 hoje em nosso checkout seguro. Cancele com 1 clique antes do 4º dia sem custo.",
    },
    {
      feature: "Tempo de Prescrição",
      traditional: "De 15 a 25 minutos por treino no WhatsApp, digitação manual ou plataformas burocráticas.",
      treinoInteligente: "Prescrição completa e envio em até 3 minutos com banco inteligente de exercícios.",
    },
    {
      feature: "Suporte e Atendimento",
      traditional: "Tickets lentos ou robôs que demoram dias para responder dúvidas urgentes.",
      treinoInteligente: "Suporte Prioritário Direto via WhatsApp com especialistas da nossa equipe.",
    },
    {
      feature: "Economia Real",
      traditional: "Mensalidades avulsas que somam mais de R$ 538/ano sem desconto.",
      treinoInteligente: "Apenas R$ 41,41/mês no plano anual (R$ 497/ano com 2 meses grátis — economia de R$ 41,80/ano).",
    },
  ];

  const faqItems = [
    {
      question: "Como funciona o teste gratuito de 3 dias por R$ 0,00?",
      answer:
        "No momento da assinatura em nosso checkout seguro, você paga R$ 0,00. Seu cartão é apenas autenticado com criptografia bancária e seu acesso completo à plataforma (com aplicativo personalizado na sua marca e alunos ilimitados) é liberado imediatamente. Você tem 3 dias inteiros para testar na prática. A primeira cobrança de R$ 497 só ocorre no 4º dia se você decidir continuar.",
    },
    {
      question: "Como funciona o cancelamento da assinatura?",
      answer:
        "Você tem total autonomia direto pelo botão 'Gerenciar Assinatura' na sua área de configurações. Se cancelar durante os 3 dias de teste grátis, o cancelamento é imediato com custo zero. Se cancelar após a cobrança, ela não se renova e você continua usando até completar os 12 meses já pagos.",
    },
    {
      question: "O que está incluído no Plano Anual com a Sua Marca?",
      answer:
        "Tudo incluso sem taxas ocultas: aplicativo exclusivo com sua logo, cores e nome da sua consultoria, alunos ilimitados, prescrição em até 3 minutos, suporte prioritário direto via WhatsApp e 2 meses grátis de economia (R$ 497/ano equivale a apenas R$ 41,41/mês).",
    },
    {
      question: "Meus alunos precisam pagar para usar o aplicativo?",
      answer:
        "Não! O acesso para seus alunos é 100% gratuito. Eles recebem o convite, baixam o app com a sua identidade visual e você tem controle total da evolução deles.",
    },
    {
      question: "Como funciona a garantia incondicional de 7 dias?",
      answer:
        "Além dos 3 dias grátis por R$ 0,00, você conta com 7 dias corridos de garantia incondicional após o início da anuidade. Se não ficar totalmente impressionado com os resultados, basta nos enviar um e-mail e estornamos 100% do seu valor.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <OfferHeader badgeText="Plano Anual com Sua Marca · 3 Dias de Teste Grátis" />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* 1. HEADLINE DINÂMICA BASEADA NAS RESPOSTAS DO QUIZ */}
        <OfferDynamicHeadline plan="pro" />

        {/* 2. ESPAÇO PARA VÍDEO VSL (VIDEO SALES LETTER) */}
        <OfferVslPlayer
          planTitle="Treino Inteligente com Sua Marca (Plano Anual)"
          videoUrl={VSL_VIDEO_PRO_URL}
          ctaText="COMEÇAR 3 DIAS GRÁTIS (R$ 0,00 HOJE)"
          ctaHref={isStripeProConfigured ? stripeUrl : "#oferta-card"}
          onCtaClick={handleCheckoutClick}
        />

        {/* 3. PROVA SOCIAL (MÉTRICAS + VÍDEO WISTIA + DEPOIMENTOS + WHATSAPP) */}
        <OfferSocialProof />

        {/* 4. ARGUMENTOS ESTRATÉGICOS (3 MINUTOS + MARCA PRÓPRIA + RETORNO FINANCEIRO + FIM DO CAOS) */}
        <OfferArguments plan="pro" />

        {/* 5. APLICATIVO INSTALADO NA TELA DO ALUNO (ÍCONE, CORES E LOGO DA CONSULTORIA) */}
        <AppBrandingShowcase plan="pro" />

        {/* 6. CARROSSEL 3D DE TELAS E FUNCIONALIDADES DO APLICATIVO */}
        <AppMockup3DCarousel />

        {/* 6. GRID DAS FUNCIONALIDADES TÉCNICAS E CIENTÍFICAS */}
        <AppFeaturesGrid />

        {/* CARD PRINCIPAL DE ANCORAGEM E OFERTA */}
        <div
          id="oferta-card"
          className="mt-16 rounded-3xl border-2 border-primary/60 bg-gradient-to-b from-card to-background p-6 sm:p-10 shadow-glow relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Coluna da esquerda: entregáveis e ancoragem */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block rounded-md bg-primary/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">
                Plano Anual com Sua Marca · Alunos Ilimitados
              </span>

              <h2 className="text-2xl font-black sm:text-3xl text-foreground">
                Tudo o que sua consultoria precisa para se posicionar como autoridade máxima:
              </h2>

              <ul className="space-y-3.5 pt-2">
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Aplicativo Exclusivo com Sua Marca:</strong> seu
                    logotipo oficial, cores e o nome da sua consultoria direto no celular do aluno.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Users className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Alunos Ilimitados:</strong> atenda 10, 50 ou mais
                    de 100 alunos sem pagar um centavo a mais por aluno novo.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Zap className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Prescrição Ultrarrápida em até 3 Minutos:</strong>{" "}
                    banco de vídeos demonstrativos e adaptação de protocolos com 1 toque.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Suporte Prioritário Direto via WhatsApp:</strong> canal
                    ágil com especialistas para tirar dúvidas e acelerar sua operação.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Economia Imediata de R$ 500,00:</strong> de R$ 997,00
                    por apenas R$ 497,00/ano (equivalente a R$ 41,41/mês — menos de R$ 1,40 por dia).
                  </span>
                </li>
              </ul>
            </div>

            {/* Coluna da direita: preço ancorado e checkout */}
            <div className="lg:col-span-5 rounded-2xl border border-border bg-card/90 p-6 sm:p-7 text-center shadow-card">
              <span className="inline-block rounded-full bg-primary/15 border border-primary/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-primary">
                🔥 Oferta Especial de Lançamento · 50% OFF
              </span>

              {/* Ancoragem visual R$ 997 -> R$ 497 */}
              <div className="mt-4 rounded-xl border border-border/80 bg-background/80 p-4 shadow-inner">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground font-semibold">
                  <span>De</span>
                  <span className="line-through text-destructive font-bold decoration-destructive decoration-2">
                    R$ 997,00
                  </span>
                  <span>por apenas:</span>
                </div>
                <div className="mt-1 flex items-baseline justify-center gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                    R$ 497,00
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-muted-foreground">/ano</span>
                </div>
                <div className="mt-1.5 text-xs text-primary font-bold">
                  (Equivalente a apenas R$ 41,41/mês · Economia de R$ 500,00 + 2 meses grátis)
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wide">
                  No momento do checkout hoje
                </div>
                <div className="mt-1 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-primary">R$ 0,00</span>
                  <span className="text-sm font-bold text-foreground">hoje</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Primeira cobrança de <strong className="text-foreground">R$ 497,00/ano</strong> somente no 4º dia
                </div>
              </div>

              {/* Bloco de Ancoragem Chave do Briefing */}
              <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs sm:text-sm font-semibold text-primary leading-snug text-left space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>Como funciona seu teste de 3 dias:</span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  • <strong>Hoje:</strong> R$ 0,00 no cartão em nosso checkout seguro. Acesso liberado na hora.<br />
                  • <strong>Dias 1 a 3:</strong> Teste livre com alunos ilimitados e sua marca.<br />
                  • <strong>Dia 4:</strong> R$ 497/ano (~R$ 41,41/mês). Cancele com 1 clique antes do 4º dia em seu painel sem nenhum custo.
                </p>
              </div>

              <div className="mt-6">
                {isStripeProConfigured ? (
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-auto min-h-14 py-3.5 px-4 text-sm sm:text-base font-black shadow-glow whitespace-normal text-center leading-tight rounded-xl"
                  >
                    <a
                      href={stripeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleCheckoutClick}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>COMEÇAR 3 DIAS GRÁTIS (R$ 0,00 HOJE)</span>
                      <ArrowRight className="h-5 w-5 shrink-0 ml-1" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    className="w-full h-auto min-h-14 py-3.5 px-4 text-sm sm:text-base font-black shadow-glow whitespace-normal text-center leading-tight rounded-xl flex items-center justify-center gap-2"
                    onClick={() =>
                      alert(
                        "Link de checkout seguro não configurado. Defina STRIPE_CHECKOUT_PRO_URL em src/quiz/config.ts",
                      )
                    }
                  >
                    <span>COMEÇAR 3 DIAS GRÁTIS (R$ 0,00 HOJE)</span>
                    <ArrowRight className="h-5 w-5 shrink-0 ml-1" />
                  </Button>
                )}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Cancelamento em 1 clique no painel · Garantia incondicional de 7 dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* BÔNUS EXCLUSIVOS DE GESTÃO E ESCALA */}
        <section className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Gift className="h-3.5 w-3.5" /> Bônus Exclusivos Inclusos
            </span>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Tudo o que você precisa para acelerar sua consultoria neste ano
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Ao garantir seu Plano Anual com Sua Marca hoje, você recebe gratuitamente:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary font-black text-lg mb-4">
                01
              </div>
              <h3 className="text-lg font-bold">Guia de Precificação Premium</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Aprenda a estruturar seus planos de consultoria para cobrar de R$ 250 a R$ 400 por aluno
                aproveitando o posicionamento do seu próprio aplicativo.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary font-black text-lg mb-4">
                02
              </div>
              <h3 className="text-lg font-bold">50+ Protocolos de Treino Validados</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Biblioteca pronta com fichas estruturadas de hipertrofia, emagrecimento e reabilitação
                para você duplicar e personalizar em segundos.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary font-black text-lg mb-4">
                03
              </div>
              <h3 className="text-lg font-bold">Implantação Visual Assistida</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Acompanhamento direto para cadastrar sua logo, ajustar sua paleta de cores e deixar seu
                aplicativo pronto e impecável para os seus alunos.
              </p>
            </div>
          </div>
        </section>

        {/* COMPARATIVO COM SOLUÇÕES CONCORRENTES */}
        <OfferComparisonTable
          title="Por que ter o seu próprio aplicativo é a melhor decisão?"
          subtitle="Veja a diferença real entre insistir nas ferramentas genéricas do mercado e investir na sua própria marca:"
          items={comparisonItems}
        />

        {/* GARANTIA */}
        <div className="my-16">
          <OfferGuarantee />
        </div>

        {/* FAQ */}
        <OfferFaqSection items={faqItems} />

        {/* CTA FINAL DE CONVERSÃO */}
        <div className="my-14 rounded-3xl border border-primary/40 bg-card/90 p-8 text-center shadow-card sm:p-12">
          <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
            Pronto para ter seu aplicativo próprio por menos de R$ 42/mês?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            Junte-se aos mais de 3.400 personal trainers que saíram da dependência de concorrentes e construíram sua
            própria marca digital com o Treino Inteligente.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            {isStripeProConfigured ? (
              <Button
                asChild
                size="lg"
                className="w-full max-w-md h-auto min-h-14 py-3.5 px-4 text-sm sm:text-base font-black shadow-glow whitespace-normal text-center leading-tight rounded-xl"
              >
                <a
                  href={stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCheckoutClick}
                  className="flex items-center justify-center gap-2"
                >
                  <span>COMEÇAR 3 DIAS GRÁTIS (R$ 0,00 HOJE)</span>
                  <ArrowRight className="h-5 w-5 shrink-0 ml-1" />
                </a>
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                className="w-full max-w-md h-auto min-h-14 py-3.5 px-4 text-sm sm:text-base font-black shadow-glow whitespace-normal text-center leading-tight rounded-xl flex items-center justify-center gap-2"
                onClick={() =>
                  alert(
                    "Link de checkout seguro não configurado. Defina STRIPE_CHECKOUT_PRO_URL em src/quiz/config.ts",
                  )
                }
              >
                <span>COMEÇAR 3 DIAS GRÁTIS (R$ 0,00 HOJE)</span>
                <ArrowRight className="h-5 w-5 shrink-0 ml-1" />
              </Button>
            )}

            {/* Alternativa para o plano mensal */}
            <div className="mt-4 text-xs sm:text-sm text-muted-foreground">
              Ainda não tem caixa para o plano anual?{" "}
              <Link
                to="/oferta-start"
                search={{
                  lead_id: leadId,
                  utm_source: search.utm_source,
                  utm_medium: search.utm_medium,
                  utm_campaign: search.utm_campaign,
                  utm_content: search.utm_content,
                  utm_term: search.utm_term,
                }}
                className="text-primary font-bold hover:underline"
              >
                Conheça a opção Pro Mensal por R$ 44,90/mês sem fidelidade →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/80 py-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Treino Inteligente. Todos os direitos reservados.</p>
        <p className="mt-1">
          Plataforma para personal trainers e consultorias esportivas de alta performance.
        </p>
      </footer>
    </div>
  );
}
