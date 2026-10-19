import {
  Dumbbell,
  PlaySquare,
  Calendar,
  ClipboardCheck,
  PieChart,
  Activity,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function AppFeaturesGrid() {
  const features = [
    {
      icon: Dumbbell,
      tag: "AGILIDADE",
      title: "Prescrição em até 3 Minutos",
      description:
        "Crie, duplique ou adapte fichas completas em segundos com templates inteligentes. O fim das planilhas travadas e noites gastas no computador.",
      bullets: [
        "Clonagem de treinos com 1 toque",
        "Substituição imediata de exercícios",
        "Histórico de evolução por aluno",
      ],
    },
    {
      icon: PlaySquare,
      tag: "AUTONOMIA TOTAL",
      title: "+400 Vídeos Nativos + Envie os Seus",
      description:
        "A plataforma já vem com mais de 400 vídeos demonstrativos em alta definição. E você pode subir seus próprios vídeos e cadastrar modalidades personalizadas (como Kettlebell, LPO, Cross, Calistenia ou Funcional).",
      bullets: [
        "+400 vídeos demonstrativos em HD inclusos",
        "Upload dos seus próprios vídeos gravados",
        "Crie modalidades personalizadas (Kettlebell, etc.)",
      ],
    },
    {
      icon: Calendar,
      tag: "CIÊNCIA DO ESPORTE",
      title: "Periodização & Microciclos",
      description:
        "Estruture o planejamento anual e mensal em microciclos (ordinário, choque, estabilizador e regenerativo) com progressão programada.",
      bullets: [
        "Variação automática de séries e repetições",
        "Organização de blocos de hipertrofia e força",
        "Planejamento visual a longo prazo",
      ],
    },
    {
      icon: ClipboardCheck,
      tag: "AVALIAÇÃO CORPORAL",
      title: "Protocolos Científicos Validados",
      description:
        "Realize avaliações físicas com Pollock 3 Dobras, Pollock 7 Dobras e Circunferências (US Navy). Compare fotos de antes e depois lado a lado.",
      bullets: [
        "Cálculo automático de %BF e massa magra",
        "Fotos comparativas com marcação",
        "Relatório em PDF pronto para compartilhar",
      ],
    },
    {
      icon: PieChart,
      tag: "ANÁLISE DE DADOS",
      title: "Volume por Grupo Muscular",
      description:
        "Monitore o número exato de séries e tonelagem semanal prescrita para peito, costas, pernas e core, evitando desbalanços articulares.",
      bullets: [
        "Gráficos interativos por grupo muscular",
        "Equilíbrio de volume agonista/antagonista",
        "Evite overtraining e lesões",
      ],
    },
    {
      icon: Activity,
      tag: "MONITORAMENTO REAL",
      title: "Planejado vs Executado & PSE-S",
      description:
        "O aluno registra a carga utilizada na academia e a Percepção Subjetiva de Esforço (PSE). Você vê exatamente se o plano foi cumprido.",
      bullets: [
        "Adesão real às séries prescritas",
        "Curva de esforço e intensidade",
        "Avisos automáticos de treinos concluídos",
      ],
    },
  ];

  return (
    <section className="my-16 border-t border-border/60 pt-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs tracking-wider uppercase mb-3 font-bold">
          <Sparkles className="h-3.5 w-3.5 fill-primary text-primary" />
          Muito Mais do que Sua Logo
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
          Uma plataforma completa de{" "}
          <span className="text-primary underline decoration-primary/40 underline-offset-4">
            prescrição e ciência do treinamento
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Além de ter o seu próprio aplicativo personalizado, você entrega uma experiência técnica de alto nível que justifica cobrar mensalidades mais altas da sua consultoria.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card/90 to-background p-6 sm:p-7 shadow-card transition-all duration-300 hover:border-primary/50 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary border border-primary/20 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary border border-primary/20">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-5 border-t border-border/50 pt-4 space-y-2">
                {feat.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-foreground/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
