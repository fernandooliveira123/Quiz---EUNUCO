/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL — altere aqui, e somente aqui.
 * ============================================================
 */

/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL DOS PLANOS STRIPE (mode: 'subscription')
 * ============================================================
 * 
 * 1. Plano Pro Mensal:
 *    - plan_tier: 'pro'
 *    - ID do Preço na Stripe: price_1UQXvx5wqqnwKADLACkY59vw
 *    - Valor: R$ 44,90 / mês (renovação mensal livre)
 *    - Trial: 3 dias grátis (Hoje no Checkout: R$ 0,00)
 *    - Limite de Alunos: Ilimitado
 *    - Personalização White-label: 100% Liberada (Logo, nome do app e cores)
 *    - Suporte: Suporte padrão
 * 
 * 2. Plano White-label Anual:
 *    - plan_tier: 'white_label_annual'
 *    - ID do Preço na Stripe: price_1UQXwZ5wqqnwKADLSI1Sn60D
 *    - Valor: R$ 497,00 / ano (equivale a R$ 41,41/mês)
 *    - Economia: 2 meses grátis (economia de R$ 41,80/ano)
 *    - Trial: 3 dias grátis (Hoje no Checkout: R$ 0,00)
 *    - Limite de Alunos: Ilimitado
 *    - Personalização White-label: 100% Liberada (Logo, nome do app e cores)
 *    - Suporte: Suporte prioritário via WhatsApp
 */

export const STRIPE_PRICE_ID_PRO = "price_1UQXvx5wqqnwKADLACkY59vw";
export const STRIPE_PRICE_ID_WHITELABEL_ANNUAL = "price_1UQXwZ5wqqnwKADLSI1Sn60D";

export const STRIPE_CONFIG = {
  pro: {
    planTier: "pro",
    priceId: STRIPE_PRICE_ID_PRO,
    mode: "subscription" as const,
    name: "Plano Pro Mensal",
    priceMonthly: 44.90,
    trialDays: 3,
    checkoutAmountNow: 0.00,
    studentLimit: "unlimited" as const,
    whitelabel: true,
    support: "standard" as const,
  },
  whitelabelAnnual: {
    planTier: "white_label_annual",
    priceId: STRIPE_PRICE_ID_WHITELABEL_ANNUAL,
    mode: "subscription" as const,
    name: "Plano White-label Anual",
    priceAnnual: 497.00,
    priceMonthlyEquivalent: 41.41,
    annualSavings: 41.80, // 2 meses grátis vs pagar 12x R$ 44,90
    trialDays: 3,
    checkoutAmountNow: 0.00,
    studentLimit: "unlimited" as const,
    whitelabel: true,
    support: "priority_whatsapp" as const,
  },
} as const;

/** CHECKOUT STRIPE - LP1 WHITE LABEL ANUAL (R$ 497 / ano com 3 dias de trial a R$ 0,00) */
export const STRIPE_CHECKOUT_PRO_URL = "https://buy.stripe.com/COLOQUE_SEU_LINK_STRIPE_PRO_AQUI";
export const isStripeProConfigured = !STRIPE_CHECKOUT_PRO_URL.includes("COLOQUE_SEU_LINK_STRIPE_PRO_AQUI") && STRIPE_CHECKOUT_PRO_URL.startsWith("http");

/** CHECKOUT STRIPE - LP2 PRO MENSAL (R$ 44,90 / mês com 3 dias de trial a R$ 0,00) */
export const STRIPE_CHECKOUT_START_URL = "https://buy.stripe.com/6oU28keA63NweamgnX6sw02";
export const isStripeStartConfigured = !STRIPE_CHECKOUT_START_URL.includes("COLOQUE_SEU_LINK_STRIPE_START_AQUI") && STRIPE_CHECKOUT_START_URL.startsWith("http");

/** VÍDEO VSL - URLs de vídeo para a LP1 (Pro) e LP2 (Start). Suporta YouTube, Vimeo, Panda Video, Wistia ou MP4 direto. */
export const VSL_VIDEO_PRO_URL = "";
export const VSL_VIDEO_START_URL = "";

/** VÍDEO DE PROVA SOCIAL - Wistia embed com depoimentos de treinadores */
export const SOCIAL_PROOF_VIDEO_URL = "https://fast.wistia.net/embed/iframe/2qty6bed6r";

/** WEBHOOK N8N - para automação de roteamento e envio de leads */
export const N8N_WEBHOOK_URL: string = "https://n8n-n8n.sb9az3.easypanel.host/webhook/treino-inteligente-quiz";
export const isN8nConfigured = Boolean(N8N_WEBHOOK_URL) && N8N_WEBHOOK_URL.startsWith("http");


/** LINK DA PÁGINA DE VENDAS / OFERTAS (legado / fallback). */
export const OFFERS_LP_URL = "https://COLOQUE_SEU_LINK_DA_LP_AQUI";
export const isOffersLpConfigured = !OFFERS_LP_URL.includes("COLOQUE_SEU_LINK_DA_LP_AQUI") && OFFERS_LP_URL.startsWith("http");

/** LINK DO GRUPO VIP DO WHATSAPP (legado / opcional). */
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/COLOQUE_SEU_LINK_AQUI";
export const isWhatsAppConfigured = !WHATSAPP_GROUP_URL.includes("COLOQUE_SEU_LINK_AQUI");

/** LINK DA POLÍTICA DE PRIVACIDADE. */
export const PRIVACY_POLICY_URL = "";
export const isPrivacyConfigured = PRIVACY_POLICY_URL.startsWith("https://");

/** Informações comerciais padronizadas para o Quiz e Ofertas. */
export const PRODUCTS = {
  start: {
    id: "pro",
    name: "Treino Inteligente Pro Mensal",
    badge: "3 Dias Grátis · Mensalidade Livre",
    headline: "Comece hoje por R$ 0,00 e organize sua rotina.",
    description: "Ideal para quem busca máxima flexibilidade, alunos ilimitados e White-label liberado por apenas R$ 44,90/mês sem fidelidade.",
  },
  pro: {
    id: "pro",
    name: "Treino Inteligente Pro Mensal",
    badge: "3 Dias Grátis · Mensalidade Livre",
    headline: "Recursos avançados com alunos ilimitados e White-label liberado.",
    description: "Perfeito para profissionais que querem agilidade de 3 minutos, alunos ilimitados e liberdade para cancelar quando quiser.",
  },
  whitelabel: {
    id: "white_label_annual",
    name: "Treino Inteligente White-label Anual",
    badge: "3 Dias Grátis · 2 Meses Grátis de Economia",
    headline: "A plataforma completa com sua identidade visual e suporte prioritário.",
    description: "Para quem quer se posicionar como autoridade máxima, com aplicativo exclusivo, alunos ilimitados, economia de R$ 41,80/ano e suporte prioritário via WhatsApp.",
  },
} as const;

/** Analytics: nenhum ID configurado. Instale Meta Pixel / GA4 e os eventos serão repassados automaticamente. */
export const ANALYTICS = { enabled: true } as const;
