import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, LockKeyhole, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { leadSchema, maskPhone } from "@/quiz/lead-schema";
import { saveVipLead } from "@/quiz/leads.functions";
import { track } from "@/quiz/analytics";
import { readUtm } from "@/quiz/utm";
import type { Answers } from "@/quiz/questions";
import { PrivacyConsent } from "./PrivacyConsent";

const FIELDS = [
  { key: "fullName", label: "Nome completo", type: "text", placeholder: "Digite seu nome e sobrenome", autoComplete: "name", inputMode: "text", max: 100 },
  { key: "phone", label: "WhatsApp (com DDD)", type: "tel", placeholder: "(00) 00000-0000", autoComplete: "tel-national", inputMode: "tel", max: 16 },
  { key: "email", label: "E-mail profissional", type: "email", placeholder: "seuemail@exemplo.com", autoComplete: "email", inputMode: "email", max: 255 },
] as const;

interface LeadCaptureProps {
  answers: Answers;
  onSaved: (id: string, data?: { fullName: string; email: string; phone: string }) => void;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  ctaText?: string;
}

export function LeadCaptureForm({
  answers,
  onSaved,
  title = "Seu diagnóstico exclusivo está pronto!",
  subtitle = "Informe seu WhatsApp e E-mail para desbloquear sua análise completa e acessar as condições de teste grátis com R$ 0,00 no checkout.",
  badgeText = "Diagnóstico Concluído · Última Etapa",
  ctaText = "VER MEU DIAGNÓSTICO E LIBERAR OFERTA",
}: LeadCaptureProps) {
  const [values, setValues] = useState({ fullName: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const id = useRef<string | null>(null);
  const viewed = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const el = viewed.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { track("lead_form_view"); io.disconnect(); } });
    io.observe(el); return () => io.disconnect();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setErrors({});
    track("lead_form_submit");
    id.current ??= crypto.randomUUID();
    const website = String(new FormData(event.currentTarget).get("website") ?? "");
    const parsed = leadSchema.safeParse({ id: id.current, ...values, consent, website, answers, utm: readUtm() });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = String(i.path[0]);
        next[k] ??= i.message;
      });
      if (next["answers"]) {
        next["form"] = "Suas respostas não foram encontradas. Recarregue a página e refaça o questionário.";
      }
      setErrors(next);
      return;
    }
    setBusy(true);
    try {
      await saveVipLead({ data: parsed.data });
      track("lead_captured", {
        lead_id: parsed.data.id,
        fullName: parsed.data.fullName,
        email: parsed.data.email,
      });
      onSaved(parsed.data.id, {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
      });
    } catch (err: unknown) {
      console.error("[saveVipLead error]", err);
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("celular") || msg.toLowerCase().includes("whatsapp") || msg.toLowerCase().includes("phone")) {
        setErrors({ phone: "Número de WhatsApp inválido. Digite seu DDD + número celular com 9 dígitos." });
      } else {
        setErrors({ form: "Não foi possível salvar seu cadastro agora. Verifique sua conexão e tente novamente — seus dados continuam preenchidos." });
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      ref={viewed}
      onSubmit={submit}
      noValidate
      className="mx-auto w-full max-w-xl rounded-3xl border-2 border-primary/40 bg-card/95 p-6 sm:p-9 shadow-glow backdrop-blur-sm animate-fade-up"
    >
      {badgeText && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5 fill-current" /> {badgeText}
        </div>
      )}

      <h2 className="text-2xl font-black leading-tight sm:text-3xl text-foreground">
        {title}
      </h2>
      <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
        {subtitle}
      </p>

      <div className="mt-6 space-y-4">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label htmlFor={f.key} className="mb-1.5 block text-xs sm:text-sm font-bold text-foreground">
              {f.label} <span className="text-primary">*</span>
            </label>
            <input
              id={f.key}
              name={f.key}
              type={f.type}
              inputMode={f.inputMode}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              maxLength={f.max}
              value={values[f.key]}
              required
              aria-invalid={Boolean(errors[f.key])}
              aria-describedby={errors[f.key] ? `${f.key}-error` : undefined}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  [f.key]: f.key === "phone" ? maskPhone(e.target.value) : e.target.value,
                }))
              }
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {errors[f.key] && (
              <p id={`${f.key}-error`} className="mt-1.5 text-xs font-semibold text-destructive">
                {errors[f.key]}
              </p>
            )}
          </div>
        ))}

        <div hidden aria-hidden="true">
          <label>Website<input name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
        </div>

        <div className="pt-1">
          <PrivacyConsent checked={consent} onChange={setConsent} error={errors["consent"]} />
        </div>

        {errors["form"] && (
          <p role="alert" className="text-sm font-semibold text-destructive text-center">
            {errors["form"]}
          </p>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={busy}
            size="lg"
            className="w-full h-13 py-3.5 px-6 text-sm sm:text-base font-black shadow-glow rounded-xl flex items-center justify-center gap-2"
          >
            {busy ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" />
                <span>Liberando Diagnóstico...</span>
              </>
            ) : (
              <>
                <span>{ctaText}</span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </>
            )}
          </Button>
        </div>

        <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-muted-foreground text-center">
          <LockKeyhole className="h-3.5 w-3.5 text-primary" />
          <span>Seus dados são protegidos com sigilo e criptografia. Zero spam.</span>
        </p>
      </div>
    </form>
  );
}
