import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Users,
  Search,
  RefreshCw,
  Download,
  MessageCircle,
  ExternalLink,
  Calendar,
  Sparkles,
  ShieldCheck,
  LogOut,
  Webhook,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CrmPinModal } from "@/components/crm/CrmPinModal";
import { CrmMetricsCards } from "@/components/crm/CrmMetricsCards";
import { CrmLeadDetailModal } from "@/components/crm/CrmLeadDetailModal";
import { CrmWebhookModal } from "@/components/crm/CrmWebhookModal";
import {
  fetchCrmLeads,
  updateCrmLeadStatus,
  type CrmLead,
  type CrmMetrics,
  type CrmStatus,
} from "@/quiz/crm.functions";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM & Funil de Vendas | Treino Inteligente" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CrmDashboardPage,
});

function CrmDashboardPage() {
  const [pin, setPin] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [metrics, setMetrics] = useState<CrmMetrics>({
    totalLeads: 0,
    totalTrialing: 0,
    totalConverted: 0,
    totalLost: 0,
    conversionRate: 0,
    potentialMonthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todos" | CrmStatus>("todos");
  const [productFilter, setProductFilter] = useState<"todos" | "personalizado" | "mensal">("todos");

  // Modais
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [showWebhookModal, setShowWebhookModal] = useState(false);

  // 1. Checa autenticação inicial do sessionStorage
  useEffect(() => {
    const savedPin = sessionStorage.getItem("treino_crm_pin");
    if (savedPin) {
      setPin(savedPin);
      setIsAuthenticated(true);
      loadLeads(savedPin);
    }
  }, []);

  const loadLeads = async (activePin: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCrmLeads({ data: { pin: activePin } });
      setLeads(res.leads);
      setMetrics(res.metrics);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao carregar leads.";
      setError(msg);
      if (msg.includes("não autorizado") || msg.includes("PIN incorreto")) {
        sessionStorage.removeItem("treino_crm_pin");
        setIsAuthenticated(false);
        setPin(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePinSuccess = (validPin: string) => {
    setPin(validPin);
    setIsAuthenticated(true);
    loadLeads(validPin);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("treino_crm_pin");
    setIsAuthenticated(false);
    setPin(null);
    setLeads([]);
  };

  const handleUpdateStatus = async (id: string, newStatus: CrmStatus, newNotes?: string) => {
    if (!pin) return;
    await updateCrmLeadStatus({
      data: {
        pin,
        id,
        status: newStatus,
        notes: newNotes,
      },
    });

    // Atualiza estado local
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              status: newStatus,
              ...(newNotes !== undefined ? { notes: newNotes } : {}),
            }
          : lead,
      ),
    );

    // Recalcula métricas leves
    setMetrics((prev) => {
      const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
      const totalTrialing = updated.filter((l) => l.status === "testando").length;
      const totalConverted = updated.filter((l) => l.status === "comprou").length;
      const totalLost = updated.filter((l) => l.status === "perdido").length;
      return {
        ...prev,
        totalTrialing,
        totalConverted,
        totalLost,
        conversionRate: prev.totalLeads > 0 ? Math.round(((totalTrialing + totalConverted) / prev.totalLeads) * 100) : 0,
      };
    });

    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              ...(newNotes !== undefined ? { notes: newNotes } : {}),
            }
          : null,
      );
    }
  };

  // Exportar para CSV
  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const headers = [
      "ID",
      "Nome",
      "Email",
      "Telefone",
      "Status",
      "Produto Recomendado",
      "Score Personalizado",
      "Score Mensal",
      "Origem",
      "Campanha",
      "Data de Cadastro",
      "Anotações",
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      l.status,
      l.recommendedProduct,
      l.personalizedScore,
      l.monthlyScore,
      l.utm.source || l.utm.utm_source || "direto",
      l.utm.utm_campaign || "",
      new Date(l.createdAt).toISOString(),
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_treino_inteligente_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtro em tempo real
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 1. Status
      if (statusFilter !== "todos" && lead.status !== statusFilter) {
        return false;
      }
      // 2. Produto
      if (productFilter !== "todos" && lead.recommendedProduct !== productFilter) {
        return false;
      }
      // 3. Busca de texto
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = lead.fullName.toLowerCase().includes(query);
        const matchesEmail = lead.email.toLowerCase().includes(query);
        const matchesPhone = lead.phone.includes(query);
        const matchesNotes = lead.notes.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesNotes) {
          return false;
        }
      }
      return true;
    });
  }, [leads, statusFilter, productFilter, searchQuery]);

  // Se não estiver logado, exibe tela de PIN
  if (!isAuthenticated) {
    return <CrmPinModal onSuccess={handlePinSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Bar de Gestão */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 border border-primary/30 text-primary font-black shadow-glow">
              TI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-foreground">
                  CRM Treino Inteligente
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Supabase Live
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Funil de vendas: Leads do Quiz ➔ Teste 3 Dias ➔ Assinantes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowWebhookModal(true)}
              className="hidden md:flex items-center gap-1.5 h-9 text-xs font-semibold rounded-xl border-border/80"
              title="Instruções de Webhook e n8n"
            >
              <Webhook className="h-3.5 w-3.5 text-primary" />
              <span>Automação n8n</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              disabled={leads.length === 0}
              className="flex items-center gap-1.5 h-9 text-xs font-semibold rounded-xl border-border/80"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => pin && loadLeads(pin)}
              disabled={loading}
              className="h-9 w-9 rounded-xl border-border/80"
              title="Atualizar lista"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-primary" : ""}`} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive"
              title="Sair do CRM"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {error && (
          <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-xs sm:text-sm text-destructive flex items-center justify-between">
            <span>{error}</span>
            <Button size="sm" variant="outline" onClick={() => pin && loadLeads(pin)} className="h-7 text-xs">
              Tentar novamente
            </Button>
          </div>
        )}

        {/* 1. Cards de Métricas Principais */}
        <CrmMetricsCards
          metrics={metrics}
          onFilterChange={(tab) => setStatusFilter(tab)}
          activeFilter={statusFilter}
        />

        {/* 2. Barra de Filtros e Busca */}
        <div className="rounded-2xl border border-border bg-card/80 p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Tabs Rápidas de Status */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "todos" as const, label: "Todos", count: leads.length },
              { id: "lead" as const, label: "🟡 Leads", count: leads.filter((l) => l.status === "lead").length },
              {
                id: "testando" as const,
                label: "🟢 Em Teste (3 Dias)",
                count: leads.filter((l) => l.status === "testando").length,
              },
              { id: "comprou" as const, label: "🔵 Comprou", count: leads.filter((l) => l.status === "comprou").length },
              { id: "perdido" as const, label: "⚪ Perdidos", count: leads.filter((l) => l.status === "perdido").length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  statusFilter === tab.id
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-background/80 text-muted-foreground hover:bg-muted border border-border/60"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    statusFilter === tab.id ? "bg-black/20 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Campo de Busca e Filtro de Produto */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nome, fone, e-mail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl bg-background border-border/80 focus:border-primary"
              />
            </div>

            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value as "todos" | "personalizado" | "mensal")}
              className="h-9 px-2.5 rounded-xl border border-border/80 bg-background text-xs font-semibold text-muted-foreground focus:outline-none focus:border-primary"
            >
              <option value="todos">Todos os Planos</option>
              <option value="personalizado">Pro Anual (Sua Marca)</option>
              <option value="mensal">Pro Mensal</option>
            </select>
          </div>
        </div>

        {/* 3. Tabela / Lista de Leads */}
        <div className="rounded-3xl border border-border bg-card/90 shadow-card overflow-hidden">
          {loading && leads.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground space-y-3">
              <RefreshCw className="h-8 w-8 mx-auto animate-spin text-primary" />
              <p className="text-sm font-semibold">Carregando contatos do Supabase...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground space-y-2">
              <Users className="h-10 w-10 mx-auto opacity-40" />
              <h3 className="text-base font-bold text-foreground">Nenhum contato encontrado</h3>
              <p className="text-xs max-w-sm mx-auto">
                {searchQuery || statusFilter !== "todos" || productFilter !== "todos"
                  ? "Tente ajustar seus termos de pesquisa ou remover os filtros aplicados."
                  : "Quando novos profissionais responderem ao quiz e deixarem o WhatsApp, eles aparecerão aqui instantaneamente."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/80 bg-background/60 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 sm:px-6">Personal Trainer</th>
                    <th className="py-3.5 px-4">Contatos</th>
                    <th className="py-3.5 px-4">Plano Recomendado</th>
                    <th className="py-3.5 px-4">Status no Funil</th>
                    <th className="py-3.5 px-4">Data</th>
                    <th className="py-3.5 px-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredLeads.map((lead) => {
                    const cleanPhone = lead.phone.replace(/\D/g, "");
                    const formattedPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
                    const firstName = lead.fullName.split(" ")[0] || "Personal";
                    const whatsappMessage = encodeURIComponent(
                      lead.status === "testando"
                        ? `Olá ${firstName}! Tudo bem? Vi que você ativou seus 3 dias de teste grátis no Treino Inteligente. Conseguiu cadastrar sua logo e seus primeiros alunos?`
                        : lead.status === "comprou"
                        ? `Olá ${firstName}! Seja bem-vindo ao Treino Inteligente! Vamos alinhar o setup do seu app com sua marca?`
                        : `Olá ${firstName}! Tudo bem? Vi que você completou o diagnóstico do Treino Inteligente para personalizar os treinos dos seus alunos. Ficou com alguma dúvida para ativar seus 3 dias de teste grátis?`,
                    );

                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-muted/40 transition-colors group cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        {/* Nome e Avatar */}
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 border border-primary/20 text-primary font-black text-xs">
                              {lead.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-foreground block truncate group-hover:text-primary transition-colors">
                                {lead.fullName}
                              </span>
                              {lead.notes && (
                                <span className="text-[11px] text-muted-foreground line-clamp-1 italic">
                                  "{lead.notes}"
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* WhatsApp e E-mail */}
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            <Button
                              asChild
                              size="sm"
                              className="h-8 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold gap-1 shadow-sm"
                            >
                              <a
                                href={`https://wa.me/${formattedPhone}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageCircle className="h-3.5 w-3.5" />
                                <span>WhatsApp</span>
                              </a>
                            </Button>
                            <a
                              href={`mailto:${lead.email}`}
                              className="p-1.5 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-background"
                              title={lead.email}
                            >
                              <Mail className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </td>

                        {/* Plano Recomendado */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                              lead.recommendedProduct === "personalizado"
                                ? "bg-primary/15 border-primary/30 text-primary"
                                : "bg-sky-500/10 border-sky-500/20 text-sky-400"
                            }`}
                          >
                            <Sparkles className="h-3 w-3" />
                            {lead.recommendedProduct === "personalizado" ? "Pro Anual (Sua Marca)" : "Pro Mensal"}
                          </span>
                        </td>

                        {/* Status com Seletor Rápido */}
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value as CrmStatus)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                              lead.status === "testando"
                                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                                : lead.status === "comprou"
                                ? "bg-sky-500/15 border-sky-500/40 text-sky-300"
                                : lead.status === "perdido"
                                ? "bg-zinc-500/15 border-zinc-500/40 text-zinc-400"
                                : "bg-amber-500/15 border-amber-500/40 text-amber-300"
                            }`}
                          >
                            <option value="lead">🟡 Lead (Quiz)</option>
                            <option value="testando">🟢 Em Teste (3 Dias)</option>
                            <option value="comprou">🔵 Comprou</option>
                            <option value="perdido">⚪ Perdido</option>
                          </select>
                        </td>

                        {/* Data */}
                        <td className="py-3.5 px-4 text-muted-foreground whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>

                        {/* Ação */}
                        <td className="py-3.5 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs font-semibold rounded-lg text-primary hover:text-primary gap-1"
                          >
                            <span>Detalhes</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Detalhes do Lead */}
      <CrmLeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Modal de Instruções de Webhook */}
      <CrmWebhookModal isOpen={showWebhookModal} onClose={() => setShowWebhookModal(false)} />
    </div>
  );
}
