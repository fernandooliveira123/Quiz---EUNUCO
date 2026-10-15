# Tasks
- [x] Update the 16 structured questions and alternatives across 5 stages with 3-minute prescription desire and competitor customization pain points.
- [x] Implement loading transition screen (3.5s) with exact briefing copy: "Cruzando seus dados profissionais e gerando a versão recomendada...".
- [x] Intelligent offer routing:
  - LP1: `/oferta-pro` for established trainers (>10 students or seeking own brand / online consultoria) at R$ 497/year (~R$ 41/mo).
  - LP2: `/oferta-start` for beginners (0-9 students, spreadsheets/WhatsApp) at R$ 44.90/month with zero fidelity.
- [x] Stripe Checkout links with lead_id tracking and UTM parameters attached.
- [x] Background n8n webhook and Supabase payload recording (`recordQuizCompletion`).
- [x] Automated test suite verifying 16 questions, transitions, recommendation scoring, and routing (23 tests passed).