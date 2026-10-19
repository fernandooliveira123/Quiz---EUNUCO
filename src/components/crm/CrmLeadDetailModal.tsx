import { useState } from "react";
import {
  X,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ExternalLink,
  Tag,
  Save,
  CheckCircle2,
  Clock,
  User,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUESTIONS } from "@/quiz/questions";
import type { CrmLead, CrmStatus } from "@/quiz/crm.functions";

interface CrmLeadDetailModalProps {
  lead: CrmLead | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: CrmStatus, notes?: string) => Promise<void>;
}

export function CrmLeadDetailModal({ lead, onClose, onUpdateStatus }: CrmLeadDetailModalProps) {
  if (!lead) return null;

  const [copied, setCopied] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<CrmStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes || "");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const cleanPhone = lead.phone.replace(/\D/g, "");
  const formattedPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;

  // Mensagem contextual para o WhatsApp
  const buildWhatsAppMessage = () => {
    const firstName = lead.fullName.split(" ")[0] || "Personal";
    if (currentStatus === "comprou") {
      return encodeURIComponent(
        `Olá ${firstName}! Tudo bem? Seja muito bem-vindo ao Treino Inteligente! Passando para alinhar o setup do seu aplicativo com a sua logo e marca. Podemos marcar seu onboarding?`,
      );
    }
    if (currentStatus === "testando") {
      return encodeURIComponent(
        `Olá ${firstName}! Tudo bem? Vi que você ativou seus 3 dias de teste grátis no Treino Inteligente. Conseguiu cadastrar seus primeiros alunos e testar a prescrição rápida? Estou à disposição se precisar de qualquer ajuda!`,
      );
    }
    return encodeURIComponent(
      `Olá ${firstName}! Tudo bem? Vi que você completou o diagnóstico do Treino Inteligente para personalizar os treinos dos seus alunos com a sua própria marca. Ficou com alguma dúvida para ativar seus 3 dias de teste grátis por R$ 0,00 hoje?`,
    );
  };

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${buildWhatsAppMessage()}`;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdateStatus(lead.id, currentStatus, notes);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border/80 bg-background/50">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 border border-primary/30 text-primary font-black text-lg">
              {lead.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground">{lead.fullName}</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span>•</span>
                <span className="font-mono text-[10px] opacity-70">ID: {lead.id.slice(0, 8)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Corpo com Scroll */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Ações Rápidas de Contato */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl shadow-glow gap-2"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                <span>Conversar no WhatsApp</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70" />
              </a>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                className="flex-1 h-12 rounded-xl font-semibold gap-2 border-border/80"
              >
                <a href={`mailto:${lead.email}`}>
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{lead.email}</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(lead.phone, "phone")}
                className="h-12 w-12 rounded-xl border-border/80"
                title="Copiar Telefone"
              >
                {copied === "phone" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Gestão de Status e Notas */}
          <div className="rounded-2xl border border-border/80 bg-background/50 p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Status Atual no Funil
                </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {[
                    { id: "lead" as const, label: "🟡 Lead (Quiz)", color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
                    { id: "testando" as const, label: "🟢 Em Teste (3 Dias)", color: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300" },
                    { id: "comprou" as const, label: "🔵 Comprou / Assinante", color: "border-sky-500/40 bg-sky-500/15 text-sky-300" },
                    { id: "perdido" as const, label: "⚪ Perdido / Arquivado", color: "border-zinc-500/40 bg-zinc-500/10 text-zinc-400" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCurrentStatus(s.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        currentStatus === s.id ? `${s.color} ring-2 ring-primary` : "border-border bg-card/60 text-muted-foreground hover:bg-card"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSave}
                disabled={saving}
                size="sm"
                className="h-10 px-4 font-bold rounded-xl gap-2 self-start sm:self-center"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Salvo com sucesso!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>{saving ? "Salvando..." : "Salvar Alterações"}</span>
                  </>
                )}
              </Button>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                Anotações internas do Lead (WhatsApp, histórico de negociação):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Ex: Conversei no WhatsApp, tem 25 alunos, vai ativar o teste na sexta-feira..."
                className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>
          </div>

          {/* Diagnóstico do Quiz */}
          <div className="rounded-2xl border border-border/80 bg-background/50 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Recomendação do Sistema</span>
              </div>
              <span className="rounded-full bg-primary/15 border border-primary/30 px-3 py-0.5 text-xs font-black text-primary">
                {lead.recommendedProduct === "personalizado" ? "Pro Anual (Sua Marca · R$ 497)" : "Pro Mensal (R$ 44,90)"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl border border-border bg-card p-3">
                <span className="text-muted-foreground block text-[11px]">Score Marca Própria</span>
                <span className="text-base font-black text-primary">{lead.personalizedScore} pts</span>
              </div>
              <div className="rounded-xl border border-border bg-card p-3">
                <span className="text-muted-foreground block text-[11px]">Score Plano Mensal</span>
                <span className="text-base font-black text-foreground">{lead.monthlyScore} pts</span>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-xl border border-border bg-card p-3">
                <span className="text-muted-foreground block text-[11px]">Clicou no WhatsApp?</span>
                <span className={`text-xs font-bold ${lead.whatsappCtaClicked ? "text-emerald-400" : "text-muted-foreground"}`}>
                  {lead.whatsappCtaClicked ? "Sim, iniciou contato" : "Não clicou"}
                </span>
              </div>
            </div>

            {lead.primaryMotivation && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-primary leading-relaxed">
                <strong>Motivação Principal:</strong> {lead.primaryMotivation}
              </div>
            )}
          </div>

          {/* Raio-X Completo das 16 Respostas do Quiz */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Respostas da Anamnese no Quiz ({Object.keys(lead.answers).length} respondidas)</span>
            </h3>

            <div className="space-y-2.5">
              {QUESTIONS.map((q) => {
                const answerLetter = lead.answers[q.id];
                if (!answerLetter) return null;
                const option = q.options.find((opt) => opt.id === answerLetter);

                return (
                  <div key={q.id} className="rounded-xl border border-border/70 bg-card/60 p-3 text-xs">
                    <div className="font-semibold text-foreground/90">
                      <span className="text-primary font-mono font-bold mr-1.5">{q.id.toUpperCase()}:</span>
                      {q.text}
                    </div>
                    <div className="mt-1.5 pl-4 border-l-2 border-primary/40 text-muted-foreground">
                      <span className="font-bold text-foreground mr-1.5">[{answerLetter}]</span>
                      <span>{option ? option.text : "Opção " + answerLetter}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Informações de Rastreamento / UTMs */}
          {(lead.utm.source || lead.utm.utm_source || lead.utm.utm_campaign) && (
            <div className="rounded-2xl border border-border/80 bg-background/50 p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                <span>Rastreamento de Tráfego (UTMs)</span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {lead.utm.source && <span className="bg-muted px-2.5 py-1 rounded-lg">Fonte: {lead.utm.source}</span>}
                {lead.utm.utm_source && <span className="bg-muted px-2.5 py-1 rounded-lg">utm_source: {lead.utm.utm_source}</span>}
                {lead.utm.utm_medium && <span className="bg-muted px-2.5 py-1 rounded-lg">utm_medium: {lead.utm.utm_medium}</span>}
                {lead.utm.utm_campaign && <span className="bg-muted px-2.5 py-1 rounded-lg">utm_campaign: {lead.utm.utm_campaign}</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
