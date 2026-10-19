import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { leadSchema } from "./lead-schema";
import { calculateRecommendation } from "./questions";
import { N8N_WEBHOOK_URL } from "./config";

async function getSupabaseClient() {
  const { createClient } = await import("@supabase/supabase-js");
  const envUrl = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const envKey =
    process.env["SUPABASE_SERVICE_ROLE_KEY"] ||
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

  const url =
    envUrl && envUrl.includes("twvlpehsqxquafsvkfge")
      ? envUrl
      : "https://twvlpehsqxquafsvkfge.supabase.co";
  const key =
    envKey && (envKey.includes("sb_publishable_mYHkxv9x") || envKey.startsWith("eyJ"))
      ? envKey
      : "sb_publishable_mYHkxv9xXYaLhZblsMV0zA_a3WhXkvn";

  return createClient(url, key);
}

// Public, insert-only action: never returns contact records. Recommendation is recomputed on the server.
export const saveVipLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = await getSupabaseClient();
    const rec = calculateRecommendation(data.answers);
    const { error } = await supabase.from("treino_inteligente_leads").insert({
      id: data.id,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      answers: data.answers,
      recommended_product: rec.recommendedProduct === "whitelabel" ? "personalizado" : "mensal",
      personalized_score: rec.personalizedScore,
      monthly_score: rec.mensalScore,
      primary_motivation: rec.primaryMotivation,
      privacy_consent: true,
      source: data.utm.source ?? null,
      utm_source: data.utm.utm_source ?? null,
      utm_medium: data.utm.utm_medium ?? null,
      utm_campaign: data.utm.utm_campaign ?? null,
      utm_content: data.utm.utm_content ?? null,
      utm_term: data.utm.utm_term ?? null,
    });
    if (error && error.code !== "23505") {
      console.error("[saveVipLead error]", error);
      throw new Error("Não foi possível salvar agora. Tente novamente.");
    }
    return { success: true };
  });

// Only flips the click flag for a lead id the visitor just created; returns nothing.
export const markWhatsAppClick = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).strict().parse(data))
  .handler(async ({ data }) => {
    const supabase = await getSupabaseClient();
    await supabase.from("treino_inteligente_leads").update({ whatsapp_cta_clicked: true }).eq("id", data.id);
    return { success: true };
  });

// Registra a conclusão do quiz, dispara o webhook do n8n e armazena em quiz_leads no Supabase
export const recordQuizCompletion = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        fullName: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        answers: z.record(z.string(), z.string()),
        recommendedRoute: z.enum(["/oferta-pro", "/oferta-start"]),
        utm: z
          .object({
            source: z.string().optional(),
            utm_source: z.string().optional(),
            utm_medium: z.string().optional(),
            utm_campaign: z.string().optional(),
            utm_content: z.string().optional(),
            utm_term: z.string().optional(),
          })
          .optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    let aiRoute: string | null = null;
    let aiAnalysis: string | null = null;

    if (N8N_WEBHOOK_URL && N8N_WEBHOOK_URL.startsWith("http")) {
      try {
        const n8nRes = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead_id: data.id,
            name: data.fullName ?? "",
            full_name: data.fullName ?? "",
            nome: data.fullName ?? "",
            email: data.email ?? "",
            phone: data.phone ?? "",
            whatsapp: data.phone ?? "",
            telefone: data.phone ?? "",
            answers: data.answers,
            recommended_route: data.recommendedRoute,
            utm: data.utm,
            created_at: new Date().toISOString(),
          }),
        });

        if (n8nRes.ok) {
          const n8nJson = (await n8nRes.json().catch(() => null)) as {
            recommended_route?: string;
            rota_atribuida?: string;
            perfil_resumo?: string;
            ai_analysis?: string;
          } | null;

          if (n8nJson) {
            const returnedRoute = n8nJson.recommended_route || n8nJson.rota_atribuida;
            if (returnedRoute === "/oferta-pro" || returnedRoute === "/oferta-start") {
              aiRoute = returnedRoute;
            }
            aiAnalysis = n8nJson.perfil_resumo || n8nJson.ai_analysis || null;
          }
        }
      } catch (err) {
        console.error("Erro ao enviar payload ao n8n:", err);
      }
    }

    const finalRoute = (aiRoute || data.recommendedRoute) as "/oferta-pro" | "/oferta-start";

    try {
      const supabase = await getSupabaseClient();
      const { error } = await supabase.from("quiz_leads").upsert(
        {
          id: data.id,
          answers: data.answers,
          recommended_route: finalRoute,
          utm: {
            ...(data.utm ?? {}),
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            ...(aiAnalysis ? { ai_analysis: aiAnalysis } : {}),
          },
        },
        { onConflict: "id" },
      );
      if (error) {
        console.error("[quiz_leads upsert error]", error.message);
      } else {
        console.log("[quiz_leads saved/updated]", data.id, finalRoute);
      }
    } catch (err) {
      console.error("[quiz_leads error]", err);
    }

    return {
      success: true,
      recommendedRoute: finalRoute,
      aiAnalysis,
    };
  });
