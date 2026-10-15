import { describe, expect, it } from "vitest";
import { leadSchema } from "./lead-schema";
import { QUESTIONS } from "./questions";

const answers = Object.fromEntries(QUESTIONS.map((q) => [q.id, "A"]));
const lead = { id: "80b2c9e7-170d-4daa-9a62-b3b2dca3df69", fullName: "Ana  Silva", email: "Ana@Example.com", phone: "(91) 99999-1234", consent: true, website: "", answers, utm: {} };

describe("VIP lead capture", () => {
  it("requires first and last name", () => expect(leadSchema.safeParse({ ...lead, fullName: "Ana" }).success).toBe(false));
  it("requires a valid email", () => expect(leadSchema.safeParse({ ...lead, email: "ana" }).success).toBe(false));
  it("stores phone in E.164", () => expect(leadSchema.parse(lead).phone).toBe("+5591999991234"));
  it("rejects invalid phones", () => {
    expect(leadSchema.safeParse({ ...lead, phone: "(91) 1234" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...lead, phone: "(91) 99999-9999" }).success).toBe(false);
  });
  it("requires privacy consent", () => expect(leadSchema.safeParse({ ...lead, consent: false }).success).toBe(false));
  it("requires all 16 answers", () => expect(leadSchema.safeParse({ ...lead, answers: { q1: "A" } }).success).toBe(false));
  it("rejects the bot honeypot", () => expect(leadSchema.safeParse({ ...lead, website: "spam" }).success).toBe(false));
});
