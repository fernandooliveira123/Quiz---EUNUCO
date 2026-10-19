import { useState } from "react";
import { Lock, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyCrmPin } from "@/quiz/crm.functions";

interface CrmPinModalProps {
  onSuccess: (pin: string) => void;
}

export function CrmPinModal({ onSuccess }: CrmPinModalProps) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError("Digite o PIN de acesso");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await verifyCrmPin({ data: { pin: pin.trim() } });
      if (res.valid) {
        sessionStorage.setItem("treino_crm_pin", pin.trim());
        onSuccess(pin.trim());
      } else {
        setError("PIN incorreto. Tente novamente ou use o PIN padrão.");
      }
    } catch {
      setError("Erro ao validar PIN. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card/90 backdrop-blur-md p-8 sm:p-10 shadow-card text-center relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 border border-primary/30 text-primary shadow-glow mb-5">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <span className="inline-block rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">
            Área Restrita
          </span>

          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-foreground">
            CRM Treino Inteligente
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Gestão de leads do quiz, testes grátis (3 dias) e assinantes ativos.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <KeyRound className="h-4 w-4" />
              </div>
              <Input
                type="password"
                placeholder="Digite o PIN de acesso..."
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(null);
                }}
                className="pl-10 text-center tracking-widest text-base font-semibold bg-background/80 border-border/80 focus:border-primary h-12 rounded-xl"
                autoFocus
              />
            </div>

            {error && (
              <div className="text-xs font-bold text-destructive animate-shake text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full h-12 font-black shadow-glow rounded-xl flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>{loading ? "Validando PIN..." : "Acessar CRM"}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border/60 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Banco de dados Supabase Conectado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
