import { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { QUESTIONS, type Answers, type QuizOption } from "@/quiz/questions";
import { QuizContainer } from "./QuizContainer";

const ANSWERED = QUESTIONS[2]!; // q3 — a resposta dela abre a frase de transição da q4
const NEXT = QUESTIONS[3]!; // q4 — tem transitionBefore
const PLAIN = QUESTIONS[0]!; // q1 — a próxima (q2) não tem frase de transição

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Clica numa alternativa; o nome acessível do botão inclui a letra da opção. */
function pick(option: QuizOption) {
  fireEvent.click(
    screen.getByRole("radio", { name: new RegExp(escapeRegExp(option.text), "i") }),
  );
}

function setup(index: number) {
  const onAnswer = vi.fn();
  const onIndex = vi.fn();
  const onComplete = vi.fn();
  render(
    <QuizContainer index={index} answers={{}} onAnswer={onAnswer} onIndex={onIndex} onComplete={onComplete} />,
  );
  return { onIndex, onComplete };
}

async function flush(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

describe("frase de transição entre perguntas", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("mostra a frase com um botão Próximo e não avança sozinha", async () => {
    const { onIndex } = setup(2);

    pick(ANSWERED.options[0]!);
    await flush(500); // ADVANCE_DELAY: a frase aparece depois da confirmação da resposta

    expect(screen.getByText(NEXT.transitionBefore!)).toBeInTheDocument();
    const proximo = screen.getByRole("button", { name: /^Próximo$/i });

    await flush(30_000);
    expect(onIndex).not.toHaveBeenCalled();

    fireEvent.click(proximo);
    expect(onIndex).toHaveBeenCalledWith(3);
  });

  it("avança direto quando a próxima pergunta não tem frase de transição", async () => {
    const { onIndex } = setup(0);

    pick(PLAIN.options[0]!);
    await flush(500);

    expect(screen.queryByText(NEXT.transitionBefore!)).not.toBeInTheDocument();
    expect(onIndex).toHaveBeenCalledWith(1);
  });

  it("preserva a resposta anterior ao voltar e atualiza o progresso", async () => {
    function Flow() {
      const [index, setIndex] = useState(0);
      const [answers, setAnswers] = useState<Answers>({});
      return <QuizContainer index={index} answers={answers} onAnswer={setAnswers} onIndex={setIndex} onComplete={vi.fn()} />;
    }
    render(<Flow />);
    const option = QUESTIONS[0]?.options[1];
    if (!option) throw new Error("Missing q1 option B");
    pick(option);
    await flush(500);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "14");
    fireEvent.click(screen.getByRole("button", { name: "Voltar para a pergunta anterior" }));
    expect(screen.getByRole("radio", { name: new RegExp(escapeRegExp(option.text)) })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "7");
  });
});
