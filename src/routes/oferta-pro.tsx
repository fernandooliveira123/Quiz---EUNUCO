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
  STRIPE_CHECKOUT_PRO_URL,
  isStripeProConfigured,
  VSL_VIDEO_PRO_URL,
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

export const Route = createFileRoute("/oferta-pro")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Seu Diagnóstico: White Label Anual | Treino Inteligente" },
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
  };

  const comparisonItems = [
    {
      feature: "Identidade Visual e Marca",
      traditional: "Marca do aplicativo concorrente em destaque. Seus alunos acham que o serviço é da plataforma, não seu.",
      treinoInteligente: "Aplicativo 100% com sua marca, seu logotipo e suas cores. Autoridade máxima no bolso do aluno.",
    },
    {
      feature: "Tempo de Prescrição",
      traditional: "De 15 a 25 minutos por treino no WhatsApp, planilhas ou plataformas burocráticas.",
      treinoInteligente: "Prescrição completa e envio em até 3 minutos com banco inteligente de exercícios.",
    },
    {
      feature: "Capacidade de Cobrança",
      traditional: "Margem comprimida e dificuldade de cobrar mais de R$ 150/mês por parecer serviço amador.",
      treinoInteligente: "Percepção de serviço premium: você pode cobrar R$ 250 a R$ 400/mês entregando um app próprio.",
    },
    {
      feature: "Custo-Benefício Real",
      traditional: "Mensalidades que encarecem com o tempo ou exigem taxas adicionais por personalização.",
      treinoInteligente: "Apenas R$ 41,41/mês no plano anual. Menos que a mensalidade de 1 único aluno.",
    },
  ];

  const faqItems = [
    {
      question: "Como funciona a personalização White Label com a minha marca?",
      answer:
        "Assim que você entra no Treino Inteligente, nossa equipe e o sistema de onboarding aplicam seu logotipo, paleta de cores e nome da sua consultoria. Seus alunos acessam uma interface que valoriza 100% o seu trabalho, sem menção a marcas concorrentes.",
    },
    {
      question: "O que é a prescrição em até 3 minutos?",
      answer:
        "É a nossa tecnologia exclusiva de montagem ágil: com templates estruturados, filtros avançados por objetivo, histórico de cargas e substituição rápida de exercícios, você monta um protocolo completo em até 3 minutos, economizando mais de 10 horas semanais.",
    },
    {
      question: "Por que o plano anual de R$ 497 é mais vantajoso?",
      answer:
        "Porque ele garante a plataforma liberada pelo ano todo por um valor que equivale a cerca de R$ 41 por mês — menos do que a mensalidade de um único aluno seu. Você economiza mais de R$ 300 em relação a contratações avulsas e ainda ganha todos os bônus de escala.",
    },
    {
      question: "Meus alunos precisam pagar para usar o aplicativo?",
      answer:
        "Não! O acesso para seus alunos é 100% gratuito. Eles recebem o convite, acessam o treino pelo celular e você tem controle total.",
    },
    {
      question: "Como funciona a garantia de 7 dias?",
      answer:
        "Você tem 7 dias corridos a partir da assinatura para testar todas as funcionalidades. Se não ficar totalmente impressionado com a velocidade de prescrição e com a experiência da sua marca, basta nos enviar um e-mail e estornamos 100% do seu valor.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <OfferHeader badgeText="Diagnóstico White Label Anual" />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* 1. HEADLINE DINÂMICA BASEADA NAS RESPOSTAS DO QUIZ */}
        <OfferDynamicHeadline plan="pro" />

        {/* 2. ESPAÇO PARA VÍDEO VSL (VIDEO SALES LETTER) */}
        <OfferVslPlayer
          planTitle="Treino Inteligente White Label Anual"
          videoUrl={VSL_VIDEO_PRO_URL}
          ctaText="QUERO MEU APLICATIVO WHITE LABEL AGORA"
          ctaHref={isStripeProConfigured ? stripeUrl : "#oferta-card"}
          onCtaClick={handleCheckoutClick}
        />

        {/* 3. PROVA SOCIAL (MÉTRICAS + DEPOIMENTOS + WHATSAPP) */}
        <OfferSocialProof />

        {/* 4. ARGUMENTOS ESTRATÉGICOS (3 MINUTOS + MARCA PRÓPRIA + RETORNO FINANCEIRO + FIM DO CAOS) */}
        <OfferArguments plan="pro" />

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
                Plano White Label Anual · Licença Completa
              </span>

              <h2 className="text-2xl font-black sm:text-3xl text-foreground">
                Tudo o que sua consultoria precisa para se posicionar como autoridade máxima:
              </h2>

              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Aplicativo White Label Exclusivo:</strong> com
                    sua logo, suas cores e identidade da sua consultoria.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Zap className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Prescrição Ultrarrápida em até 3 Minutos:</strong>{" "}
                    elimine de vez as horas perdidas em planilhas ou mensagens.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Users className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Suporte a Carteira Ampliada:</strong> atenda mais
                    de 30 alunos com organização total e histórico de treinos.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-foreground">Maior Economia de Escala:</strong> melhor
                    condição por aluno do mercado na contratação anual.
                  </span>
                </li>
              </ul>
            </div>

            {/* Coluna da direita: preço ancorado e checkout */}
            <div className="lg:col-span-5 rounded-2xl border border-border bg-card/90 p-6 sm:p-7 text-center shadow-card">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Condição Especial de Diagnóstico
              </span>

              <div className="mt-3">
                <div className="text-xs text-muted-foreground line-through">De R$ 890,00/ano</div>
                <div className="mt-1 flex items-baseline justify-center gap-1">
                  <span className="text-sm font-semibold text-muted-foreground">12x de</span>
                  <span className="text-4xl sm:text-5xl font-black text-foreground">R$ 49,60</span>
                </div>
                <div className="mt-1 text-sm font-bold text-primary">
                  ou apenas R$ 497 à vista no plano anual
                </div>
              </div>

              {/* Bloco de Ancoragem Chave do Briefing */}
              <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs sm:text-sm font-semibold text-primary leading-snug">
                ⚡ Equivale a cerca de <strong className="underline">R$ 41/mês</strong> — menos que a
                mensalidade de 1 único aluno da sua consultoria!
              </div>

              <div className="mt-6">
                {isStripeProConfigured ? (
                  <Button asChild size="lg" className="w-full text-base font-black shadow-glow py-6">
                    <a
                      href={stripeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleCheckoutClick}
                    >
                      QUERO MEU APP WHITE LABEL <ArrowRight className="h-5 w-5 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    className="w-full text-base font-black py-6"
                    onClick={() =>
                      alert(
                        "Link de checkout Stripe não configurado. Defina STRIPE_CHECKOUT_PRO_URL em src/quiz/config.ts",
                      )
                    }
                  >
                    QUERO MEU APP WHITE LABEL (R$ 497/ANO) <ExternalLink className="h-5 w-5 ml-2" />
                  </Button>
                )}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Garantia de 7 dias · Pagamento 100% seguro pelo Stripe</span>
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
              Ao garantir sua licença White Label Anual hoje, você recebe gratuitamente:
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
          title="Por que o White Label Anual é a melhor decisão?"
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
              <Button asChild size="lg" className="w-full max-w-md font-black shadow-glow py-6 text-base">
                <a
                  href={stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCheckoutClick}
                >
                  GARANTIR WHITE LABEL ANUAL (R$ 497/ANO) <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                className="w-full max-w-md font-black py-6 text-base"
                onClick={() =>
                  alert(
                    "Link de checkout Stripe não configurado. Defina STRIPE_CHECKOUT_PRO_URL em src/quiz/config.ts",
                  )
                }
              >
                GARANTIR WHITE LABEL ANUAL (R$ 497/ANO) <ArrowRight className="h-5 w-5 ml-2" />
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
                Conheça a opção White Label Mensal por R$ 44,90/mês sem fidelidade →
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
