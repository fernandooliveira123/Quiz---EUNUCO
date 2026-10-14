CREATE TABLE public.vip_leads (
  id uuid PRIMARY KEY,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text NOT NULL CHECK (phone ~ '^[0-9]{10,15}$'),
  consent boolean NOT NULL CHECK (consent = true),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.vip_leads TO service_role;
ALTER TABLE public.vip_leads ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.vip_leads IS 'Private VIP contacts. No browser read or write grants; validated server-only insertion.';