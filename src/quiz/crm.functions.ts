import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseClient } from "./leads.functions";

export type CrmStatus = "lead" | "testando" | "comprou" | "perdido";

export interface CrmLead {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  status: CrmStatus;
  recommendedProduct: "personalizado" | "mensal" | string;
  personalizedScore: number;
  monthlyScore: number;
  primaryMotivation: string | null;
  answers: Record<string, string>;
  notes: string;
  trialStartedAt: string | null;
  convertedAt: string | null;
  whatsappCtaClicked: boolean;
  utm: {
    source?: string | null;
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    utm_content?: string | null;
    utm_term?: string | null;
  };
}

export interface CrmMetrics {
  totalLeads: number;
  totalTrialing: number;
  totalConverted: number;
  totalLost: number;
  conversionRate: number; // % de trial + converted sobre total
  potentialMonthlyRevenue: number; // R$ estimado
}

function getExpectedPin(): string {
  return process.env["CRM_PIN"] || "treino2026";
}

function checkPin(pin: string): boolean {
  return pin.trim() === getExpectedPin().trim();
}

/** Verifica se o PIN do CRM é válido */
export const verifyCrmPin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ pin: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const isValid = checkPin(data.pin);
    return { valid: isValid };
  });

/** Busca todos os leads com proteção de PIN (Service Role) */
export const fetchCrmLeads = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ pin: z.string() }).parse(data))
  .handler(async ({ data }): Promise<{ leads: CrmLead[]; metrics: CrmMetrics }> => {
    if (!checkPin(data.pin)) {
      throw new Error("Acesso não autorizado. PIN incorreto.");
    }

    const supabase = await getSupabaseClient();
    const { data: rows, error } = await supabase
      .from("treino_inteligente_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[fetchCrmLeads error]", error.message);
      throw new Error("Erro ao carregar dados do banco.");
    }

    const rawRows = (rows ?? []) as Array<Record<string, unknown>>;

    const leads: CrmLead[] = rawRows.map((row) => {
      const answers = (typeof row["answers"] === "object" && row["answers"] !== null ? row["answers"] : {}) as Record<
        string,
        unknown
      >;

      // Prioridade do status: coluna da tabela > answers._crm_status > inferência
      let status: CrmStatus = "lead";
      const colStatus = (row["status"] as string)?.toLowerCase();
      const ansStatus = (answers["_crm_status"] as string)?.toLowerCase();

      if (["lead", "testando", "comprou", "perdido"].includes(colStatus)) {
        status = colStatus as CrmStatus;
      } else if (["lead", "testando", "comprou", "perdido"].includes(ansStatus)) {
        status = ansStatus as CrmStatus;
      }

      const notes = (row["notes"] as string) || (answers["_crm_notes"] as string) || "";
      const trialStartedAt = (row["trial_started_at"] as string) || (answers["_crm_trial_started_at"] as string) || null;
      const convertedAt = (row["converted_at"] as string) || (answers["_crm_converted_at"] as string) || null;

      const cleanAnswers: Record<string, string> = {};
      Object.entries(answers).forEach(([k, v]) => {
        if (!k.startsWith("_crm_") && typeof v === "string") {
          cleanAnswers[k] = v;
        }
      });

      return {
        id: String(row["id"] ?? ""),
        createdAt: String(row["created_at"] ?? new Date().toISOString()),
        fullName: String(row["full_name"] ?? "Sem nome"),
        email: String(row["email"] ?? ""),
        phone: String(row["phone"] ?? ""),
        status,
        recommendedProduct: String(row["recommended_product"] ?? "personalizado"),
        personalizedScore: Number(row["personalized_score"] ?? 0),
        monthlyScore: Number(row["monthly_score"] ?? 0),
        primaryMotivation: (row["primary_motivation"] as string) ?? null,
        answers: cleanAnswers,
        notes,
        trialStartedAt,
        convertedAt,
        whatsappCtaClicked: Boolean(row["whatsapp_cta_clicked"]),
        utm: {
          source: (row["source"] as string) ?? null,
          utm_source: (row["utm_source"] as string) ?? null,
          utm_medium: (row["utm_medium"] as string) ?? null,
          utm_campaign: (row["utm_campaign"] as string) ?? null,
          utm_content: (row["utm_content"] as string) ?? null,
          utm_term: (row["utm_term"] as string) ?? null,
        },
      };
    });

    const totalLeads = leads.length;
    const totalTrialing = leads.filter((l) => l.status === "testando").length;
    const totalConverted = leads.filter((l) => l.status === "comprou").length;
    const totalLost = leads.filter((l) => l.status === "perdido").length;
    const conversionRate = totalLeads > 0 ? Math.round(((totalTrialing + totalConverted) / totalLeads) * 100) : 0;

    // Estimativa de receita: comprou anual (497/12 ~ 41,41) ou mensal (44,90)
    const potentialMonthlyRevenue = leads.reduce((acc, lead) => {
      if (lead.status === "comprou" || lead.status === "testando") {
        return acc + (lead.recommendedProduct === "personalizado" ? 41.41 : 44.9);
      }
      return acc;
    }, 0);

    return {
      leads,
      metrics: {
        totalLeads,
        totalTrialing,
        totalConverted,
        totalLost,
        conversionRate,
        potentialMonthlyRevenue: Math.round(potentialMonthlyRevenue),
      },
    };
  });

