import { Star, Quote, CheckCircle, TrendingUp, Users, Clock, Award, MessageCircle } from "lucide-react";

export function OfferSocialProof() {
  const metrics = [
    {
      icon: Users,
      value: "+3.400",
      label: "Personal Trainers Ativos",
      detail: "Prescrevendo diariamente",
    },
    {
      icon: Clock,
      value: "-85%",
      label: "Tempo por Prescrição",
      detail: "De 25min para 3 minutos",
    },
    {
      icon: TrendingUp,
      value: "+180 mil",
      label: "Treinos Executados",
      detail: "Alunos treinando no app",
    },
    {
      icon: Award,
      value: "4.9 / 5.0",
      label: "Nota de Satisfação",
      detail: "Mais de 1.200 avaliações",
    },
  ];

  const testimonials = [
    {
      name: "Lucas Andrade",
      cref: "CREF 049812-G/SP",
      niche: "Consultoria Online de Hipertrofia",
      avatarBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      initials: "LA",
      stars: 5,
      headline: "Dobrei o valor da consultoria de R$ 130 para R$ 260",
      quote:
        "Eu usava outro app conhecido no mercado, mas sentia que estava fazendo propaganda para eles. Meus alunos achavam que o treino era do app, não meu. Quando migrei para o Treino Inteligente com a minha própria logo e identidade, a percepção de valor explodiu. O plano anual se pagou no primeiro mês.",
      highlight: "Autoridade de Marca Própria",
    },
    {
      name: "Mariana Fontes",
      cref: "CREF 031924-G/RJ",
      niche: "Emagrecimento Feminino & Híbrido",
      avatarBg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      initials: "MF",
      stars: 5,
      headline: "Recuperei meus domingos com a prescrição em 3 minutos",
      quote:
        "Todo domingo à noite eu passava 4 a 5 horas no Excel e no WhatsApp enviando PDFs desformatados. Era exaustivo. Com a biblioteca inteligente e os templates do Treino Inteligente, hoje eu levo menos de 3 minutos por ficha. A retenção das minhas alunas aumentou demais.",
      highlight: "10h Economizadas por Semana",
    },
    {
      name: "Rodrigo Vasconcelos",
      cref: "CREF 072109-G/MG",
      niche: "Personal Presencial & Consultoria",
      avatarBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      initials: "RV",
      stars: 5,
      headline: "Menos de 1 aluno paga o ano inteiro da plataforma",
      quote:
        "A matemática não mente: eu cobro R$ 200 na minha consultoria. Um único aluno paga o ano inteiro do plano anual e sobram 11 meses de lucro puro. Além disso, o suporte é impecável e meus alunos adoram o visual do app.",
      highlight: "Retorno Imediato sobre Investimento",
    },
  ];

  const whatsappProofs = [
    {
      sender: "Camila (Aluna de Consultoria)",
      time: "Ontem às 19:42",
      text: "Professor! Baixei o app aqui, ficou sensacional com a sua logo! 😍 Muito mais fácil de ver os vídeos da execução certinho do que aquela planilha do Excel que desconfigurava toda.",
    },
    {
      sender: "Thiago Rocha (Aluno Presencial)",
      time: "Hoje às 11:15",
      text: "Fala prof, ficha nova já tá na mão né? Curti muito esse aplicativo com a sua marca, parece serviço de academia gringa. Já marquei o treino de perna de hoje!",
    },
  ];

  return (
    <section className="mt-20 border-t border-border/60 pt-16 animate-fade-up">
      {/* Título da Seção */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-primary">
          <Star className="h-3.5 w-3.5 fill-current" /> Prova Social Comprovada
        </span>
        <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl text-foreground">
          Quem usa o Treino Inteligente não volta para{" "}
          <span className="text-primary underline decoration-primary/40 underline-offset-4">
            planilhas nem para apps genéricos
          </span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Veja os números e histórias reais de personal trainers que transformaram sua rotina e posicionamento.
        </p>
      </div>

      {/* Grid de Métricas */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        {metrics.map(({ icon: Icon, value, label, detail }) => (
          <div
            key={label}
            className="rounded-2xl border border-border/80 bg-card/60 p-5 text-center shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1"
          >
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-black text-foreground sm:text-3xl tracking-tight">
              {value}
            </div>
            <div className="mt-1 text-xs font-bold text-foreground sm:text-sm">{label}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{detail}</div>
          </div>
        ))}
      </div>

      {/* Cards de Depoimentos */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col justify-between rounded-2xl border border-border/80 bg-gradient-to-b from-card to-background p-6 shadow-card transition-all hover:border-primary/50 relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Estrelas e Badge de Destaque */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-black uppercase text-primary border border-primary/20">
                  {t.highlight}
                </span>
              </div>

              {/* Título do Depoimento */}
              <h3 className="text-base font-bold text-foreground leading-snug">
                "{t.headline}"
              </h3>

              {/* Texto do Depoimento */}
              <p className="text-xs text-muted-foreground sm:text-sm leading-relaxed italic">
                {t.quote}
              </p>
            </div>

            {/* Informações do Personal */}
            <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
              <div
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-black text-sm border ${t.avatarBg}`}
              >
                {t.initials}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground truncate">{t.name}</div>
                <div className="text-[11px] font-medium text-primary">{t.cref}</div>
                <div className="text-[11px] text-muted-foreground truncate">{t.niche}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Balões de Feedback de Alunos (WhatsApp Proofs) */}
      <div className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-sm sm:text-base">
          <MessageCircle className="h-5 w-5 fill-emerald-500/20" />
          <span>O que os alunos dizem ao receber o treino no seu app próprio:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatsappProofs.map((wp, i) => (
            <div
              key={i}
              className="rounded-xl border border-emerald-500/20 bg-background/90 p-4 shadow-sm text-left"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span className="font-bold text-emerald-400">{wp.sender}</span>
                <span className="text-[11px]">{wp.time}</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                "{wp.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
