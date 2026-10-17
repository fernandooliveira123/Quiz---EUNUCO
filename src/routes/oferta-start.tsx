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
  Users,
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
      { title: "Seu Diagnóstico: Pro Mensal | Treino Inteligente" },
      {
        name: "description",
        content:
          "Plano Pro Mensal por apenas R$ 44,90/mês, com 3 dias de teste grátis por R$ 0,00 hoje em nosso checkout, alunos ilimitados e White-label liberado.",
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
    track("stripe_checkout_click", { plan: "pro_mensal", lead_id: leadId ?? "" });
  };

  const comparisonItems = [
    {
      feature: "Identidade Visual e Marca",
      traditional: "Marca do aplicativo concorrente em destaque, parecendo que o serviço é da plataforma e não seu.",
      treinoInteligente: "Aplicativo 100% White-label liberado com seu logotipo, cores e identidade da sua consultoria.",
    },
    {
      feature: "Limite de Alunos",
      traditional: "Plataformas que cobram taxas adicionais por faixas de alunos conforme você cresce.",
      treinoInteligente: "Alunos Ilimitados! Cadastre e atenda quantos alunos quiser sem nenhuma cobrança por aluno novo.",
    },
    {
      feature: "Condição de Entrada",
      traditional: "Cobrança imediata e contratos com multas pesadas de fidelidade.",
      treinoInteligente: "Teste 3 dias grátis por R$ 0,00 hoje em nosso checkout seguro. Cancele com 1 clique antes do 4º dia sem custo.",
    },
    {
      feature: "Tempo de Prescrição",
      traditional: "Mais de 20 minutos por treino montando texto ou copiando e colando blocos.",
      treinoInteligente: "Prescrição e atualização completa de fichas em até 3 minutos no celular.",
    },
    {
      feature: "Compromisso Financeiro",
      traditional: "Plataformas que exigem contratos de 12 meses ou taxas de adesão abusivas.",
      treinoInteligente: "Apenas R$ 44,90/mês. Zero fidelidade, zero taxa de adesão e cancele quando quiser.",
    },
    {
      feature: "Percepção do Aluno",
      traditional: "Sensação de atendimento caseiro e amador por usar mensagens soltas.",
      treinoInteligente: "Postura de profissional moderno e organizado com aplicativo exclusivo desde o primeiro aluno.",
    },
  ];

  const faqItems = [
    {
      question: "Como funciona o teste gratuito de 3 dias por R$ 0,00?",
      answer:
        "No momento da assinatura em nosso checkout seguro, você paga R$ 0,00. Seu cartão é apenas autenticado com criptografia bancária e seu acesso completo à plataforma (com aplicativo White-label e alunos ilimitados) é liberado imediatamente. Você tem 3 dias inteiros para testar na prática. A primeira cobrança de R$ 44,90 só ocorre no 4º dia se você decidir continuar.",
    },
    {
      question: "O Plano Pro Mensal inclui White-label e alunos ilimitados?",
      answer:
        "Sim! Tanto o Plano Pro Mensal quanto o Anual oferecem Alunos Ilimitados e Personalização White-label 100% liberada com seu logotipo, cores e nome da sua consultoria.",
    },
    {
      question: "Existe algum contrato de fidelidade ou taxa de adesão?",
      answer:
        "Absolutamente não! O plano mensal é de apenas R$ 44,90 por mês, sem qualquer taxa de adesão ou contrato de fidelidade. Você usa pelo tempo que quiser e pode cancelar a qualquer momento em um único clique.",
    },
    {
      question: "Como funciona o cancelamento da assinatura?",
      answer:
        "Você tem total autonomia direto pelo botão 'Gerenciar Assinatura' na sua área de configurações. Se cancelar durante os 3 dias de trial, o cancelamento é imediato com custo zero. Se cancelar após a cobrança, ela não se renova e você continua usando até fechar os 30 dias que já pagou.",
    },
    {
      question: "Posso migrar para o plano White-label Anual mais tarde?",
      answer:
        "Com certeza! A qualquer momento você pode migrar para o plano anual para garantir 2 meses grátis de economia (R$ 497/ano equivale a apenas R$ 41,41/mês) e suporte prioritário direto via WhatsApp.",
    },
    {
      question: "Como funciona a garantia de 7 dias?",
      answer:
        "Além dos 3 dias grátis por R$ 0,00, você conta com 7 dias corridos de garantia incondicional após o início da cobrança. Se achar que a ferramenta não facilitou sua rotina, basta solicitar o reembolso e devolveremos 100% do valor.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <OfferHeader badgeText="Plano Pro Mensal · 3 Dias de Teste Grátis" />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* 1. HEADLINE DINÂMICA BASEADA NAS RESPOSTAS DO QUIZ */}
        <OfferDynamicHeadline plan="start" />

        {/* 2. ESPAÇO PARA VÍDEO VSL (VIDEO SALES LETTER) */}
        <OfferVslPlayer
          planTitle="Treino Inteligente Pro Mensal"
          videoUrl={VSL_VIDEO_START_URL}
          ctaText="COMEÇAR 3 DIAS GRÁTIS (R$ 0,00 HOJE)"
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
                Plano Pro Mensal · Alunos Ilimitados
              </span>

              <h2 className="text-2xl font-black sm:text-3xl text-foreground">
                Tudo o que você precisa para prescrever treinos com máxima agilidade:
              </h2>

              <ul className="space-y-3.5 pt-2">
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Personalização White-label 100% Liberada:</strong> seu
                    logotipo oficial, cores e identidade da sua consultoria no app.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Users className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Alunos Ilimitados:</strong> atenda seus alunos atuais
                    e expanda sua carteira sem travas e sem cobranças por aluno adicional.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Prescrição Rápida em até 3 Minutos:</strong>{" "}
                    crie e atualize treinos com facilidade pelo celular, com biblioteca demonstrativa completa.
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
                    <strong className="text-foreground">Zero Contrato de Fidelidade:</strong> renovação
                    mensal livre de R$ 44,90. Cancele quando quiser com 1 clique direto no seu painel.
                  </span>
                </li>
              </ul>
            </div>

            {/* Coluna da direita: preço e botão de checkout */}
            <div className="lg:col-span-5 rounded-2xl border border-border bg-card/90 p-6 sm:p-7 text-center shadow-card">
              <span className="inline-block rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">
                3 Dias Grátis · R$ 0,00 Hoje
              </span>

              <div className="mt-4">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wide">
                  No momento do checkout
                </div>
                <div className="mt-1 flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-primary">R$ 0,00</span>
                  <span className="text-sm font-bold text-foreground">hoje</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Primeira cobrança de <strong className="text-foreground">R$ 44,90/mês</strong> somente no 4º dia
                </div>
              </div>

              {/* Ancoragem de custo diário e passos do teste */}
              <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs sm:text-sm font-semibold text-primary leading-snug text-left space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>Como funciona seu teste de 3 dias:</span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  • <strong>Hoje:</strong> R$ 0,00 no cartão em nosso checkout seguro. Acesso liberado na hora.<br />
                  • <strong>Dias 1 a 3:</strong> Teste livre com alunos ilimitados e White-label.<br />
                  • <strong>Dia 4:</strong> R$ 44,90/mês (menos de R$ 1,50/dia). Cancele com 1 clique antes do 4º dia em seu painel sem pagar nada.
                </p>
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
                      <span className="flex flex-col items-center justify-center gap-0.5">
                        <span>COMEÇAR 3 DIAS GRÁTIS</span>
                        <span className="text-xs font-bold opacity-90">(R$ 0,00 HOJE · DEPOIS R$ 44,90/MÊS)</span>
                      </span>
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
                        "Link de checkout seguro não configurado. Defina STRIPE_CHECKOUT_START_URL em src/quiz/config.ts",
                      )
                    }
                  >
                    <span className="flex flex-col items-center justify-center gap-0.5">
                      <span>COMEÇAR 3 DIAS GRÁTIS</span>
                      <span className="text-xs font-bold opacity-90">(R$ 0,00 HOJE · DEPOIS R$ 44,90/MÊS)</span>
                    </span>
                    <ExternalLink className="h-5 w-5 shrink-0 ml-1" />
                  </Button>
                )}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Ambiente seguro com cancelamento em 1 clique · Garantia de 7 dias</span>
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
                  <span className="flex flex-col items-center justify-center gap-0.5">
                    <span>COMEÇAR 3 DIAS GRÁTIS</span>
                    <span className="text-xs font-bold opacity-90">(R$ 0,00 HOJE · DEPOIS R$ 44,90/MÊS)</span>
                  </span>
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
                    "Link de checkout seguro não configurado. Defina STRIPE_CHECKOUT_START_URL em src/quiz/config.ts",
                  )
                }
              >
                <span className="flex flex-col items-center justify-center gap-0.5">
                  <span>COMEÇAR 3 DIAS GRÁTIS</span>
                  <span className="text-xs font-bold opacity-90">(R$ 0,00 HOJE · DEPOIS R$ 44,90/MÊS)</span>
                </span>
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
