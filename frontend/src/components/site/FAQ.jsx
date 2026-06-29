import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ as FAQDATA } from "@/constants/data";
import { Reveal } from "@/components/site/Reveal";

export const FAQ = () => {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-32 md:py-44 bg-secondary/30"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <Reveal>
            <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">
              — Questions
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif-display text-5xl md:text-6xl tracking-tighter leading-[0.95] max-w-2xl">
              Before you<br />
              <em className="gold-text">book.</em>
            </h2>
          </Reveal>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQDATA.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-white/10"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left font-serif-display text-2xl md:text-3xl tracking-tight py-6 hover:text-primary hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/70 leading-relaxed pb-8 max-w-2xl">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
