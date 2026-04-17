import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  q: string;
  a: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  faqs: FAQ[];
}

export const FAQSection = ({ title = "Frequently Asked Questions", subtitle, faqs }: Props) => (
  <section className="py-16 md:py-24 bg-cream/60">
    <div className="container max-w-4xl">
      <div className="text-center mb-10">
        <p className="text-gold font-semibold uppercase tracking-wider text-sm mb-2">FAQ</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-3" data-speakable>{title}</h2>
        {subtitle && <p className="text-foreground/70 max-w-2xl mx-auto">{subtitle}</p>}
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}
            className="border border-border rounded-lg bg-card px-5 shadow-card data-[state=open]:shadow-elegant transition-smooth">
            <AccordionTrigger className="text-left font-serif text-lg font-semibold text-navy hover:no-underline" data-speakable>
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80 leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
