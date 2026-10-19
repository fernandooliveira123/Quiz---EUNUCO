import { Users, Clock, CheckCircle2, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import type { CrmMetrics } from "@/quiz/crm.functions";

interface CrmMetricsCardsProps {
  metrics: CrmMetrics;
  onFilterChange: (tab: "todos" | "lead" | "testando" | "comprou" | "perdido") => void;
  activeFilter: string;
}

export function CrmMetricsCards({ metrics, onFilterChange, activeFilter }: CrmMetricsCardsProps) {
  const cards = [
    {
      id: "todos" as const,
      title: "Total de Leads",
      value: metrics.totalLeads,
      description: "Cadastrados no Quiz",
      icon: Users,
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      activeRing: "ring-2 ring-sky-500",
    },
    {
      id: "testando" as const,
      title: "Em Teste Grátis",
      value: metrics.totalTrialing,
      description: "3 dias · R$ 0,00 hoje",
      icon: Clock,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      badge: "Onboarding",
      activeRing: "ring-2 ring-amber-500",
    },
    {
      id: "comprou" as const,
      title: "Clientes Ativos",
      value: metrics.totalConverted,
      description: "Assinaturas confirmadas",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      badge: "Vendas",
      activeRing: "ring-2 ring-emerald-500",
    },
    {
      id: "taxa",
      title: "Taxa de Conversão",
      value: `${metrics.conversionRate}%`,
      description: "Leads ➔ Teste / Compra",
      icon: TrendingUp,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    {
      id: "receita",
      title: "MRR em Potencial",
      value: `R$ ${metrics.potentialMonthlyRevenue.toLocaleString("pt-BR")}/mês`,
      description: "Projetado por assinante",
      icon: Sparkles,
      color: "text-primary bg-primary/10 border-primary/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isInteractive = ["todos", "testando", "comprou"].includes(card.id);
        const isSelected = activeFilter === card.id;

        return (
          <div
            key={card.id}
            onClick={() => {
              if (isInteractive) {
                onFilterChange(card.id as "todos" | "testando" | "comprou");
              }
            }}
            className={`rounded-2xl border border-border bg-card/90 p-4 sm:p-5 shadow-sm transition-all duration-200 relative overflow-hidden ${
              isInteractive ? "cursor-pointer hover:border-primary/50 hover:shadow-card" : ""
            } ${isSelected ? card.activeRing : ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`grid h-8 w-8 place-items-center rounded-xl border ${card.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                {card.value}
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>{card.description}</span>
              {card.badge && (
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {card.badge}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
