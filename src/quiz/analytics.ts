/**
 * Camada de eventos do funil. Nenhum ID de pixel é configurado aqui.
 * Meta Pixel (window.fbq), GA4 (window.gtag) e GTM (window.dataLayer) recebem os eventos quando instalados.
 * Para evitar duplicidade, quando o GTM existir apenas o dataLayer é usado.
 * Dados pessoais e respostas individuais NUNCA são enviados.
 */
import { ANALYTICS } from "./config";

export type QuizEvent =
  | "quiz_landing_view" | "quiz_start" | "quiz_question_answered" | "quiz_completed"
  | "recommendation_generated" | "lead_form_view" | "lead_form_submit" | "lead_captured" | "whatsapp_cta_click" | "stripe_checkout_click";

type Params = Record<string, string | number>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: QuizEvent, params: Params = {}) {
  if (typeof window === "undefined" || !ANALYTICS.enabled) return;
  try {
    if (window.dataLayer) window.dataLayer.push({ event, ...params });
    else window.gtag?.("event", event, params);
    window.fbq?.("trackCustom", event, params);
    if (import.meta.env.DEV) console.debug("[track]", event, params);
  } catch {
    /* nunca quebrar a experiência por causa do rastreamento */
  }
}
