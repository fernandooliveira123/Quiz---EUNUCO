import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Zap,
  Smartphone,
  ShieldCheck,
  ExternalLink,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { OfferHeader } from "@/components/offers/OfferHeader";
import { OfferDynamicHeadline } from "@/components/offers/OfferDynamicHeadline";
import { OfferVslPlayer } from "@/components/offers/OfferVslPlayer";
import { OfferSocialProof } from "@/components/offers/OfferSocialProof";
import { OfferArguments } from "@/components/offers/OfferArguments";
import { OfferGuarantee } from "@/components/offers/OfferGuarantee";
import { OfferComparisonTable } from "@/components/offers/OfferComparisonTable";
import { OfferFaqSection } from "@/components/offers/OfferFaqSection";
import {
  STRIPE_CHECKOUT_START_URL,
  isStripeStartConfigured,
  VSL_VIDEO_START_URL,
} from "@/quiz/config";
import { buildStripeCheckoutUrl } from "@/quiz/utm";
import { track } from "@/quiz/analytics";

const searchSchema = z.object({
  lead_id: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
});

export const Route = createFileRoute("/oferta-start")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Seu Diagnóstico: White Label Mensal | Treino Inteligente" },
      {
        name: "description",
        content:
          "A solução ideal para você sair do improviso de mensagens e ter seu próprio aplicativo sem comprometer seu orçamento.",
      },
    ],
  }),
  component: OfertaStartPage,
});

