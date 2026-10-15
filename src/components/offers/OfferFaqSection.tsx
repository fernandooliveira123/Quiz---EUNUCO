import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

export function OfferFaqSection({ items }: Props) {
  return (
    <section className="my-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Tire suas dúvidas</span>
        <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">Perguntas Frequentes</h2>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {items.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="rounded-xl border border-border bg-card/60 px-5 data-[state=open]:border-primary/50 data-[state=open]:bg-card"
            >
              <AccordionTrigger className="text-left font-bold text-[15px] sm:text-base hover:text-primary transition-colors py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed sm:text-[15px] pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
