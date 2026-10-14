import { BellRing, CheckCircle2, ClipboardList, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_GROUP_URL, isWhatsAppConfigured } from "@/quiz/config";
import { track } from "@/quiz/analytics";
import { markWhatsAppClick } from "@/quiz/leads.functions";

export function WhatsAppSuccess({ leadId }: { leadId: string }) {
  const openGroup = () => {
    track("whatsapp_cta_click");
    markWhatsAppClick({ data: { id: leadId } }).catch(() => undefined);
  };
  return (
    <section className="mx-auto w-full max-w-xl px-4 py-12 sm:py-20 animate-fade-up" aria-live="polite">
      <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
      <h1 className="mt-5 text-center text-3xl font-extrabold leading-tight">Seu cadastro na lista VIP foi realizado!</h1>
      <p className="mt-4 text-center text-base text-foreground">Agora falta apenas um passo para acompanhar as novidades do Treino Inteligente.</p>
      <p className="mt-3 text-center text-[15px] leading-relaxed text-muted-foreground">Entre no grupo VIP do WhatsApp para receber informações sobre a experiência de 7 dias, orientações para participar e novidades sobre a abertura da campanha.</p>
      <ul className="mt-8 space-y-3 rounded-2xl border border-border bg-card p-5">
        {[[BellRing, "Avisos sobre a campanha."], [ClipboardList, "Orientações para o período de teste."], [Sparkles, "Novidades sobre o Treino Inteligente."]].map(([Icon, t]) => {
          const I = Icon as typeof BellRing;
          return <li key={t as string} className="flex items-center gap-3 text-[15px]"><I className="h-5 w-5 shrink-0 text-primary" aria-hidden />{t as string}</li>;
        })}
      </ul>
      {isWhatsAppConfigured ? (
        <Button asChild className="mt-8 w-full">
          <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" onClick={openGroup}><MessageCircle className="h-5 w-5" /> ENTRAR NO GRUPO VIP DO WHATSAPP</a>
        </Button>
      ) : (
        <p role="status" className="mt-8 rounded-xl border border-border bg-background-2 px-4 py-4 text-center text-sm text-muted-foreground">
          Cadastro concluído. O link do grupo VIP ainda está em configuração e será disponibilizado em breve.
        </p>
      )}
      <p className="mt-4 text-center text-xs text-muted-foreground">Cadastro concluído; link do grupo disponibilizado.</p>
    </section>
  );
}