function OfertaStartPage() {
  const search = Route.useSearch();
  const leadId = search.lead_id;
  const stripeUrl = buildStripeCheckoutUrl(STRIPE_CHECKOUT_START_URL, leadId);

  const handleCheckoutClick = () => {
    track("stripe_checkout_click", { plan: "whitelabel_mensal", lead_id: leadId ?? "" });
  };

  const comparisonItems = [
    {
      feature: "Organização dos Treinos",
      traditional: "PDFs e mensagens espalhadas em conversas do WhatsApp que desformatam no celular do aluno.",
      treinoInteligente: "Tudo centralizado em um aplicativo fluido, intuitivo e com visual profissional.",
    },
    {
      feature: "Tempo de Prescrição",
      traditional: "Mais de 20 minutos por treino montando texto ou copiando e colando blocos.",
      treinoInteligente: "Prescrição e atualização de fichas em até 3 minutos.",
    },
    {
      feature: "Compromisso Financeiro",
      traditional: "Plataformas que exigem contratos de 12 meses ou taxas de adesão abusivas.",
      treinoInteligente: "Apenas R$ 44,90/mês. Zero fidelidade, zero multa e cancele quando quiser.",
    },
    {
      feature: "Percepção do Aluno",
      traditional: "Sensação de atendimento caseiro e amador por usar mensagens soltas.",
      treinoInteligente: "Postura de profissional moderno e organizado desde o primeiro aluno.",
    },
  ];

  const faqItems = [
    {
      question: "Existe algum contrato de fidelidade ou taxa de adesão?",
      answer:
        "Absolutamente não! O plano mensal é de apenas R$ 44,90 por mês, sem qualquer taxa de adesão ou contrato de fidelidade. Você usa pelo tempo que quiser e pode cancelar a qualquer momento em um único clique.",
    },
    {
      question: "Serve para quem tem poucos alunos ou está começando?",
      answer:
        "Sim, este plano foi desenhado sob medida para você! Ele permite que você comece com o pé direito, economizando tempo e transmitindo profissionalismo desde o primeiro aluno, sem pesar no seu orçamento.",
    },
    {
      question: "Como funciona a prescrição de treinos em até 3 minutos?",
      answer:
        "O sistema possui modelos inteligentes e substituição rápida de exercícios. Você escolhe o objetivo, ajusta séries e repetições e envia para o celular do aluno em até 3 minutos.",
    },
    {
      question: "Posso migrar para o plano anual mais tarde?",
      answer:
        "Com certeza! Conforme sua base de alunos crescer e você quiser seu aplicativo com a sua marca própria e economia de escala, você pode migrar facilmente para o plano anual.",
    },
    {
      question: "Como funciona a garantia de 7 dias?",
      answer:
        "Se em até 7 dias você achar que o Treino Inteligente não facilitou sua rotina diária de treinos, basta nos solicitar o reembolso e devolveremos 100% do valor pago.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <OfferHeader badgeText="Diagnóstico White Label Mensal" />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* 1. HEADLINE DINÂMICA BASEADA NAS RESPOSTAS DO QUIZ */}
        <OfferDynamicHeadline plan="start" />

        {/* 2. ESPAÇO PARA VÍDEO VSL (VIDEO SALES LETTER) */}
        <OfferVslPlayer
          planTitle="Treino Inteligente White Label Mensal"
          videoUrl={VSL_VIDEO_START_URL}
          ctaText="COMEÇAR AGORA POR R$ 44,90/MÊS"
          ctaHref={isStripeStartConfigured ? stripeUrl : "#oferta-card"}
          onCtaClick={handleCheckoutClick}
        />

        {/* 3. PROVA SOCIAL (MÉTRICAS + DEPOIMENTOS + WHATSAPP) */}
        <OfferSocialProof />

        {/* 4. ARGUMENTOS ESTRATÉGICOS (3 MINUTOS + ENTRADA ACESSÍVEL + FIM DO WHATSAPP) */}
        <OfferArguments plan="start" />

        {/* CARD PRINCIPAL DE PREÇO E OFERTA */}
        <div
          id="oferta-card"
          className="mt-16 rounded-3xl border-2 border-primary/60 bg-gradient-to-b from-card to-background p-6 sm:p-10 shadow-glow relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Coluna da esquerda: entregáveis */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block rounded-md bg-primary/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">
                Assinatura Mensal · Sem Fidelidade
              </span>

              <h2 className="text-2xl font-black sm:text-3xl text-foreground">
                Tudo o que você precisa para prescrever treinos com máxima agilidade:
              </h2>

              <ul className="space-y-3.5 pt-2">
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Prescrição Rápida em até 3 Minutos:</strong>{" "}
                    crie e atualize treinos com facilidade, sem burocracia ou lentidão.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Smartphone className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Organização Profissional da Rotina:</strong>{" "}
                    seus alunos acessam treinos, vídeos e histórico direto no celular.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <HeartHandshake className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Acesso Completo Sem Fidelidade:</strong> sem
                    contratos longos, sem taxas ocultas. Cancele a qualquer momento.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Alunos Ilimitados para Começar:</strong>{" "}
                    atenda seus alunos atuais e tenha espaço para crescer sua carteira.
                  </span>
                </li>
              </ul>
            </div>

            {/* Coluna da direita: preço e botão de checkout */}
            <div className="lg:col-span-5 rounded-2xl border border-border bg-card/90 p-6 sm:p-7 text-center shadow-card">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Condição Acessível de Início
              </span>

              <div className="mt-3">
                <div className="text-xs text-muted-foreground line-through">De R$ 89,90/mês</div>
                <div className="mt-1 flex items-baseline justify-center gap-1">
                  <span className="text-sm font-semibold text-muted-foreground">Por apenas</span>
                  <span className="text-4xl sm:text-5xl font-black text-foreground">R$ 44,90</span>
                  <span className="text-sm font-semibold text-muted-foreground">/mês</span>
                </div>
                <div className="mt-1 text-xs font-bold text-primary uppercase tracking-wide">
                  Sem taxa de adesão · Cancele quando quiser
                </div>
              </div>

              {/* Ancoragem de custo diário */}
              <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs sm:text-sm font-semibold text-primary leading-snug">
                ⚡ Menos de <strong className="underline">R$ 1,50 por dia</strong> para economizar horas
                de trabalho e impressionar seus alunos!
              </div>

              <div className="mt-6">
                {isStripeStartConfigured ? (
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
                      <span>ASSINAR POR R$ 44,90/MÊS</span>
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
                        "Link de checkout Stripe não configurado. Defina STRIPE_CHECKOUT_START_URL em src/quiz/config.ts",
                      )
                    }
                  >
                    <span>ASSINAR POR R$ 44,90/MÊS</span>
                    <ExternalLink className="h-5 w-5 shrink-0 ml-1" />
                  </Button>
                )}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Garantia incondicional de 7 dias · Pagamento seguro</span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARATIVO COM MÉTODOS TRADICIONAIS E WHATSAPP */}
        <OfferComparisonTable
          title="Por que você precisa sair do amadorismo hoje?"
          subtitle="Compare a experiência de quem usa mensagens e métodos manuais com quem utiliza o Treino Inteligente:"
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
            Pronto para economizar horas semanais por R$ 1,50 ao dia?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            Livre-se da bagunça de mensagens soltas no WhatsApp. Entregue um aplicativo de verdade para seus
            alunos hoje mesmo.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            {isStripeStartConfigured ? (
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
                  <span>COMEÇAR AGORA POR R$ 44,90/MÊS</span>
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
                    "Link de checkout Stripe não configurado. Defina STRIPE_CHECKOUT_START_URL em src/quiz/config.ts",
                  )
                }
              >
                <span>COMEÇAR AGORA POR R$ 44,90/MÊS</span>
                <ArrowRight className="h-5 w-5 shrink-0 ml-1" />
              </Button>
            )}

            {/* Alternativa para o plano anual */}
            <div className="mt-4 text-xs sm:text-sm text-muted-foreground">
              Já tem mais de 10 alunos ou quer seu app com marca própria?{" "}
              <Link
                to="/oferta-pro"
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
                Conheça a opção White Label Anual (R$ 497/ano ou ~R$ 41/mês) →
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
