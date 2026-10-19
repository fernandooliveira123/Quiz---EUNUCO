import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Smartphone,
  Dumbbell,
  Activity,
  ClipboardList,
  Bell,
  TrendingUp,
  Zap,
  PieChart,
  CheckSquare,
  Calendar,
} from "lucide-react";

import TrainingImg from "@/assets/app-mockups/mck_3d_training.webp";
import PeriodizationImg from "@/assets/app-mockups/mck_3d_periodization.webp";
import ExerciseImg from "@/assets/app-mockups/mck_3d_exercise.webp";
import CardioImg from "@/assets/app-mockups/mck_3d_cardio.webp";
import ProtocolImg from "@/assets/app-mockups/mck_3d_protocol.webp";
import EvaluationImg from "@/assets/app-mockups/mck_3d_evaluation.webp";
import PerformanceMetricsImg from "@/assets/app-mockups/mck_3d_performance_metrics.webp";
import VolumeMuscleImg from "@/assets/app-mockups/mck_3d_volume_muscle.webp";
import PseHistoryImg from "@/assets/app-mockups/mck_3d_pse_history.webp";
import PlannedExecutedImg from "@/assets/app-mockups/mck_3d_planned_executed.webp";
import MgmtImg from "@/assets/app-mockups/mck_3d_mgmt.webp";
import NotificationsImg from "@/assets/app-mockups/mck_3d_notifications.webp";
import MenuImg from "@/assets/app-mockups/mck_3d_menu.webp";

interface ScreenItem {
  id: string;
  title: string;
  desc: string;
  badge: string;
  image: string;
  icon: typeof Dumbbell;
}

const SCREENS: ScreenItem[] = [
  {
    id: "screen-3d-training",
    title: "PRESCRIÇÃO DE TREINOS",
    desc: "Crie e organize os treinos dos seus alunos de forma prática e profissional.",
    badge: "Treino do Aluno",
    image: TrainingImg,
    icon: Dumbbell,
  },
  {
    id: "screen-3d-periodization",
    title: "PERIODIZAÇÃO & MICROCICLOS",
    desc: "Organize o plano de treinamento em microciclos (ordinário, choque, estabilizador, regenerativo) com progressão automática de cargas e séries.",
    badge: "Periodização Científica",
    image: PeriodizationImg,
    icon: Calendar,
  },
  {
    id: "screen-3d-exercise",
    title: "HISTÓRICO DE CARGAS INTEGRADO",
    desc: "O aluno registra o peso de cada série e acompanha a evolução real da força com intervalos de descanso cronometrados.",
    badge: "Progressão de Carga",
    image: ExerciseImg,
    icon: TrendingUp,
  },
  {
    id: "screen-3d-cardio",
    title: "VÍDEOS & INSTRUÇÕES DE EXECUÇÃO",
    desc: "Instruções completas com vídeos demonstrativos de execução em alta resolução integrados direto no app, sem mandar o aluno para o YouTube.",
    badge: "Vídeos Demonstrativos",
    image: CardioImg,
    icon: Activity,
  },
  {
    id: "screen-3d-protocol",
    title: "PROTOCOLOS DE AVALIAÇÃO FÍSICA",
    desc: "Múltiplos protocolos científicos inclusos: Pollock 3 Dobras, Pollock 7 Dobras e Circunferências (US Navy) para avaliações presenciais ou online.",
    badge: "Avaliação Corporal",
    image: ProtocolImg,
    icon: ClipboardList,
  },
  {
    id: "screen-3d-evaluation",
    title: "COMPOSIÇÃO CORPORAL INTELIGENTE",
    desc: "Gráficos automáticos de evolução do percentual de gordura (%BF), massa magra e IMC gerados instantaneamente a cada reavaliação.",
    badge: "Evolução do Aluno",
    image: EvaluationImg,
    icon: Zap,
  },
  {
    id: "screen-3d-performance-metrics",
    title: "ANÁLISE DE DESEMPENHO COMPLETA",
    desc: "Painel avançado com estatísticas de volume total (kg), número de séries, repetições acumuladas e percepção subjetiva de esforço (PSE) média.",
    badge: "Dashboard de Desempenho",
    image: PerformanceMetricsImg,
    icon: TrendingUp,
  },
  {
    id: "screen-3d-volume-muscle",
    title: "VOLUME POR GRUPO MUSCULAR",
    desc: "Gráficos visuais interativos que destrincham o volume semanal prescrito por grupamento muscular para garantir equilíbrio articular e hipertrofia.",
    badge: "Gráficos Científicos",
    image: VolumeMuscleImg,
    icon: PieChart,
  },
  {
    id: "screen-3d-pse-history",
    title: "HISTÓRICO DE ESFORÇO (PSE-S)",
    desc: "Monitore a curva de intensidade e percepção de esforço relatada pelos alunos ao longo das semanas, prevenindo overtraining e estagnação.",
    badge: "Monitoramento de Esforço",
    image: PseHistoryImg,
    icon: Activity,
  },
  {
    id: "screen-3d-planned-executed",
    title: "PLANEJADO VS EXECUTADO",
    desc: "Acompanhe com precisão a aderência do aluno com percentual de séries concluídas e frequência real nos treinos prescritos.",
    badge: "Metas de Adesão",
    image: PlannedExecutedImg,
    icon: CheckSquare,
  },
  {
    id: "screen-3d-mgmt",
    title: "GESTÃO INTELIGENTE DE ALUNOS",
    desc: "Controle de alunos ativos, convites enviados e acessos liberados de forma limpa, direta e com busca instantânea.",
    badge: "Gestão de Alunos",
    image: MgmtImg,
    icon: Smartphone,
  },
  {
    id: "screen-3d-notifications",
    title: "CENTRAL DE NOTIFICAÇÕES EM TEMPO REAL",
    desc: "Acompanhe notificações instantâneas quando o aluno finaliza o treino do dia, responde à anamnese ou relata feedback.",
    badge: "Notificações Imediatas",
    image: NotificationsImg,
    icon: Bell,
  },
  {
    id: "screen-3d-menu",
    title: "PAINEL COMPLETO DO PERSONAL",
    desc: "Menu interativo com acesso rápido ao perfil profissional, gestão de alunos, biblioteca de métodos avançados e relatórios.",
    badge: "Painel do Personal",
    image: MenuImg,
    icon: Sparkles,
  },
];

