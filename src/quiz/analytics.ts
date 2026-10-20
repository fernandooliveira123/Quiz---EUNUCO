import { ANALYTICS } from "./config";

export type QuizEvent =
  | "quiz_landing_view"
  | "quiz_start"
  | "quiz_question_answered"
  | "quiz_completed"
  | "recommendation_generated"
  | "lead_form_view"
  | "lead_form_submit"
  | "lead_captured"
  | "whatsapp_cta_click"
  | "stripe_checkout_click"
  | "offer_page_view";

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
    if (window.dataLayer) {
      window.dataLayer.push({ event, ...params });
    } else {
      window.gtag?.("event", event, params);
    }

    // 1. Evento Customizado no Meta Pixel
    window.fbq?.("trackCustom", event, params);

    // 2. Mapeamento para Eventos Padrões oficiais do Meta (otimização de campanhas no Ads Manager)
    if (event === "lead_captured") {
      window.fbq?.("track", "Lead", {
        content_name: String(params["product"] ?? "Quiz Treino Inteligente"),
        content_category: "Diagnóstico",
        value: 0,
        currency: "BRL",
      });
    } else if (event === "stripe_checkout_click") {
      const plan = params["plan"];
      const isAnnual = plan === "whitelabel_anual" || plan === "pro_anual";
      window.fbq?.("track", "InitiateCheckout", {
        content_name: isAnnual ? "Treino Inteligente Pro Anual" : "Treino Inteligente Pro Mensal",
        content_ids: [isAnnual ? "white_label_annual" : "pro"],
        content_type: "product",
        value: isAnnual ? 497.0 : 44.9,
        currency: "BRL",
      });
    } else if (event === "offer_page_view") {
      const plan = params["plan"];
      const isAnnual = plan === "whitelabel_anual" || plan === "pro_anual";
      window.fbq?.("track", "ViewContent", {
        content_name: isAnnual ? "Treino Inteligente Pro Anual (Sua Marca)" : "Treino Inteligente Pro Mensal",
        content_ids: [isAnnual ? "white_label_annual" : "pro"],
        content_type: "product",
        value: isAnnual ? 497.0 : 44.9,
        currency: "BRL",
      });
    }

    if (import.meta.env.DEV) console.debug("[track]", event, params);
  } catch {
    /* nunca quebrar a experiência por causa do rastreamento */
  }
}
