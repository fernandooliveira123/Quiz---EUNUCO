import { useState, useEffect } from "react";
import { X, ExternalLink, RefreshCw, Eye, ShieldCheck, Activity, Users, MousePointerClick, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchClarityLiveInsights } from "@/quiz/clarity.functions";
import { CLARITY_PROJECT_ID } from "@/quiz/config";

interface CrmClarityModalProps {
  isOpen: boolean;
  onClose: () => void;
  pin: string;
}

interface ClarityMetricItem {
  metricName: string;
  information: Array<Record<string, unknown>>;
}

export function CrmClarityModal({ isOpen, onClose, pin }: CrmClarityModalProps) {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClarityMetricItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchClarityLiveInsights({ data: { pin, numOfDays: 1 } });
      if (result.ok && Array.isArray(result.data)) {
        setData(result.data as ClarityMetricItem[]);
      } else {
        setError(result.error || "Não foi possível carregar os dados da API.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro de conexão";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  // Extrai métricas do array da API
  const traffic = data?.find((m) => m.metricName === "Traffic")?.information?.[0] as
    | { totalSessionCount?: number; distinctUserCount?: number; totalBotSessionCount?: number }
    | undefined;

  const rageClicks = data?.find((m) => m.metricName === "RageClickCount")?.information?.[0] as
    | { sessionsCount?: number; subTotal?: number }
    | undefined;

  const deadClicks = data?.find((m) => m.metricName === "DeadClickCount")?.information?.[0] as
    | { sessionsCount?: number; subTotal?: number }
    | undefined;

  const scrollDepth = data?.find((m) => m.metricName === "ScrollDepth")?.information?.[0] as
    | { averageScrollDepth?: number }
    | undefined;

  const engagement = data?.find((m) => m.metricName === "EngagementTime")?.information?.[0] as
    | { totalTime?: number; activeTime?: number }
    | undefined;

  const browsers = (data?.find((m) => m.metricName === "Browser")?.information || []) as Array<{
    name?: string;
    sessionsCount?: number;
  }>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/80">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/30">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-foreground">Microsoft Clarity Analytics</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  <ShieldCheck className="h-3 w-3" /> API Ativa
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Dados ao vivo de navegação, mapas de calor e gravações de tela
              </p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="mt-5 space-y-4">
          {/* Cards Rápidos de Métricas Linha 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-border/70 bg-background/50 p-3.5 text-center">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center justify-center gap-1">
                <Activity className="h-3.5 w-3.5 text-primary" /> Sessões (24h)
              </span>
              <p className="mt-1 text-2xl font-black text-foreground">
                {loading ? "..." : (traffic?.totalSessionCount ?? 0)}
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/50 p-3.5 text-center">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center justify-center gap-1">
                <Users className="h-3.5 w-3.5 text-sky-400" /> Usuários Únicos
              </span>
              <p className="mt-1 text-2xl font-black text-foreground">
                {loading ? "..." : (traffic?.distinctUserCount ?? 0)}
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/50 p-3.5 text-center">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center justify-center gap-1">
                <MousePointerClick className="h-3.5 w-3.5 text-amber-400" /> Cliques Mortos
              </span>
              <p className="mt-1 text-2xl font-black text-foreground">
                {loading ? "..." : (deadClicks?.subTotal ?? 0)}
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/50 p-3.5 text-center">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center justify-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-400" /> Cliques Raiva
              </span>
              <p className="mt-1 text-2xl font-black text-foreground">
                {loading ? "..." : (rageClicks?.subTotal ?? 0)}
              </p>
            </div>
          </div>

          {/* Cards Rápidos de Métricas Linha 2 (Engajamento & Retenção) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border/70 bg-background/50 p-3 text-center">
              <span className="text-[11px] font-semibold text-muted-foreground">Profundidade Scroll</span>
              <p className="mt-1 text-xl font-black text-emerald-400">
                {loading
                  ? "..."
                  : scrollDepth?.averageScrollDepth
                    ? `${Math.round(scrollDepth.averageScrollDepth)}%`
                    : "0%"}
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/50 p-3 text-center">
              <span className="text-[11px] font-semibold text-muted-foreground">Tempo Médio Sessão</span>
              <p className="mt-1 text-xl font-black text-foreground">
                {loading ? "..." : engagement?.totalTime ? `${engagement.totalTime}s` : "0s"}
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-border/70 bg-background/50 p-3 text-center">
              <span className="text-[11px] font-semibold text-muted-foreground">Origem Top 1</span>
              <p className="mt-1 text-xs font-bold text-sky-400 truncate">
                {loading
                  ? "..."
                  : browsers[0]?.name
                    ? `${browsers[0].name} (${browsers[0].sessionsCount})`
                    : "Facebook App"}
              </p>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
              {error}
            </div>
          )}

          {/* Destaque e Acesso ao Dashboard Oficial */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
              Painel Completo de Gravações & Heatmaps
            </h4>
            <p className="text-xs text-muted-foreground">
              Acesse o dashboard oficial para assistir aos vídeos completos dos personal trainers respondendo ao Quiz, rolando a página de vendas e clicando nos botões de checkout.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <Button
                asChild
                size="sm"
                className="gap-1.5 rounded-xl font-bold text-xs"
              >
                <a
                  href={`https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/dashboard`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Abrir Gravações no Clarity</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={loadInsights}
                disabled={loading}
                className="gap-1.5 rounded-xl text-xs font-semibold"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-primary" : ""}`} />
                <span>Atualizar API</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
