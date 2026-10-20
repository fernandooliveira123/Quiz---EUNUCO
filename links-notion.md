# 🚀 Hub Central de Links — Treino Inteligente

> 💡 **Projeto:** Quiz de Diagnóstico & Páginas de Vendas Personalizadas  
> 🌐 **Domínio Principal:** https://meuapp.treinointeligente.pro  
> 🔑 **PIN de Acesso ao CRM:** `treino2026`

---

## 📌 1. Links Principais de Produção

| Canal / Página | URL Oficial | Descrição / Objetivo |
| :--- | :--- | :--- |
| **🎯 Quiz de Entrada** | https://meuapp.treinointeligente.pro/ | Diagnóstico de 16 perguntas, captura de WhatsApp/E-mail e recomendação inteligente |
| **👑 Oferta Pro Anual (Sua Marca)** | https://meuapp.treinointeligente.pro/oferta-pro | Página de vendas Anual: R$ 997 ➔ R$ 497/ano (~R$ 41,41/mês) · 3 Dias a R$ 0,00 |
| **⚡ Oferta Pro Mensal** | https://meuapp.treinointeligente.pro/oferta-start | Página de vendas Mensal: R$ 197 ➔ R$ 44,90/mês · 3 Dias a R$ 0,00 |
| **📊 Painel CRM de Vendas** | https://meuapp.treinointeligente.pro/crm | Acompanhamento de Leads, Testes (3 dias) e Compradores com WhatsApp 1-clique |

---

## 💳 2. Links Diretos de Checkout Seguro (Stripe)

| Plano | Valor Ancorado | Condição no Checkout | Link Direto do Stripe |
| :--- | :--- | :--- | :--- |
| **Anual com Sua Marca** | R$ 997 ➔ **R$ 497,00/ano** | R$ 0,00 hoje (1ª cobrança no 4º dia) | https://buy.stripe.com/cNi14g0Jg97Q7LY2x76sw03 |
| **Mensal de Entrada** | R$ 197 ➔ **R$ 44,90/mês** | R$ 0,00 hoje (1ª cobrança no 4º dia) | https://buy.stripe.com/6oU28keA63NweamgnX6sw02 |

> ℹ️ *Os links no botão da página já anexam automaticamente `?client_reference_id={lead_id}` e o e-mail do lead para rastreamento no CRM.*

---

## 🎯 3. Gerador de Links com UTMs (Campanhas & Tráfego)

Use estes links prontos para rastrear de onde vieram seus alunos e leads no CRM:

### 📱 Tráfego Orgânico (Redes Sociais)
* **Link para Bio do Instagram:**
  https://meuapp.treinointeligente.pro/?utm_source=instagram&utm_medium=bio&utm_campaign=organico
* **Link para Stories do Instagram:**
  https://meuapp.treinointeligente.pro/?utm_source=instagram&utm_medium=stories&utm_campaign=arrasta_cima
* **Link para Canal do YouTube:**
  https://meuapp.treinointeligente.pro/?utm_source=youtube&utm_medium=video&utm_campaign=descricao

### 📢 Tráfego Pago (Meta Ads / Facebook / Instagram Ads)
* **Link para Anúncios (Parâmetros Dinâmicos do Meta):**
  https://meuapp.treinointeligente.pro/?utm_source=meta&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.name}}

### 💬 Recuperação no WhatsApp
* **Envio Direto da Oferta Anual:**
  https://meuapp.treinointeligente.pro/oferta-pro?utm_source=whatsapp&utm_medium=recuperacao&utm_campaign=anual
* **Envio Direto da Oferta Mensal:**
  https://meuapp.treinointeligente.pro/oferta-start?utm_source=whatsapp&utm_medium=recuperacao&utm_campaign=mensal

---

## 🎬 4. VSLs Oficiais Cadastradas (VTurb / ConverteAI)

* **VSL Plano Anual (`/oferta-pro`):**
  * ID do Player: `vid-6ad6744d57190eb9fffe845f`
  * Script CDN: `https://scripts.converteai.net/341570ba-7a10-4f90-9a49-b824f6bbb6e2/players/6ad6744d57190eb9fffe845f/v4/player.js`
* **VSL Plano Mensal (`/oferta-start`):**
  * ID do Player: `vid-6ad67433bbe21fec2d043348`
  * Script CDN: `https://scripts.converteai.net/341570ba-7a10-4f90-9a49-b824f6bbb6e2/players/6ad67433bbe21fec2d043348/v4/player.js`

---

## 🎯 5. Meta Pixel Oficial do Facebook Ads

* **ID do Pixel:** `1689133549309619`
* **Instalação:** Global em todas as páginas (Quiz, `/oferta-pro` e `/oferta-start`) com suporte nativo a SPA.
* **Mapeamento de Eventos Padrões (Otimização no Gerenciador de Anúncios):**
  * **`PageView`:** Disparado em todas as páginas e navegações internas.
  * **`Lead`:** Disparado quando o treinador preenche o formulário VIP com Nome, E-mail e WhatsApp.
  * **`ViewContent`:** Disparado nas páginas de oferta (`value: 497.00` para Anual e `value: 44.90` para Mensal).
  * **`InitiateCheckout`:** Disparado ao clicar em "COMEÇAR 3 DIAS GRÁTIS".
* **Captura de UTMs & Click IDs:**
  * Parâmetros capturados e persistidos automaticamente: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid`.
  * Preservados durante toda a navegação e repassados para o **Checkout da Stripe** e para o **Banco de Dados/CRM**.

---

## 🔍 6. Microsoft Clarity (Mapas de Calor, Gravação de Sessões & API)

* **ID do Projeto Clarity:** `z0utmaa779`
* **Painel Web do Clarity:** https://clarity.microsoft.com/
* **API Oficial de Exportação de Dados:**
  * Endpoint: `https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=1`
  * Autenticação: `Authorization: Bearer <CLARITY_API_TOKEN>`
  * Integrado com: Servidor backend e painel CRM (`/crm`) para métricas ao vivo de tráfego, rage clicks e dead clicks.
* **Recursos Ativos:**
  * Gravação de tela completa dos personal trainers respondendo ao Quiz.
  * Mapas de calor (Heatmaps) de cliques e rolagem no Quiz e nas LPs de Oferta.
  * Filtro por eventos customizados (`lead_captured`, `stripe_checkout_click`, `quiz_step`).
  * Identificação de sessões por `lead_id` para ver a jornada individual de quem comprou ou abandonou.

---

## ⚙️ 7. Infraestrutura & Automações

* **Webhook do n8n:**
  https://n8n-n8n.sb9az3.easypanel.host/webhook/treino-inteligente-quiz
* **Supabase Project:**
  https://twvlpehsqxquafsvkfge.supabase.co
* **Tabelas do Banco:** `treino_inteligente_leads` & `quiz_leads`
* **Repositório GitHub:** https://github.com/fernandooliveira123/Quiz---EUNUCO.git
