import { useState } from "react";
import {
  Sparkles,
  Smartphone,
  Palette,
  CheckCircle2,
  Sliders,
  LayoutDashboard,
  Check,
  Eye,
  Layers,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import installedHomeScreenImg from "@/assets/app_installed_home_screen.png";
import settingsBrandingImg from "@/assets/app_settings_branding.png";
import dashboardCustomizedImg from "@/assets/app_dashboard_customized.png";

interface AppBrandingShowcaseProps {
  plan?: "pro" | "start";
}

const MOCKUP_TABS = [
  {
    id: "settings",
    title: "1. Como Você Personaliza",
    subtitle: "Painel de Identidade Visual & Cores",
    tag: "Fácil & Rápido",
    image: settingsBrandingImg,
    alt: "Tela de configurações onde o personal trainer faz upload da sua logo, escolhe o estilo de fundo e a cor da marca",
    highlights: [
      { title: "Upload da Sua Logo:", desc: "Envie seu logotipo e foto profissional em segundos." },
      { title: "Nome da Sua Marca:", desc: "O nome da sua consultoria exibido no topo para todos os alunos." },
      { title: "5 Estilos de Fundo:", desc: "Midnight Slate, Pure OLED, Verde Performance, Obsidian e Clean Light." },
      { title: "Paletas Pré-definidas:", desc: "Verde Titanium, Azul Elétrico, Roxo Ultra Violeta e Dourado Champagne." },
    ],
  },
  {
    id: "home",
    title: "2. Na Tela do Celular do Aluno",
    subtitle: "Ícone Nativo com a Sua Logo",
    tag: "Máxima Autoridade",
    image: installedHomeScreenImg,
    alt: "Aplicativo instalado na tela inicial do celular do aluno com o ícone da logo e nome do personal trainer",
    highlights: [
      { title: "Ícone Oficial no Celular:", desc: "O aluno abre a tela inicial do celular e vê o app com o SEU ícone." },
      { title: "Seu Nome na Home:", desc: "Fica salvo com o seu nome (ex: Fernando Oliveira), ao lado de apps gigantes." },
      { title: "Zero Marcas Concorrentes:", desc: "O aluno não sabe de intermediários; o mérito da tecnologia é 100% seu." },
      { title: "Fidelização Extrema:", desc: "O aluno treina todos os dias olhando para a SUA marca no smartphone dele." },
    ],
  },
  {
    id: "dashboard",
    title: "3. O App em Ação no Dia a Dia",
    subtitle: "Dashboard & Gestão de Treinos",
    tag: "Experiência Completa",
    image: dashboardCustomizedImg,
    alt: "Dashboard completo do personal trainer com a logo personalizada, alunos ativos e acompanhamento de PSE",
    highlights: [
      { title: "Logo Fixa na Navegação:", desc: "Sua identidade presente no topo da barra lateral e em todas as páginas." },
      { title: "Boas-vindas Personalizadas:", desc: "'Olá, [Seu Nome]!' — plataforma moldada para sua rotina de atendimento." },
      { title: "Feedbacks & PSE em Tempo Real:", desc: "Acompanhe o esforço percebido (PSE 1 a 10) e comentários de cada treino." },
      { title: "Alunos Ilimitados:", desc: "Adicione quantos alunos quiser sem bloqueios ou cobranças adicionais." },
    ],
  },
];

const COLOR_PRESETS = [
  { id: "emerald", label: "Verde Titanium", color: "#10b981", border: "border-emerald-500", glow: "shadow-emerald-500/30" },
  { id: "cyan", label: "Azul Elétrico", color: "#06b6d4", border: "border-cyan-500", glow: "shadow-cyan-500/30" },
  { id: "amber", label: "Dourado Champagne", color: "#f59e0b", border: "border-amber-500", glow: "shadow-amber-500/30" },
  { id: "violet", label: "Roxo Ultra Violeta", color: "#8b5cf6", border: "border-violet-500", glow: "shadow-violet-500/30" },
];

export function AppBrandingShowcase({ plan = "pro" }: AppBrandingShowcaseProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [trainerName, setTrainerName] = useState("Fernando Oliveira");
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]!);

  const activeTab = MOCKUP_TABS[activeTabIdx] ?? MOCKUP_TABS[0]!;

  return (
    <section className="my-16 sm:my-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header da Seção */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-primary shadow-glow">
          <Sparkles className="h-3.5 w-3.5" />
          Personalização Real com a Sua Marca
        </span>
        <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
          Do cadastro da sua logo até o celular do seu aluno: 100% com a sua identidade
        </h2>
        <p className="mt-3 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
          Veja abaixo as telas reais da plataforma: como você personaliza as cores e a logo, como o ícone fica
          instalado no smartphone do seu aluno e o painel em funcionamento no dia a dia.
        </p>
      </div>

      {/* Seletor em Abas dos 3 Mockups */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {MOCKUP_TABS.map((tab, idx) => {
          const isSelected = activeTabIdx === idx;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabIdx(idx)}
              className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all border whitespace-nowrap ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-glow scale-[1.02]"
                  : "bg-card/80 text-muted-foreground hover:bg-card border-border/80 hover:text-foreground"
              }`}
            >
              <span>{tab.title}</span>
              <span
                className={`hidden md:inline-block text-[10px] uppercase font-bold rounded-full px-2 py-0.5 ${
                  isSelected ? "bg-black/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {tab.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Vitrine Principal do Mockup Selecionado */}
      <div className="rounded-3xl border-2 border-border/90 bg-card/90 shadow-2xl p-5 sm:p-8 lg:p-10 relative overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Lado Esquerdo: Imagem do Mockup em Moldura Elegante */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-none rounded-3xl border-4 border-zinc-800 bg-black shadow-2xl overflow-hidden group">
              <img
                src={activeTab.image}
                alt={activeTab.alt}
                className="w-full h-auto max-h-[580px] object-contain sm:object-cover mx-auto transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Tag de identificação sobre a imagem */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-background/90 backdrop-blur-md border border-primary/40 rounded-xl px-3 py-1.5 shadow-md flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-bold text-foreground">{activeTab.subtitle}</span>
              </div>
            </div>

            <div className="mt-3 text-center text-xs text-muted-foreground flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-primary" />
              <span>Print real capturado diretamente da plataforma Treino Inteligente</span>
            </div>
          </div>

          {/* Lado Direito: Explicação Detalhada do Mockup Selecionado */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="inline-block rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">
                {activeTab.tag}
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black text-foreground">
                {activeTab.subtitle}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Tudo foi projetado para que o seu aluno tenha certeza de que está utilizando um aplicativo
                proprietário da sua consultoria esportiva.
              </p>
            </div>

            {/* Lista dos 4 destaques desta tela */}
            <div className="space-y-3 pt-2">
              {activeTab.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-border/80 bg-background/50 p-3.5">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <strong className="text-foreground font-bold">{h.title}</strong>{" "}
                    <span className="text-muted-foreground">{h.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão de Próxima Tela */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveTabIdx((prev) => (prev + 1) % MOCKUP_TABS.length)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline cursor-pointer"
              >
                <span>Ver próxima etapa da personalização</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Miniaturas de Acesso Rápido para os 3 Mockups */}
        <div className="mt-8 pt-8 border-t border-border/80">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 text-center sm:text-left">
            Clique para alternar entre as 3 visões da sua marca:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MOCKUP_TABS.map((tab, idx) => {
              const isSelected = activeTabIdx === idx;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`rounded-2xl border p-3 flex items-center gap-3.5 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-glow ring-2 ring-primary"
                      : "border-border/80 bg-background/60 hover:bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="h-14 w-12 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
                    <img src={tab.image} alt={tab.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-black text-foreground block truncate">{tab.title}</span>
                    <span className="text-[11px] text-muted-foreground line-clamp-1">{tab.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mini Simulador Interativo de Nome & Cores (Logo Abaixo dos Mockups) */}
      <div className="mt-8 rounded-3xl border border-primary/30 bg-gradient-to-r from-card/90 via-background to-card/90 p-5 sm:p-7 shadow-card">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left max-w-lg">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-primary">
              <Sliders className="h-3.5 w-3.5" />
              Simulador Instantâneo
            </span>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              Como ficará o ícone do seu app?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Digite seu nome ou sua consultoria e escolha a cor oficial. O Treino Inteligente adapta o aplicativo
              às suas preferências.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="space-y-1.5 w-full sm:w-auto">
              <label className="text-[11px] font-bold text-muted-foreground uppercase">
                Nome da Consultoria / Personal:
              </label>
              <input
                type="text"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                placeholder="Ex: Fernando Oliveira..."
                className="h-10 w-full sm:w-56 px-3 rounded-xl border border-border bg-background text-xs font-bold text-foreground focus:outline-none focus:border-primary"
                maxLength={25}
              />
            </div>

            <div className="space-y-1.5 w-full sm:w-auto">
              <label className="text-[11px] font-bold text-muted-foreground uppercase">
                Cor Oficial da Marca:
              </label>
              <div className="flex items-center gap-2">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedColor(p)}
                    className={`h-9 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
                      selectedColor.id === p.id
                        ? `${p.border} bg-card text-foreground ring-2 ring-primary`
                        : "border-border/60 bg-background/60 text-muted-foreground"
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="hidden sm:inline">{p.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ícone Renderizado */}
            <div
              className="h-14 w-14 rounded-2xl flex flex-col items-center justify-center p-1.5 text-center shadow-lg shrink-0 transition-all duration-300"
              style={{
                backgroundColor: "#ffffff",
                border: `2px solid ${selectedColor.color}`,
                boxShadow: `0 0 16px ${selectedColor.color}45`,
              }}
            >
              <span className="text-base leading-none">🏋️</span>
              <span className="text-[8px] font-black uppercase text-zinc-900 leading-none mt-1 truncate max-w-full">
                {trainerName.split(" ")[0]?.slice(0, 7) || "APP"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
