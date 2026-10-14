import { PRIVACY_POLICY_URL, isPrivacyConfigured } from "@/quiz/config";

export function PrivacyConsent({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string | undefined }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={Boolean(error)}
          className="mt-1 h-5 w-5 shrink-0 accent-primary" />
        <span>
          Li e concordo com a{" "}
          {isPrivacyConfigured
            ? <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Política de Privacidade</a>
            : <span className="font-semibold text-foreground">Política de Privacidade</span>}{" "}
          e autorizo o uso dos meus dados para viabilizar meu cadastro na lista de espera e minha participação no grupo VIP do Treino Inteligente.
        </span>
      </label>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
