/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL — altere aqui, e somente aqui.
 * ============================================================
 */

/** LINK DO GRUPO VIP DO WHATSAPP — >>> SUBSTITUA pelo link real do grupo. <<< */
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/COLOQUE_SEU_LINK_AQUI";
export const isWhatsAppConfigured = !WHATSAPP_GROUP_URL.includes("COLOQUE_SEU_LINK_AQUI");

/** LINK DA POLÍTICA DE PRIVACIDADE — >>> PREENCHA com o endereço real (ex.: https://seusite.com/privacidade). <<< */
export const PRIVACY_POLICY_URL = "";
export const isPrivacyConfigured = PRIVACY_POLICY_URL.startsWith("https://");

/** Informações comerciais dos produtos. */
export const PRODUCTS = {
  personalizado: {
    name: "Treino Inteligente Personalizado",
    price: "R$ 597 inicialmente + R$ 97 de taxa anual após o primeiro ano",
  },
  mensal: {
    name: "Treino Inteligente Mensal",
    price: "R$ 29,90 por mês",
  },
} as const;

/** Analytics: nenhum ID configurado. Instale Meta Pixel / GA4 e os eventos serão repassados automaticamente. */
export const ANALYTICS = { enabled: true } as const;
