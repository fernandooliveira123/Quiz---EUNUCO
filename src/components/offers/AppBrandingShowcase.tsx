import { useState } from "react";
import {
  Sparkles,
  Check,
  Eye,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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
    mobileLabel: "1. Configurar",
    title: "1. Como Personalizar",
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
    mobileLabel: "2. No Celular",
    title: "2. No Celular do Aluno",
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
    mobileLabel: "3. O App",
    title: "3. App em Ação",
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

export function AppBrandingShowcase({ plan = "pro" }: AppBrandingShowcaseProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const activeTab = MOCKUP_TABS[activeTabIdx] ?? MOCKUP_TABS[0]!;

  const handlePrev = () => {
    setActiveTabIdx((prev) => (prev - 1 + MOCKUP_TABS.length) % MOCKUP_TABS.length);
  };

  const handleNext = () => {
    setActiveTabIdx((prev) => (prev + 1) % MOCKUP_TABS.length);
  };

  return (
    <section className="my-12 sm:my-20 relative w-full overflow-hidden px-1 sm:px-0">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-primary/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Header da Seção */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-primary shadow-glow">
          <Sparkles className="h-3.5 w-3.5" />
          Personalização Real com a Sua Marca
        </span>
        <h2 className="mt-2.5 text-xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight">
          Do cadastro da sua logo até o celular do seu aluno: 100% com a sua identidade
        </h2>
        <p className="mt-2 text-xs sm:text-base text-muted-foreground leading-relaxed px-2">
          Veja abaixo as telas reais: como você escolhe as cores e a logo, como o ícone fica instalado no
          smartphone do aluno e o painel em funcionamento no dia a dia.
        </p>
      </div>

      {/* Seletor em Abas dos 3 Mockups - 100% Responsivo em Grid (Zero corte / Zero overflow) */}
      <div className="w-full max-w-xl mx-auto mb-6 sm:mb-8">
        <div className="grid grid-cols-3 gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-2xl bg-card border border-border/80 shadow-inner">
          {MOCKUP_TABS.map((tab, idx) => {
            const isSelected = activeTabIdx === idx;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabIdx(idx)}
                className={`py-2 sm:py-2.5 px-1 sm:px-3 rounded-xl font-black text-center transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-glow scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <span className="text-[11px] sm:text-xs md:text-sm leading-tight block truncate">
                  <span className="sm:hidden">{tab.mobileLabel}</span>
                  <span className="hidden sm:inline">{tab.title}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vitrine Principal do Mockup Selecionado */}
      <div className="rounded-2xl sm:rounded-3xl border border-border/90 bg-card/90 shadow-2xl p-3.5 sm:p-6 lg:p-8 relative overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Lado Esquerdo: Imagem do Mockup */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-none rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-zinc-800 bg-black shadow-2xl overflow-hidden group">
              <img
                src={activeTab.image}
                alt={activeTab.alt}
                className="w-full h-auto max-h-[360px] sm:max-h-[500px] object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Tag de identificação sobre a imagem */}
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-background/90 backdrop-blur-md border border-primary/40 rounded-lg sm:rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-md flex items-center gap-1.5 sm:gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold text-foreground truncate max-w-[220px]">
                  {activeTab.subtitle}
                </span>
              </div>

              {/* Botões de seta para navegar entre os 3 mockups na própria imagem */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-all shadow-md z-10"
                aria-label="Mockup anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-all shadow-md z-10"
                aria-label="Próximo mockup"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2.5 text-center text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1.5">
              <Eye className="h-3 w-3 text-primary shrink-0" />
              <span>Print real capturado diretamente da plataforma</span>
            </div>
          </div>

          {/* Lado Direito: Explicação Detalhada do Mockup Selecionado */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="inline-block rounded-full bg-primary/15 border border-primary/30 px-2.5 py-0.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-primary">
                {activeTab.tag}
              </span>
              <h3 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-black text-foreground leading-tight">
                {activeTab.subtitle}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Tudo foi projetado para que o seu aluno tenha certeza de que está utilizando um aplicativo
                proprietário da sua consultoria esportiva.
              </p>
            </div>

            {/* Lista dos 4 destaques desta tela */}
            <div className="space-y-2 pt-1">
              {activeTab.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-background/50 p-2.5 sm:p-3">
                  <div className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <div className="text-xs sm:text-sm leading-snug">
                    <strong className="text-foreground font-bold">{h.title}</strong>{" "}
                    <span className="text-muted-foreground">{h.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão de Próxima Tela */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline cursor-pointer"
              >
                <span>Ver próxima etapa da personalização</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Miniaturas de Acesso Rápido - 3 Colunas Perfeitas no Mobile */}
        <div className="mt-6 pt-5 border-t border-border/80">
          <div className="text-[11px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 text-center sm:text-left">
            Toque para alternar entre as 3 etapas:
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {MOCKUP_TABS.map((tab, idx) => {
              const isSelected = activeTabIdx === idx;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`rounded-xl sm:rounded-2xl border p-1.5 sm:p-3 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-glow ring-2 ring-primary"
                      : "border-border/80 bg-background/60 hover:bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="h-10 w-9 sm:h-14 sm:w-12 rounded-lg sm:rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
                    <img src={tab.image} alt={tab.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 text-center sm:text-left">
                    <span className="text-[10px] sm:text-xs font-black text-foreground block truncate">
                      {tab.mobileLabel}
                    </span>
                    <span className="hidden sm:block text-[11px] text-muted-foreground line-clamp-1">
                      {tab.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
