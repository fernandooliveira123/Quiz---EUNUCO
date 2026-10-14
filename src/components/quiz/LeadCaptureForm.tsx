import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { leadSchema, maskPhone } from "@/quiz/lead-schema";
import { saveVipLead } from "@/quiz/leads.functions";
import { track } from "@/quiz/analytics";
import { readUtm } from "@/quiz/utm";
import type { Answers } from "@/quiz/questions";
import { PrivacyConsent } from "./PrivacyConsent";

const FIELDS = [
  { key: "fullName", label: "Nome completo", type: "text", placeholder: "Digite seu nome completo", autoComplete: "name", inputMode: "text", max: 100 },
  { key: "email", label: "E-mail", type: "email", placeholder: "voce@exemplo.com", autoComplete: "email", inputMode: "email", max: 255 },
  { key: "phone", label: "Telefone com WhatsApp", type: "tel", placeholder: "(00) 00000-0000", autoComplete: "tel-national", inputMode: "tel", max: 16 },
] as const;

export function LeadCaptureForm({ answers, onSaved }: { answers: Answers; onSaved: (id: string) => void }) {
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
    track("lead_form_submit");
    id.current ??= crypto.randomUUID();
    const website = String(new FormData(event.currentTarget).get("website") ?? "");
    const parsed = leadSchema.safeParse({ id: id.current, ...values, consent, website, answers, utm: readUtm() });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { const k = String(i.path[0]); next[k] ??= i.message; });
      if (next["answers"]) next["form"] = "Suas respostas não foram encontradas. Recarregue a página e refaça o questionário.";
      setErrors(next);
      return;
    }
    setBusy(true); setErrors({});
    try {
      await saveVipLead({ data: parsed.data });
      track("lead_captured");
      onSaved(parsed.data.id);
    } catch {
      setErrors({ form: "Não foi possível salvar seu cadastro agora. Verifique sua conexão e tente novamente — seus dados continuam preenchidos." });
    } finally { setBusy(false); }
  }

  return (
    <form ref={viewed} onSubmit={submit} noValidate className="rounded-2xl border border-border bg-background-2 p-6 sm:p-8">
      <h2 className="text-2xl font-extrabold leading-tight">Deseja salvar seu resultado?</h2>
      <p className="mt-3 text-[15px] text-muted-foreground">Preencha seus dados para registrar seu diagnóstico e receber atendimento prioritário sobre as ofertas.</p>
      <div className="mt-7 space-y-5">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label htmlFor={f.key} className="mb-2 block text-sm font-semibold">{f.label}</label>
            <input id={f.key} name={f.key} type={f.type} inputMode={f.inputMode} placeholder={f.placeholder} autoComplete={f.autoComplete} maxLength={f.max}
              value={values[f.key]} required aria-invalid={Boolean(errors[f.key])} aria-describedby={errors[f.key] ? `${f.key}-error` : undefined}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: f.key === "phone" ? maskPhone(e.target.value) : e.target.value }))}
              className="h-12 w-full rounded-md border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary" />
            {errors[f.key] && <p id={`${f.key}-error`} className="mt-2 text-sm text-destructive">{errors[f.key]}</p>}
          </div>
        ))}
        <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label></div>
        <PrivacyConsent checked={consent} onChange={setConsent} error={errors["consent"]} />
        {errors["form"] && <p role="alert" className="text-sm text-destructive">{errors["form"]}</p>}
        <Button type="submit" disabled={busy} className="w-full">
          {busy ? <><LoaderCircle className="h-5 w-5 animate-spin" /> Salvando...</> : <>SALVAR MEU DIAGNÓSTICO <ArrowRight className="h-5 w-5" /></>}
        </Button>
        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="h-3.5 w-3.5" /> Seus dados são protegidos e não são compartilhados publicamente.</p>
      </div>
    </form>
  );
}
