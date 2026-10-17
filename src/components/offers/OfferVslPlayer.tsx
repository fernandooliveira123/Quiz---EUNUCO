import { useState } from "react";
import { Play, Volume2, VolumeX, ShieldCheck, Zap, Sparkles, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import defaultPoster from "@/assets/vsl-poster.jpg";

interface Props {
  videoUrl?: string;
  planTitle: string;
  ctaText?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
}

export function OfferVslPlayer({
  videoUrl,
  planTitle,
  ctaText = "QUERO MEU APLICATIVO AGORA",
  onCtaClick,
  ctaHref,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const hasRealVideo = Boolean(videoUrl && videoUrl.startsWith("http"));

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-up">
      {/* Barra superior de chamada para o som */}
      <div className="mb-3 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-bold text-primary shadow-sm backdrop-blur-sm sm:text-sm">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 animate-bounce text-primary shrink-0" />
          <span>VÍDEO DE DIAGNÓSTICO: Assista à apresentação de 3 minutos com som ligado</span>
        </div>
        <span className="hidden sm:inline-block rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider">
          Exclusivo
        </span>
      </div>

      {/* Container Principal do Player 16:9 */}
      <div className="group relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-primary/40 bg-black shadow-glow">
        {hasRealVideo && isPlaying ? (
          <iframe
            src={videoUrl}
            title={`Apresentação Oficial - ${planTitle}`}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="relative h-full w-full">
            {/* Imagem de Capa do Vídeo */}
            <img
              src={defaultPoster}
              alt="Apresentação do Treino Inteligente para Personal Trainers"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
            />

            {/* Vinheta escura com gradiente de alta conversão */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />

            {/* Badges de topo dentro do vídeo */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/10">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                AO VIVO · APRESENTAÇÃO DA PLATAFORMA
              </span>
              <span className="rounded-lg bg-black/70 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-bold text-white/80 border border-white/10">
                03:24
              </span>
            </div>

            {/* Botão Central de Play com efeito Pulsante */}
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label="Assistir ao vídeo de apresentação"
              className="absolute inset-0 m-auto flex flex-col items-center justify-center gap-3 text-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-primary rounded-2xl p-4 transition-transform active:scale-95"
            >
              <div className="relative grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                <Play className="h-9 w-9 sm:h-11 sm:w-11 fill-current ml-1 text-primary-foreground" />
              </div>

              <div className="rounded-full bg-black/80 backdrop-blur-md border border-primary/40 px-5 py-2 text-white shadow-lg">
                <p className="text-sm sm:text-base font-extrabold tracking-wide">
                  CLIQUE PARA VER COMO FUNCIONA
                </p>
                <p className="text-xs text-primary font-semibold">
                  Prescrição em menos de 3 minutos + App com sua marca
                </p>
              </div>
            </button>

            {/* Barra inferior simulada de player com controles */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                  aria-label={isMuted ? "Ativar som" : "Desativar som"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <span className="font-mono">00:00 / 03:24</span>
              </div>
              <span className="text-[11px] text-white/60 hidden sm:inline">
                Qualidade HD 1080p
              </span>
            </div>
          </div>
        )}
      </div>

      {/* CTA Direto e Selos de Confiança abaixo do Vídeo */}
      <div className="mt-6 text-center">
        {ctaHref ? (
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto min-w-0 sm:min-w-[320px] text-sm sm:text-base font-black uppercase tracking-wide shadow-glow h-auto min-h-14 py-3.5 px-5 whitespace-normal text-center leading-snug rounded-xl"
            onClick={onCtaClick}
          >
            <a href={ctaHref} className="flex items-center justify-center gap-2">
              <span>{ctaText}</span>
              <Zap className="h-5 w-5 shrink-0 ml-1 fill-current" />
            </a>
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full sm:w-auto min-w-0 sm:min-w-[320px] text-sm sm:text-base font-black uppercase tracking-wide shadow-glow h-auto min-h-14 py-3.5 px-5 whitespace-normal text-center leading-snug rounded-xl flex items-center justify-center gap-2"
            onClick={onCtaClick}
          >
            <span>{ctaText}</span>
            <Zap className="h-5 w-5 shrink-0 ml-1 fill-current" />
          </Button>
        )}

        {/* Micro-selos de segurança */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-primary" /> Pagamento Criptografado
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" /> Liberação Imediata
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> 7 Dias de Garantia
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> App Grátis para seus Alunos
          </span>
        </div>
      </div>
    </div>
  );
}
