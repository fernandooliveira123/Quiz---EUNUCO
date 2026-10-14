import { z } from "zod";
import { QUESTIONS } from "./questions";

const optional = z.string().trim().max(200).optional();

export const answersSchema = z.record(z.string(), z.string()).refine(
  (a) => Object.keys(a).length === QUESTIONS.length && QUESTIONS.every((q) => q.options.some((op) => op.id === a[q.id])),
  "Respostas do questionário incompletas.",
);

/** Converte telefone brasileiro para E.164 (+55DDDNÚMERO). Retorna null se inválido. */
export function toE164(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 13 && d.startsWith("55")) d = d.slice(2);
  if (d.length !== 11 && d.length !== 10) return null;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99) return null;
  if (d.length === 11 && d[2] !== "9") return null;
  if (/^(\d)\1+$/.test(d.slice(2))) return null;
  return `+55${d}`;
}

export function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const contactSchema = z.object({
  fullName: z.string().transform((v) => v.trim().replace(/\s+/g, " "))
    .pipe(z.string().max(100, "Use até 100 caracteres.").refine((v) => v.split(" ").filter((p) => p.length >= 2).length >= 2, "Informe seu nome completo (nome e sobrenome).")),
  email: z.string().trim().max(255).email("Informe um e-mail válido.").transform((v) => v.toLowerCase()),
  phone: z.string().max(25).transform((v, ctx) => {
    const e = toE164(v);
    if (!e) { ctx.addIssue({ code: "custom", message: "Informe um celular válido com DDD." }); return z.NEVER; }
    return e;
  }),
  consent: z.boolean().refine((v) => v, "Você precisa aceitar a Política de Privacidade para continuar."),
});

export const leadSchema = contactSchema.extend({
  id: z.string().uuid(),
  website: z.string().max(0),
  answers: answersSchema,
  utm: z.object({ source: optional, utm_source: optional, utm_medium: optional, utm_campaign: optional, utm_content: optional, utm_term: optional }).strict(),
}).strict();

export type LeadInput = z.input<typeof leadSchema>;
