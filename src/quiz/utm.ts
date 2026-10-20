const KEY = "ti_utm";
const FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
] as const;
export type Utm = Partial<Record<(typeof FIELDS)[number] | "source", string>>;

/** Captura UTMs e identificadores de clique (fbclid, gclid) da URL e os preserva durante a sessão. */
export function captureUtm() {
  try {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const existing = readUtm();
    const found: Utm = { ...existing };
    let hasNew = false;

    for (const f of FIELDS) {
      const v = params.get(f);
      if (v) {
        found[f] = v.slice(0, 200);
        hasNew = true;
      }
    }
    const src = params.get("source") ?? params.get("ref");
    if (src) {
      found.source = src.slice(0, 200);
      hasNew = true;
    }

    if (hasNew || Object.keys(found).length) {
      const serialized = JSON.stringify(found);
      sessionStorage.setItem(KEY, serialized);
      try {
        localStorage.setItem(KEY, serialized);
      } catch {
        /* ignore localStorage quota/disabled */
      }
    }
  } catch {
    /* ignore */
  }
}

export function readUtm(): Utm {
  try {
    if (typeof window === "undefined") return {};
    const fromSession = sessionStorage.getItem(KEY);
    if (fromSession) return JSON.parse(fromSession) as Utm;
    const fromLocal = localStorage.getItem(KEY);
    if (fromLocal) return JSON.parse(fromLocal) as Utm;
    return {};
  } catch {
    return {};
  }
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