export function AppMockup3DCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const mouseStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SCREENS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SCREENS.length) % SCREENS.length);
  };

  const selectSlide = (index: number) => {
    setActiveIdx(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPaused, activeIdx]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    setIsPaused(false);

    const touch = e.changedTouches[0];
    if (!touch) {
      touchStartRef.current = null;
      return;
    }
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartRef.current = { x: e.clientX, y: e.clientY };
    setIsPaused(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mouseStartRef.current) return;
    setIsPaused(false);

    const diffX = e.clientX - mouseStartRef.current.x;
    const diffY = e.clientY - mouseStartRef.current.y;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    mouseStartRef.current = null;
  };

  const handleMouseLeave = () => {
    mouseStartRef.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id="app-funcionalidades-carousel"
      className="relative my-16 rounded-3xl border border-primary/20 bg-gradient-to-b from-[#050810] via-card/90 to-[#050810] py-10 sm:py-16 overflow-hidden shadow-2xl"
    >
      {/* Background glow neon */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 filter blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[15%] w-72 h-72 rounded-full bg-primary/5 filter blur-[100px] pointer-events-none" />

      {/* Decorative vertical mask fades */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#050810] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#050810] via-transparent to-transparent z-10 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs tracking-wider uppercase mb-3 font-bold">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary fill-primary" />
            Recursos da Plataforma
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-foreground tracking-tight leading-tight">
            O que você vai <span className="text-primary underline decoration-primary/40 underline-offset-4">testar por dentro</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Cada detalhe foi desenhado por quem vive a rotina da consultoria física e online para deixar sua prescrição mais simples, rápida e extremamente profissional.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto flex flex-col items-center justify-center p-2 select-none cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Display Stage with 3D coverflow effect */}
          <div className="w-full relative flex items-center justify-center min-h-[440px] min-[380px]:min-h-[480px] sm:min-h-[580px] overflow-x-clip overflow-y-visible md:overflow-visible">
            {SCREENS.map((screen, idx) => {
              let position = idx - activeIdx;
              const len = SCREENS.length;
              if (position < -len / 2) position += len;
              if (position > len / 2) position -= len;

              const isActive = position === 0;
              const isLeft = position === -1;
              const isRight = position === 1;
              const isFarLeft = position === -2;
              const isFarRight = position === 2;

              let visibleClass = "hidden";
              if (isActive || isLeft || isRight || isFarLeft || isFarRight) {
                visibleClass = "flex";
              }

              let transformStyle = {};
              let zIndex = 10;
              let opacity = 1;

              if (isMobile) {
                if (isActive) {
                  transformStyle = { transform: "perspective(1000px) translate3d(0, -10px, 30px) scale(0.96)" };
                  zIndex = 30;
                  opacity = 1;
                } else if (isLeft) {
                  transformStyle = { transform: "perspective(1000px) translate3d(-85px, 0, -80px) rotateY(22deg) scale(0.72)" };
                  zIndex = 20;
                  opacity = 0.45;
                } else if (isRight) {
                  transformStyle = { transform: "perspective(1000px) translate3d(85px, 0, -80px) rotateY(-22deg) scale(0.72)" };
                  zIndex = 20;
                  opacity = 0.45;
                } else if (isFarLeft) {
                  transformStyle = { transform: "perspective(1000px) translate3d(-140px, 5px, -140px) rotateY(32deg) scale(0.55)" };
                  zIndex = 10;
                  opacity = 0.15;
                } else if (isFarRight) {
                  transformStyle = { transform: "perspective(1000px) translate3d(140px, 5px, -140px) rotateY(-32deg) scale(0.55)" };
                  zIndex = 10;
                  opacity = 0.15;
                }
              } else {
                if (isActive) {
                  transformStyle = { transform: "perspective(1000px) translate3d(0, -10px, 50px) scale(1.08)" };
                  zIndex = 30;
                  opacity = 1;
                } else if (isLeft) {
                  transformStyle = { transform: "perspective(1000px) translate3d(-175px, 0, -60px) rotateY(18deg) scale(0.9)" };
                  zIndex = 20;
                  opacity = 0.55;
                } else if (isRight) {
                  transformStyle = { transform: "perspective(1000px) translate3d(175px, 0, -60px) rotateY(-18deg) scale(0.9)" };
                  zIndex = 20;
                  opacity = 0.55;
                } else if (isFarLeft) {
                  transformStyle = { transform: "perspective(1000px) translate3d(-315px, 10px, -140px) rotateY(32deg) scale(0.78)" };
                  zIndex = 10;
                  opacity = 0.25;
                } else if (isFarRight) {
                  transformStyle = { transform: "perspective(1000px) translate3d(315px, 10px, -140px) rotateY(-32deg) scale(0.78)" };
                  zIndex = 10;
                  opacity = 0.25;
                }
              }

              return (
                <div
                  key={screen.id}
                  id={screen.id}
                  onClick={() => selectSlide(idx)}
                  style={{ ...transformStyle, zIndex, opacity }}
                  className={`absolute transition-all duration-700 ease-out cursor-pointer flex-col items-center select-none ${visibleClass}`}
                >
                  {/* Smartphone Bezel */}
                  <div
                    className={`relative w-[200px] h-[390px] min-[380px]:w-[220px] min-[380px]:h-[430px] sm:w-[250px] sm:h-[490px] rounded-[2.5rem] bg-slate-900 border-[7px] border-slate-800 shadow-2xl transition-all duration-500 flex flex-col overflow-hidden ${
                      isActive
                        ? "shadow-[0_0_40px_rgba(16,185,129,0.35)] border-primary/50"
                        : "shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                    }`}
                  >
                    {/* Active Accent Glow Border */}
                    {isActive && (
                      <div className="absolute inset-0 border border-primary/30 rounded-[2.2rem] pointer-events-none z-30" />
                    )}

                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#111] absolute right-3" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1a0dab]/30 absolute left-4" />
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-30" />

                    {/* Screenshot Area */}
                    <div className="w-full h-full relative bg-slate-950 overflow-hidden">
                      <img
                        src={screen.image}
                        alt={screen.title}
                        loading="lazy"
                        width={280}
                        height={607}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                      {/* Reflection gradient overlay */}
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 -translate-x-1/3 z-20 pointer-events-none opacity-30" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-5 sm:gap-7 mt-8 z-20 relative">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Tela anterior"
              className="cursor-pointer p-3 sm:p-3.5 rounded-full bg-card border border-border/80 text-foreground hover:text-primary hover:border-primary/50 hover:bg-card/80 transition-all shadow-lg active:scale-95 flex items-center justify-center group"
            >
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Bullet Indicators */}
            <div
              className="flex gap-2 max-w-[260px] sm:max-w-none overflow-x-auto sm:overflow-visible py-1 px-2 items-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {SCREENS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectSlide(idx)}
                  className={`cursor-pointer h-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                    activeIdx === idx
                      ? "w-8 bg-primary shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                      : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Ir para tela ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Próxima tela"
              className="cursor-pointer p-3 sm:p-3.5 rounded-full bg-card border border-border/80 text-foreground hover:text-primary hover:border-primary/50 hover:bg-card/80 transition-all shadow-lg active:scale-95 flex items-center justify-center group"
            >
              <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Text Info Below Carousel matching user screenshot */}
          {(() => {
            const currentScreen = SCREENS[activeIdx] ?? (SCREENS[0] as ScreenItem);
            return (
              <div className="mt-7 text-center max-w-xl mx-auto px-4 animate-fade-in">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/10 text-[11px] font-mono uppercase font-black mb-3">
                  <span>{currentScreen.badge}</span>
                  <span className="opacity-40">•</span>
                  <span>
                    {activeIdx + 1} de {SCREENS.length}
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-primary uppercase tracking-wide transition-all duration-300">
                  {currentScreen.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed transition-all duration-300">
                  {currentScreen.desc}
                </p>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
