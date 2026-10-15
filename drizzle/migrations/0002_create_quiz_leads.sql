CREATE TABLE IF NOT EXISTS public.quiz_leads (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  answers jsonb NOT NULL,
  recommended_route text NOT NULL,
  utm jsonb DEFAULT '{}'::jsonb
);

GRANT ALL ON public.quiz_leads TO service_role;
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;
