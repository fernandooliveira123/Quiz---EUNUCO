import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { leadSchema } from "./lead-schema";
import { calculateRecommendation } from "./questions";

// Public, insert-only action: never returns contact records. Recommendation is recomputed on the server.
export const saveVipLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const rec = calculateRecommendation(data.answers);
    const { error } = await supabaseAdmin.from("treino_inteligente_leads").insert({
      id: data.id,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      answers: data.answers,
      recommended_product: rec.recommendedProduct,
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
    if (error && error.code !== "23505") throw new Error("Não foi possível salvar agora. Tente novamente.");
    return { success: true };
  });

// Only flips the click flag for a lead id the visitor just created; returns nothing.
export const markWhatsAppClick = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).strict().parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("treino_inteligente_leads").update({ whatsapp_cta_clicked: true }).eq("id", data.id);
    return { success: true };
  });
