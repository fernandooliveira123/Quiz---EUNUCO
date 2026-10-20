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
    clarity?: (...args: unknown[]) => void;
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

    // Microsoft Clarity: marca o evento e identifica o lead para gravações nominais
    window.clarity?.("event", event);
    if (params["lead_id"]) {
      const leadId = String(params["lead_id"]);
      const leadName = params["fullName"] ? String(params["fullName"]) : undefined;
      window.clarity?.("identify", leadId, undefined, undefined, leadName);
      window.clarity?.("set", "lead_id", leadId);
      if (leadName) window.clarity?.("set", "lead_name", leadName);
    }
    if (event === "quiz_question_answered" && params["step"]) {
      window.clarity?.("set", "quiz_step", String(params["step"]));
      if (params["question"]) window.clarity?.("set", "current_question", String(params["question"]));
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
