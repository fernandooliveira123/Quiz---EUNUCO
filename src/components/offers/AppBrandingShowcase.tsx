import { useState } from "react";
import {
  Sparkles,
  Smartphone,
  Palette,
  CheckCircle2,
  Flame,
  ArrowRight,
  ShieldCheck,
  Award,
  Eye,
  Sliders,
} from "lucide-react";
import installedHomeScreenImg from "@/assets/app_installed_home_screen.png";

interface AppBrandingShowcaseProps {
  plan?: "pro" | "start";
}

const COLOR_PRESETS = [
  { id: "emerald", label: "Verde Esmeralda", color: "#10b981", border: "border-emerald-500", glow: "shadow-emerald-500/30" },
  { id: "cyan", label: "Azul Cyan", color: "#06b6d4", border: "border-cyan-500", glow: "shadow-cyan-500/30" },
  { id: "amber", label: "Dourado / Laranja", color: "#f59e0b", border: "border-amber-500", glow: "shadow-amber-500/30" },
  { id: "violet", label: "Roxo Tech", color: "#8b5cf6", border: "border-violet-500", glow: "shadow-violet-500/30" },
  { id: "rose", label: "Vermelho Crimson", color: "#f43f5e", border: "border-rose-500", glow: "shadow-rose-500/30" },
];

export function AppBrandingShowcase({ plan = "pro" }: AppBrandingShowcaseProps) {
  const [trainerName, setTrainerName] = useState("Fernando Oliveira");
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]!);

  const pillars = [
    {
      icon: Smartphone,
      title: "Ícone Próprio na Tela Inicial",
      description:
        "O aluno instala o aplicativo e o ícone com a sua logo e seu nome fica na tela inicial do celular dele, exatamente ao lado de apps como Instagram e WhatsApp.",
      tag: "100% Exclusivo",
    },
    {
      icon: Palette,
      title: "Cores da Sua Consultoria",
      description:
        "O aplicativo adota a identidade visual da sua marca. Seja verde, azul, laranja ou roxo, cada botão, gráfico e detalhe respeita sua paleta.",
      tag: "Identidade Visual",
    },
    {
      icon: Award,
      title: "Sua Logo em Todas as Telas",
      description:
        "Na tela de abertura, no cabeçalho dos treinos, no histórico de evolução e nos relatórios de avaliação física: a sua marca é a única que aparece.",
      tag: "Sem Marcas Terceiras",
    },
    {
      icon: ShieldCheck,
      title: "Percepção de Consultoria Premium",
      description:
        "Seus alunos sentem que têm acesso a uma tecnologia proprietária desenvolvida especialmente por você. Isso justifica planos de R$ 250 a R$ 400 por aluno.",
      tag: "Valor Percebido",
    },
  ];

  return (
    <section className="my-16 sm:my-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header da Seção */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-primary shadow-glow">
          <Sparkles className="h-3.5 w-3.5" />
          Personalização Real com a Sua Marca
        </span>
        <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
          Veja como o seu aplicativo fica instalado no celular do seu aluno
        </h2>
        <p className="mt-3 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
          Seus alunos não instalam um aplicativo de terceiros. Eles instalam o{" "}
          <strong className="text-foreground">SEU aplicativo</strong>, com a sua logo oficial no ícone, o seu nome
          na tela inicial e as cores da sua consultoria.
        </p>
      </div>

      {/* Grid Principal: Mockup Real do Smartphone + Pilares de Personalização */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Coluna da Esquerda: Print Real com Mockup de Smartphone Interativo */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[2.5rem] p-3 sm:p-4 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black border-4 border-zinc-700/80 shadow-2xl relative overflow-hidden group">
            {/* Notch / Speaker do Smartphone */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-b-xl z-20 flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-10 h-1 rounded-full bg-zinc-800" />
            </div>

            {/* Tela com o Print Real da Home do Smartphone */}
            <div className="relative rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-inner">
              <img
                src={installedHomeScreenImg}
                alt="Aplicativo do Personal Trainer instalado na tela inicial do celular com ícone e nome próprios"
                className="w-full h-auto object-cover rounded-[2rem] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Destaque / Pin Animado sobre o Ícone do Personal */}
              <div className="absolute right-4 bottom-[28%] sm:right-6 sm:bottom-[30%] pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <span className="absolute h-16 w-16 rounded-2xl bg-primary/30 animate-ping opacity-75" />
                  <span className="relative h-14 w-14 rounded-2xl border-2 border-primary shadow-glow bg-transparent" />
                </div>
              </div>

              {/* Tag Flutuante de Destaque */}
              <div className="absolute bottom-4 inset-x-3 sm:inset-x-4 bg-background/90 backdrop-blur-md border border-primary/40 rounded-2xl p-3 shadow-card text-left">
                <div className="flex items-center gap-2 text-primary font-black text-xs">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span>APP INSTALADO NA TELA INICIAL</span>
                </div>
                <p className="mt-1 text-[11px] sm:text-xs text-foreground/90 font-medium leading-snug">
                  • <strong>Ícone Oficial:</strong> Logo do personal trainer.<br />
                  • <strong>Título no celular:</strong> {trainerName || "Seu Nome"}.<br />
                  • <strong>Zero marcas de concorrentes:</strong> Seu aluno só vê a SUA consultoria.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-muted-foreground flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span>Print real do aplicativo instalado no smartphone do aluno</span>
          </div>
        </div>

        {/* Coluna da Direita: Os 4 Pilares + Simulador de Marca */}
        <div className="lg:col-span-6 space-y-6">
          {/* Mini Simulador Interativo */}
          <div className="rounded-3xl border border-primary/30 bg-card/90 p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-sm sm:text-base text-foreground">
                  Simule o seu aplicativo agora
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider rounded-full bg-primary/15 px-2.5 py-0.5 text-primary">
                Interativo
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Digite o seu nome ou o nome da sua consultoria:
                </label>
                <input
                  type="text"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                  placeholder="Ex: Fernando Oliveira, Team Lucas..."
                  className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm font-bold text-foreground focus:outline-none focus:border-primary"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  Escolha a cor principal da sua marca:
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedColor(p)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedColor.id === p.id
                          ? `${p.border} bg-card text-foreground shadow-sm ring-2 ring-primary`
                          : "border-border/60 bg-background/60 text-muted-foreground hover:bg-card"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview do Ícone Customizado */}
              <div className="rounded-2xl border border-border/80 bg-background/60 p-3.5 flex items-center gap-3.5">
                <div
                  className="h-14 w-14 rounded-2xl flex flex-col items-center justify-center p-1.5 text-center shadow-lg transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    border: `2px solid ${selectedColor.color}`,
                    boxShadow: `0 0 15px ${selectedColor.color}40`,
                  }}
                >
                  <div className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black" style={{ color: selectedColor.color }}>
                    🏋️
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-tight text-zinc-900 leading-none mt-0.5">
                    {trainerName.split(" ")[0]?.slice(0, 8) || "TEAM"}
                  </span>
                  <span className="text-[6px] font-bold uppercase text-zinc-600 leading-none">
                    PRO
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-foreground truncate">
                    {trainerName || "Sua Consultoria"}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Ícone renderizado na tela inicial com as cores e o nome oficial da sua consultoria.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Os 4 Cards de Pilares */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm hover:border-primary/40 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold text-primary rounded-full bg-primary/10 px-2 py-0.5">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
