/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL — altere aqui, e somente aqui.
 * ============================================================
 */

/** LINK DA PÁGINA DE VENDAS / OFERTAS (Start, Pro e White Label Anual). */
export const OFFERS_LP_URL = "https://COLOQUE_SEU_LINK_DA_LP_AQUI";
export const isOffersLpConfigured = !OFFERS_LP_URL.includes("COLOQUE_SEU_LINK_DA_LP_AQUI") && OFFERS_LP_URL.startsWith("http");

/** LINK DO GRUPO VIP DO WHATSAPP (legado / opcional). */
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/COLOQUE_SEU_LINK_AQUI";
export const isWhatsAppConfigured = !WHATSAPP_GROUP_URL.includes("COLOQUE_SEU_LINK_AQUI");

/** LINK DA POLÍTICA DE PRIVACIDADE. */
export const PRIVACY_POLICY_URL = "";
export const isPrivacyConfigured = PRIVACY_POLICY_URL.startsWith("https://");

/** Informações comerciais das três opções de oferta. */
export const PRODUCTS = {
  start: {
    id: "start",
    name: "Treino Inteligente Start",
    badge: "Mensalidade Essencial",
    headline: "Comece com o essencial e organize sua rotina.",
    description: "Ideal para personal trainers que querem prescrever com praticidade, ter treinos organizados e um valor de investimento acessível.",
  },
  pro: {
    id: "pro",
    name: "Treino Inteligente Pro",
    badge: "Mensalidade Completa",
    headline: "Recursos avançados para acelerar e escalar sua consultoria.",
    description: "Perfeito para profissionais que precisam de ferramentas completas de acompanhamento, agilidade na prescrição e suporte ao crescimento de alunos.",
  },
  whitelabel: {
    id: "whitelabel",
    name: "Treino Inteligente White Label Anual",
    badge: "Marca Própria · Plano Anual",
    headline: "A plataforma com a identidade visual da sua consultoria.",
    description: "Para quem quer se posicionar como autoridade máxima, oferecendo aos alunos uma plataforma exclusiva com sua logo e suas cores.",
  },
} as const;

/** Analytics: nenhum ID configurado. Instale Meta Pixel / GA4 e os eventos serão repassados automaticamente. */
export const ANALYTICS = { enabled: true } as const;
