import { ShieldCheck, RotateCcw, Sparkles, CheckCircle2 } from "lucide-react";

export function OfferGuarantee() {
  return (
    <div className="rounded-3xl border-2 border-primary/40 bg-gradient-to-b from-card to-background p-6 sm:p-9 backdrop-blur shadow-glow relative overflow-hidden">
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-2 border-primary/40 bg-primary/15 text-primary shadow-inner">
          <ShieldCheck className="h-11 w-11" />
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 px-3 py-0.5 text-xs font-black uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5 fill-current" /> 3 Dias Grátis · R$ 0,00 no Checkout
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <RotateCcw className="h-3 w-3" /> + Garantia Incondicional de 7 Dias
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Risco Duplamente Zero: Teste Primeiro, Pague Apenas Se Amar
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Ao assinar qualquer um dos planos, <strong className="text-foreground">hoje você paga exatamente R$ 0,00</strong>. Em nosso checkout seguro, seu cartão é apenas autenticado com criptografia bancária e o acesso completo à plataforma (com alunos ilimitados e o aplicativo com a sua própria marca) é ativado na mesma hora.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-foreground/90">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Cancelamento em 1 clique:</strong> encerre direto no seu painel de configurações antes do 4º dia e nenhum centavo será cobrado.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Garantia Estendida:</strong> mesmo após o término dos 3 dias de teste grátis, você tem 7 dias corridos de garantia incondicional de reembolso.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
