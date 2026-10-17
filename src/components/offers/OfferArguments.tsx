import { Zap, Crown, Calculator, Layers, Clock, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  plan: "pro" | "start";
}

export function OfferArguments({ plan }: Props) {
  const isPro = plan === "pro";

  const argumentsList = [
    {
      icon: Clock,
      tag: "AGILIDADE EXTREMA",
      title: "Prescrição completa de treinos em até 3 minutos",
      subtitle: "Elimine até 85% do tempo perdido digitando mensagens e montando treinos manuais.",
      description:
        "Com templates inteligentes, histórico de progressão de carga e substituição rápida de exercícios com 1 clique, você monta fichas completas diretamente pelo celular entre uma aula e outra. O fim das noites de domingo perdidas no computador.",
      bullets: [
        "Banco completo de exercícios com vídeos demonstrativos em alta resolução",
        "Substituição imediata de exercícios para alunos com dores ou lesões",
        "Clonagem e adaptação de protocolos com 1 único toque",
      ],
      highlightBox: "De 25 minutos para menos de 3 minutos por protocolo montado.",
    },
    {
      icon: Crown,
      tag: "AUTORIDADE DE MARCA",
      title: isPro
        ? "Aplicativo 100% White-label com a sua marca, logo e cores"
        : "Aplicativo 100% White-label liberado com seu logotipo oficial",
      subtitle: isPro
        ? "Pare de promover plataformas concorrentes: tenha aplicativo exclusivo e suporte prioritário via WhatsApp."
        : "Transmita autoridade de consultoria de elite com sua própria marca desde o primeiro aluno.",
      description: isPro
        ? "Nos aplicativos tradicionais do mercado, o aluno abre o app e vê a marca deles. No Treino Inteligente White-label Anual, o aluno só vê a SUA marca, SEU logotipo e SUAS cores no bolso dele, com alunos ilimitados e suporte prioritário via WhatsApp."
        : "Sair do WhatsApp e de arquivos desformatados no celular transforma a percepção do aluno. Mesmo no plano mensal, o White-label é 100% liberado com sua marca, seu logo e alunos ilimitados.",
      bullets: [
        "Aplicativo no bolso do aluno com seu logotipo oficial",
        "Alunos ilimitados em ambos os planos para você crescer sem travas",
        isPro ? "Suporte prioritário direto via WhatsApp com especialistas" : "Suporte padrão completo e onboarding simplificado",
      ],
      highlightBox: isPro
        ? "Você vira a referência: o aluno sente que você tem uma equipe própria de tecnologia."
        : "Postura de profissional moderno desde o primeiro aluno da sua carteira.",
    },
    {
      icon: Calculator,
      tag: "ANÁLISE FINANCEIRA",
      title: isPro
        ? "Comece hoje por R$ 0,00: 3 dias grátis + 2 meses de economia"
        : "Comece hoje por R$ 0,00: 3 dias grátis e cancele quando quiser",
      subtitle: isPro
        ? "O plano anual de R$ 497 equivale a R$ 41,41/mês — economia de R$ 41,80/ano!"
        : "Apenas R$ 44,90/mês a partir do 4º dia, sem taxa de adesão e sem fidelidade.",
      description: isPro
        ? "No checkout você paga R$ 0,00 hoje. O cartão é apenas validado com segurança pela Stripe. Você aproveita 3 dias inteiros de teste. No 4º dia, o valor anual de R$ 497 é debitado (menos que 1 mensalidade de aluno por ano!). Cancele com 1 clique antes do 4º dia pelo Portal Stripe sem custo."
        : "No checkout você paga R$ 0,00 hoje. Após os 3 dias grátis, o valor é de apenas R$ 44,90/mês (menos de R$ 1,50 por dia). Sem taxa de adesão, sem contrato de fidelidade de 12 meses e cancelamento autônomo com 1 clique pelo Portal do Cliente Stripe.",
      bullets: [
        "Hoje no Checkout: R$ 0,00 (validação segura pelo Stripe)",
        isPro ? "2 meses grátis de economia (R$ 41,80/ano economizados)" : "Renovação mensal flexível sem multas contratuais",
        "Cancelamento com 1 clique antes do 4º dia sem cobrança",
      ],
      highlightBox: isPro
        ? "Custo equivalente a R$ 41,41/mês: 1 único aluno paga o ano inteiro da plataforma."
        : "Menos de R$ 1,50 por dia para ter aplicativo próprio e alunos ilimitados.",
    },
    {
      icon: Layers,
      tag: "ORGANIZAÇÃO & LIBERDADE",
      title: "Chega de mensagens perdidas de domingo no WhatsApp",
      subtitle: "Toda a sua operação de alunos centralizada em um único ecossistema.",
      description:
        "Acabe com o estresse de aluno perguntando qual exercício fazer, mensagens esquecidas em conversas do WhatsApp e PDFs perdidos na memória do celular. O aluno abre o app, vê o treino do dia, assiste ao vídeo da execução e você acompanha tudo pelo painel.",
      bullets: [
        "Histórico de evolução e cargas salvo automaticamente",
        "Acesso 100% gratuito e simplificado para todos os seus alunos",
        "Notificações automáticas de treino e renovação de planos",
      ],
      highlightBox: "Você volta a ter finais de semana livres e descanso garantido.",
    },
  ];

  return (
    <section className="mt-20 border-t border-border/60 pt-16 animate-fade-up">
      {/* Título da Seção */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-primary">
          <Zap className="h-3.5 w-3.5 fill-current" /> Por que o Treino Inteligente?
        </span>
        <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl text-foreground">
          4 motivos definitivos para você{" "}
          <span className="text-primary underline decoration-primary/40 underline-offset-4">
            fazer a transição hoje
          </span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          A combinação perfeita entre tecnologia de ponta, velocidade de prescrição e posicionamento de elite.
        </p>
      </div>

      {/* Grid de 4 Argumentos em Destaque */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {argumentsList.map((arg, idx) => {
          const Icon = arg.icon;
          return (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card/90 to-background p-7 sm:p-8 shadow-card transition-all duration-300 hover:border-primary/50 relative overflow-hidden group"
            >
              <div className="space-y-4">
                {/* Header do Card */}
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary border border-primary/20 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary border border-primary/20">
                    {arg.tag}
                  </span>
                </div>

                {/* Títulos */}
                <div>
                  <h3 className="text-xl font-black text-foreground sm:text-2xl leading-snug">
                    {arg.title}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-primary sm:text-sm">
                    {arg.subtitle}
                  </p>
                </div>

                {/* Descrição */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {arg.description}
                </p>

                {/* Lista de Bullets */}
                <ul className="space-y-2.5 pt-2">
                  {arg.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box de Destaque no Rodapé do Card */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs font-semibold text-primary/90 text-center">
                ✨ {arg.highlightBox}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
