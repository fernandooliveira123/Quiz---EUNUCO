const KEY = "ti_utm";
const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type Utm = Partial<Record<(typeof FIELDS)[number] | "source", string>>;

/** Captura UTMs da URL na primeira visita da sessão e as preserva durante o fluxo. */
export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const f of FIELDS) { const v = params.get(f); if (v) found[f] = v.slice(0, 200); }
    const src = params.get("source") ?? params.get("ref"); if (src) found.source = src.slice(0, 200);
    if (Object.keys(found).length) sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch { /* ignore */ }
}

export function readUtm(): Utm {
  try { return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Utm; } catch { return {}; }
}

export function buildUrlWithUtm(baseUrl: string): string {
  try {
    const utms = readUtm();
    if (!Object.keys(utms).length) return baseUrl;
    const url = new URL(baseUrl, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    Object.entries(utms).forEach(([k, v]) => {
      if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
    });
    return url.toString();
  } catch {
    return baseUrl;
  }
}

/** Anexa parâmetros de rastreamento (lead_id / client_reference_id + UTMs) ao checkout do Stripe. */
export function buildStripeCheckoutUrl(baseUrl: string, leadId?: string | null): string {
  try {
    if (!baseUrl || !baseUrl.startsWith("http")) return baseUrl;
    const url = new URL(baseUrl);
    if (leadId) {
      url.searchParams.set("client_reference_id", leadId);
      url.searchParams.set("lead_id", leadId);
    }
    const utms = readUtm();
    Object.entries(utms).forEach(([k, v]) => {
      if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
    });
    return url.toString();
  } catch {
    return baseUrl;
  }
}
