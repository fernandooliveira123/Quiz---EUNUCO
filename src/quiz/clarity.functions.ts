import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function checkPin(pin: string): boolean {
  const expected = process.env["CRM_PIN"] || "treino2026";
  return pin.trim() === expected.trim();
}

const DEFAULT_CLARITY_API_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ4M0FCMDhFNUYwRDMxNjdEOTRFMTQ3M0FEQTk2RTcyRDkwRUYwRkYiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJjNjc3ZTgyYi02NzVhLTQ1ODAtYmU5NC00NDBlMTkyM2JjNjkiLCJzdWIiOiIzNTU3MDEzODgyNTMzMTA5Iiwic2NvcGUiOiJEYXRhLkV4cG9ydCIsIm5iZiI6MTc5MjUyOTgzNywiZXhwIjo0OTQ2MTI5ODM3LCJpYXQiOjE3OTI1Mjk4MzcsImlzcyI6ImNsYXJpdHkiLCJhdWQiOiJjbGFyaXR5LmRhdGEtZXhwb3J0ZXIifQ.kiqerQBnoa7ENsG-TiHgcOlhs21TzeMowKzj6xVhE-AJQFlKbnlXaJ_2JbxrEUu86XyRKZKU8GU4KWa711lDrAgWrUaZ8UY7KkTzD6DmO4C0HUi2hqGy0plYkp5UR5SVVYn-SgS_1KbRrnIB7iQ1C74FyFIu0V3aj4fjy-_crhRzGqOtkGGCXiKO7g3m9fCkWzpMblkt8S4JwMcuI7Fuu4mIrG85LCW-2GKsYhkc-2auIbySPzxa_47oPb0QIvZrlF-UUYaFoQJWvMt5nAYeF9LrT9rkINeswA1fjlOMqhRXiqCCbToLP9eKsoEFn-A-1P5mVgR9tRsPv-BVayyemA";

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

    const token = process.env["CLARITY_API_TOKEN"] || DEFAULT_CLARITY_API_TOKEN;
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
