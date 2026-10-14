CREATE TABLE public.treino_inteligente_leads (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  answers jsonb NOT NULL,
  recommended_product text NOT NULL CHECK (recommended_product IN ('personalizado','mensal')),
  personalized_score integer NOT NULL,
  monthly_score integer NOT NULL,
  primary_motivation text,
  quiz_completed boolean NOT NULL DEFAULT true,
  lead_captured boolean NOT NULL DEFAULT true,
  whatsapp_cta_clicked boolean NOT NULL DEFAULT false,
  privacy_consent boolean NOT NULL,
  privacy_consent_at timestamptz NOT NULL DEFAULT now(),
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);
GRANT ALL ON public.treino_inteligente_leads TO service_role;
ALTER TABLE public.treino_inteligente_leads ENABLE ROW LEVEL SECURITY;