/** Atualiza status ou anotação de um lead no CRM */
export const updateCrmLeadStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        pin: z.string(),
        id: z.string().uuid(),
        status: z.enum(["lead", "testando", "comprou", "perdido"]),
        notes: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    if (!checkPin(data.pin)) {
      throw new Error("Acesso não autorizado. PIN incorreto.");
    }

    const supabase = await getSupabaseClient();

    // 1. Pega os dados atuais para atualizar o jsonb de answers
    const { data: currentLead } = await supabase
      .from("treino_inteligente_leads")
      .select("answers")
      .eq("id", data.id)
      .maybeSingle();

    const currentAnswers = (currentLead?.answers ?? {}) as Record<string, unknown>;
    const updatedAnswers = {
      ...currentAnswers,
      _crm_status: data.status,
      _crm_notes: data.notes ?? (currentAnswers["_crm_notes"] as string) ?? "",
      _crm_updated_at: new Date().toISOString(),
      ...(data.status === "testando" && !currentAnswers["_crm_trial_started_at"]
        ? { _crm_trial_started_at: new Date().toISOString() }
        : {}),
      ...(data.status === "comprou" ? { _crm_converted_at: new Date().toISOString() } : {}),
    };

    // 2. Tenta atualizar com as colunas dedicadas
    const payloadWithColumns: Record<string, unknown> = {
      answers: updatedAnswers,
      status: data.status,
      ...(data.notes !== undefined ? { notes: data.notes } : {}),
      ...(data.status === "testando" ? { trial_started_at: new Date().toISOString() } : {}),
      ...(data.status === "comprou" ? { converted_at: new Date().toISOString() } : {}),
    };

    const { error: colError } = await supabase
      .from("treino_inteligente_leads")
      .update(payloadWithColumns)
      .eq("id", data.id);

    // Se as colunas não existirem ainda, salva dentro de answers (fallback garantido)
    if (colError && colError.message.includes("does not exist")) {
      const { error: fallbackError } = await supabase
        .from("treino_inteligente_leads")
        .update({ answers: updatedAnswers })
        .eq("id", data.id);

      if (fallbackError) {
        console.error("[updateCrmLeadStatus fallback error]", fallbackError.message);
        throw new Error("Não foi possível atualizar o lead.");
      }
    } else if (colError) {
      console.error("[updateCrmLeadStatus error]", colError.message);
      throw new Error("Não foi possível atualizar o lead.");
    }

    return { success: true };
  });

/** Disparado automaticamente quando o lead clica no botão do Stripe na página de vendas */
export const markLeadCheckoutStarted = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        plan: z.enum(["pro_anual", "pro_mensal"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    try {
      const supabase = await getSupabaseClient();
      const { data: lead } = await supabase
        .from("treino_inteligente_leads")
        .select("answers, status")
        .eq("id", data.id)
        .maybeSingle();

      if (!lead) return { success: false, reason: "not_found" };

      const answers = (lead.answers ?? {}) as Record<string, unknown>;
      const currentStatus = (lead.status as string) || (answers["_crm_status"] as string) || "lead";

      // Só promove se ainda for lead simples
      if (currentStatus === "lead") {
        const now = new Date().toISOString();
        const updatedAnswers = {
          ...answers,
          _crm_status: "testando",
          _crm_checkout_plan: data.plan,
          _crm_trial_started_at: now,
        };

        const { error } = await supabase
          .from("treino_inteligente_leads")
          .update({
            answers: updatedAnswers,
            status: "testando",
            trial_started_at: now,
          })
          .eq("id", data.id);

        if (error && error.message.includes("does not exist")) {
          await supabase.from("treino_inteligente_leads").update({ answers: updatedAnswers }).eq("id", data.id);
        }
      }
      return { success: true };
    } catch (err) {
      console.error("[markLeadCheckoutStarted error]", err);
      return { success: false };
    }
  });

/** Endpoint para n8n ou Webhook Stripe atualizar status do lead por lead_id ou email */
export const updateLeadFromExternalWebhook = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        secretToken: z.string(),
        leadId: z.string().optional(),
        email: z.string().optional(),
        status: z.enum(["testando", "comprou", "perdido"]),
        notes: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    if (!checkPin(data.secretToken)) {
      throw new Error("Token de webhook inválido.");
    }

    if (!data.leadId && !data.email) {
      throw new Error("Informe leadId ou email.");
    }

    const supabase = await getSupabaseClient();
    let query = supabase.from("treino_inteligente_leads").select("id, answers");
    if (data.leadId) {
      query = query.eq("id", data.leadId);
    } else if (data.email) {
      query = query.eq("email", data.email);
    }

    const { data: rows } = await query;
    if (!rows || rows.length === 0) {
      return { success: false, reason: "Lead não encontrado" };
    }

    const now = new Date().toISOString();
    for (const row of rows) {
      const answers = (row.answers ?? {}) as Record<string, unknown>;
      const updatedAnswers = {
        ...answers,
        _crm_status: data.status,
        _crm_updated_at: now,
        ...(data.status === "testando" ? { _crm_trial_started_at: now } : {}),
        ...(data.status === "comprou" ? { _crm_converted_at: now } : {}),
        ...(data.notes ? { _crm_notes: data.notes } : {}),
      };

      const { error } = await supabase
        .from("treino_inteligente_leads")
        .update({
          answers: updatedAnswers,
          status: data.status,
          ...(data.status === "testando" ? { trial_started_at: now } : {}),
          ...(data.status === "comprou" ? { converted_at: now } : {}),
          ...(data.notes ? { notes: data.notes } : {}),
        })
        .eq("id", row.id);

      if (error && error.message.includes("does not exist")) {
        await supabase.from("treino_inteligente_leads").update({ answers: updatedAnswers }).eq("id", row.id);
      }
    }

    return { success: true, updatedCount: rows.length };
  });
