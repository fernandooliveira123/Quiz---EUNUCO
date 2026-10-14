import { describe, expect, it } from "vitest";
import { QUESTIONS, calculateRecommendation, type Answers } from "./questions";

const base: Answers = Object.fromEntries(QUESTIONS.map((q) => [q.id, "A"]));

describe("quiz recommendation rules", () => {
  it("has exactly 14 questions", () => expect(QUESTIONS).toHaveLength(14));

  it("organizes questions in four stages: Etapa 1 (1–3), Etapa 2 (4–6), Etapa 3 (7–9), Etapa 4 (10–14)", () => {
    expect(QUESTIONS.map((q) => q.stage)).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4]);
  });

  it("places transitions only at the beginning of stages 2, 3 and 4", () => {
    expect(QUESTIONS.filter((q) => q.transitionBefore).map((q) => q.id)).toEqual(["q4", "q7", "q10"]);
  });

  it("brand-focused answers recommend White Label Anual", () => {
    const r = calculateRecommendation({
      ...base,
      q7: "C", // wl: 3, pro: 2
      q9: "B", // wl: 3, pro: 1
      q10: "D", // wl: 6
      q11: "A", // wl: 6
      q12: "D", // wl: 6
      q13: "C", // wl: 7
      q14: "D", // wl: 6
    });
    expect(r.recommendedProduct).toBe("whitelabel");
    expect(r.whitelabelScore).toBeGreaterThan(r.proScore);
    expect(r.whitelabelScore).toBeGreaterThan(r.startScore);
  });

  it("growth and resources focused answers recommend Pro", () => {
    const r = calculateRecommendation({
      ...base,
      q7: "B", // pro: 3
      q9: "C", // pro: 3
      q10: "C", // pro: 5
      q11: "D", // pro: 4, start: 3
      q12: "B", // pro: 5, start: 2
      q13: "B", // pro: 7
      q14: "B", // pro: 5
    });
    expect(r.recommendedProduct).toBe("pro");
    expect(r.proScore).toBeGreaterThan(r.whitelabelScore);
    expect(r.proScore).toBeGreaterThan(r.startScore);
  });

  it("budget and simplicity focused answers recommend Start", () => {
    const r = calculateRecommendation({
      ...base,
      q7: "E", // start: 2
      q9: "E", // start: 1
      q10: "A", // start: 4, pro: 1
      q11: "E", // start: 2, pro: 1
      q12: "A", // start: 6
      q13: "A", // start: 7
      q14: "A", // start: 4, pro: 2
    });
    expect(r.recommendedProduct).toBe("start");
    expect(r.startScore).toBeGreaterThan(r.whitelabelScore);
    expect(r.startScore).toBeGreaterThan(r.proScore);
  });

  it("questions 1-6 and 8 do not score", () => {
    const a = calculateRecommendation({ ...base, q7: "E", q9: "A", q10: "E", q11: "C", q12: "C", q13: "D", q14: "C" });
    const b = calculateRecommendation({ ...base, q1: "D", q2: "D", q3: "D", q4: "D", q5: "D", q6: "D", q8: "E", q7: "E", q9: "A", q10: "E", q11: "C", q12: "C", q13: "D", q14: "C" });
    expect([a.startScore, a.proScore, a.whitelabelScore]).toEqual([b.startScore, b.proScore, b.whitelabelScore]);
  });
});
