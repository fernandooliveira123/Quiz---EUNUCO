import { useState } from "react";
import { X, Copy, Check, Webhook, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CrmWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CrmWebhookModal({ isOpen, onClose }: CrmWebhookModalProps) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sampleJson = `{
  "secretToken": "treino2026",
  "leadId": "{{ $json.client_reference_id }}",
  "email": "{{ $json.customer_details.email }}",
  "status": "comprou",
  "notes": "Assinatura Stripe confirmada"
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-7 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-border/80">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/30">
              <Webhook className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-foreground">Automação de Status no n8n / Stripe</h3>
              <p className="text-xs text-muted-foreground">Como atualizar para "Testando" e "Comprou" automaticamente</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-xs sm:text-sm text-muted-foreground">
          <p>
            Você pode atualizar os status manualmente a qualquer momento clicando nos cards dos leads, ou deixar o <strong>n8n</strong> atualizar de forma 100% automática quando a Stripe confirmar um novo teste ou pagamento.
          </p>

          <div className="rounded-2xl border border-border bg-background p-4 space-y-2">
            <span className="font-bold text-foreground block text-xs uppercase tracking-wider">
              1. Já Automático na Página de Vendas:
            </span>
            <p className="text-xs">
              Quando qualquer lead clica no botão <strong className="text-foreground">"COMEÇAR 3 DIAS GRÁTIS (R$ 0,00 HOJE)"</strong>, o sistema automaticamente promove o status dele de <code className="text-amber-400">lead</code> para <code className="text-emerald-400 font-bold">testando</code> no CRM!
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground text-xs uppercase tracking-wider">
                2. Disparo via n8n (Stripe Webhook):
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copy(sampleJson, "payload")}
                className="h-8 text-xs gap-1.5"
              >
                {copied === "payload" ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Copiar Payload</span>
              </Button>
            </div>
            <p className="text-xs">
              No seu n8n, ao receber o evento <code className="text-primary font-mono">checkout.session.completed</code> da Stripe, você pode adicionar um nó HTTP Request para o seu domínio:
            </p>
            <pre className="p-3 rounded-xl bg-card border border-border text-[11px] font-mono overflow-x-auto text-foreground">
              {sampleJson}
            </pre>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="font-bold rounded-xl px-5">
            Entendido
          </Button>
        </div>
      </div>
    </div>
  );
}
