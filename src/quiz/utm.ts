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
