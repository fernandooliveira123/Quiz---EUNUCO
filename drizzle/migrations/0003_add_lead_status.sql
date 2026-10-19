-- Migration 0003: Add CRM status and tracking fields to treino_inteligente_leads
ALTER TABLE public.treino_inteligente_leads 
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'lead' 
  CHECK (status IN ('lead', 'testando', 'comprou', 'perdido'));

ALTER TABLE public.treino_inteligente_leads 
  ADD COLUMN IF NOT EXISTS notes text;

ALTER TABLE public.treino_inteligente_leads 
  ADD COLUMN IF NOT EXISTS trial_started_at timestamptz;

ALTER TABLE public.treino_inteligente_leads 
  ADD COLUMN IF NOT EXISTS converted_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_treino_inteligente_leads_status 
  ON public.treino_inteligente_leads(status);
