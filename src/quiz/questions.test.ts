import { describe, expect, it } from "vitest";
import { QUESTIONS, calculateRecommendation, decideOfferRoute, type Answers } from "./questions";

const base: Answers = Object.fromEntries(QUESTIONS.map((q) => [q.id, "A"]));

describe("quiz recommendation rules", () => {
  it("has exactly 16 questions", () => expect(QUESTIONS).toHaveLength(16));

  it("organizes questions in five stages: Etapa 1 (1–4), Etapa 2 (5–8), Etapa 3 (9–11), Etapa 4 (12–14), Etapa 5 (15–16)", () => {
    expect(QUESTIONS.map((q) => q.stage)).toEqual([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5]);
  });

  it("places transitions only at the beginning of stages 2, 3, 4 and 5", () => {
    expect(QUESTIONS.filter((q) => q.transitionBefore).map((q) => q.id)).toEqual(["q5", "q9", "q12", "q15"]);
  });

  it("brand-focused answers recommend White Label Anual", () => {
    const r = calculateRecommendation({
      ...base,
      q4: "D",
      q9: "D",
      q10: "D",
      q11: "D",
      q12: "C",
      q13: "C",
      q14: "A",
      q16: "C",
    });
    expect(r.recommendedProduct).toBe("whitelabel");
    expect(r.whitelabelScore).toBeGreaterThan(r.proScore);
    expect(r.whitelabelScore).toBeGreaterThan(r.startScore);
    expect(r.resultReasons.length).toBeGreaterThan(0);
  });

  it("growth and management focused answers recommend Pro", () => {
    const r = calculateRecommendation({
      ...base,
      q1: "C",
      q4: "B",
      q6: "B",
      q8: "C",
      q9: "B",
      q12: "B",
      q13: "B",
      q14: "C",
      q15: "B",
      q16: "B",
    });
    expect(r.recommendedProduct).toBe("pro");
    expect(r.proScore).toBeGreaterThan(r.whitelabelScore);
    expect(r.proScore).toBeGreaterThan(r.startScore);
  });

  it("budget and simplicity focused answers recommend Start", () => {
    const r = calculateRecommendation({
      ...base,
      q1: "A",
      q4: "A",
      q5: "A",
      q8: "A",
      q9: "A",
      q10: "A",
      q12: "A",
      q13: "A",
      q15: "A",
      q16: "A",
    });
    expect(r.recommendedProduct).toBe("start");
    expect(r.startScore).toBeGreaterThan(r.whitelabelScore);
    expect(r.startScore).toBeGreaterThan(r.proScore);
  });

  it("extracts primaryMotivation from q16", () => {
    const r = calculateRecommendation({
      ...base,
      q16: "C",
    });
    expect(r.primaryMotivation).toBe("Como ter um aplicativo com a identidade visual da minha consultoria.");
  });

  describe("intelligent offer routing (decideOfferRoute)", () => {
    it("routes leads with >10 students to /oferta-pro", () => {
      expect(decideOfferRoute({ ...base, q1: "C", q2: "A" })).toBe("/oferta-pro");
      expect(decideOfferRoute({ ...base, q1: "D", q2: "B" })).toBe("/oferta-pro");
    });

    it("routes leads seeking custom brand to /oferta-pro", () => {
      expect(decideOfferRoute({ ...base, q1: "B", q13: "C" })).toBe("/oferta-pro");
      expect(decideOfferRoute({ ...base, q1: "B", q16: "C" })).toBe("/oferta-pro");
      expect(decideOfferRoute({ ...base, q1: "B", q14: "A" })).toBe("/oferta-pro");
    });

    it("routes online and hybrid consultancies to /oferta-pro", () => {
      expect(decideOfferRoute({ ...base, q1: "B", q3: "B" })).toBe("/oferta-pro");
      expect(decideOfferRoute({ ...base, q1: "B", q3: "C" })).toBe("/oferta-pro");
    });

    it("routes beginners with 0-9 students on spreadsheets/WhatsApp to /oferta-start", () => {
      expect(decideOfferRoute({ ...base, q1: "A", q2: "A", q13: "A", q14: "C", q16: "A" })).toBe("/oferta-start");
      expect(decideOfferRoute({ ...base, q1: "B", q2: "B", q3: "A", q13: "A", q14: "C", q16: "A" })).toBe("/oferta-start");
    });

  });
});

