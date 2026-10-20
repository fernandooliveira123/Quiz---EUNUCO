import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function checkPin(pin: string): boolean {
  const expected = process.env["CRM_PIN"] || "treino2026";
  return pin.trim() === expected.trim();
}

/**
 * Consulta a API oficial de Exportação de Dados do Microsoft Clarity
 * Endpoint: https://www.clarity.ms/export-data/api/v1/project-live-insights
 */
export const fetchClarityLiveInsights = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        pin: z.string(),
        numOfDays: z.number().min(1).max(3).default(1),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    if (!checkPin(data.pin)) {
      throw new Error("Acesso negado: PIN inválido.");
    }

    const token = process.env["CLARITY_API_TOKEN"];
    if (!token) {
      return {
        ok: false,
        error: "Token da API do Microsoft Clarity não encontrado no ambiente do servidor.",
      };
    }

    try {
      const response = await fetch(
        `https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=${data.numOfDays}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          error: `Erro ao consultar Clarity API (Status ${response.status}): ${response.statusText}`,
        };
      }

      const json = await response.json();
      return { ok: true, data: json };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro desconhecido ao conectar com Clarity API";
      return { ok: false, error: message };
    }
  });
