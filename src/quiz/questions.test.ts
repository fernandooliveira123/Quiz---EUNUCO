import { describe, expect, it } from "vitest";
import { QUESTIONS, calculateRecommendation, type Answers } from "./questions";

const base: Answers = Object.fromEntries(QUESTIONS.map((q) => [q.id, "A"]));

describe("quiz recommendation rules", () => {
  it("has exactly 14 questions", () => expect(QUESTIONS).toHaveLength(14));
  it("organizes questions 1–3, 4–5, 6–9 and 10–14 in four stages", () => {
    expect(QUESTIONS.map((q) => q.stage)).toEqual([1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4]);
  });
  it("places transitions only at the beginning of stages 2, 3 and 4", () => {
    expect(QUESTIONS.filter((q) => q.transitionBefore).map((q) => q.id)).toEqual(["q4", "q6", "q10"]);
  });
  it("brand-focused answers recommend Personalizado", () => {
    const r = calculateRecommendation({ ...base, q7: "C", q10: "A", q11: "A", q12: "B", q13: "B", q14: "B" });
    expect(r.recommendedProduct).toBe("personalizado");
    expect(r.personalizedScore).toBe(5 + 1 + 5 + 5 + 5 + 6 + 4);
  });
  it("practicality-focused answers recommend Mensal", () => {
    const r = calculateRecommendation({ ...base, q7: "A", q10: "D", q11: "D", q12: "A", q13: "A", q14: "A" });
    expect(r.recommendedProduct).toBe("mensal");
    expect(r.mensalScore).toBe(3 + 1 + 4 + 4 + 5 + 6 + 3);
  });
  it("questions 1-6 and 8 do not score", () => {
    const a = calculateRecommendation({ ...base, q7: "E", q9: "A", q10: "E", q11: "C", q12: "C", q13: "C", q14: "C" });
    const b = calculateRecommendation({ ...base, q1: "D", q2: "D", q8: "E", q7: "E", q9: "A", q10: "E", q11: "C", q12: "C", q13: "C", q14: "C" });
    expect([a.personalizedScore, a.mensalScore]).toEqual([b.personalizedScore, b.mensalScore]);
  });
  it("tie is broken by question 12 when q13 is neutral", () => {
    const tie = calculateRecommendation({ ...base, q7: "E", q9: "B", q10: "E", q11: "C", q12: "A", q13: "C", q14: "B" });
    expect(tie.personalizedScore).toBe(9); // q9B 2 + q10E 1 + q11C 1 + q13C 1 + q14B 4
    expect(tie.mensalScore).toBe(9); // q10E 1 + q11C 2 + q12A 5 + q13C 1
    expect(tie.recommendedProduct).toBe("mensal"); // empate: q12 A decide
  });
});
