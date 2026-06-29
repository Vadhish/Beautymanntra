import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRICING } from "@/constants/data";
import { Reveal } from "@/components/site/Reveal";

export const Pricing = ({ onBook }) => {
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative py-32 md:py-44 max-w-7xl mx-auto px-6 lg:px-12"
    >
      <div className="text-center mb-20">
        <Reveal>
          <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">
            — Packages
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-[0.95]">
            Curated <em className="gold-text">packages.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-sm md:text-base text-foreground/60 max-w-lg mx-auto">
            Three considered routes into Beautymanntra. À-la-carte services and
            custom plans are available on request.
          </p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PRICING.map((p, i) => (
          <motion.div
            key={p.tier}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.9,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative p-8 md:p-10 flex flex-col ${
              p.featured
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/60 ring-soft text-foreground"
            }`}
            data-testid={`pricing-${p.tier.toLowerCase().replace(/\s/g, "-")}`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-8 text-[10px] tracking-[0.4em] uppercase bg-background text-primary px-3 py-1">
                Most loved
              </span>
            )}
            <p
              className={`text-[10px] tracking-[0.4em] uppercase mb-4 ${
                p.featured ? "text-primary-foreground/70" : "text-primary/80"
              }`}
            >
              0{i + 1} — Tier
            </p>
            <h3 className="font-serif-display text-3xl md:text-4xl tracking-tight">
              {p.tier}
            </h3>
            <p
              className={`mt-2 text-sm ${
                p.featured ? "text-primary-foreground/80" : "text-foreground/60"
              }`}
            >
              {p.blurb}
            </p>
            <div className="mt-8 font-serif-display text-5xl tracking-tighter">
              {p.price}
            </div>

            <ul className="mt-8 space-y-3 flex-1">
              {p.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-sm">
                  <Check
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      p.featured ? "text-primary-foreground" : "text-primary"
                    }`}
                  />
                  <span
                    className={
                      p.featured
                        ? "text-primary-foreground/90"
                        : "text-foreground/80"
                    }
                  >
                    {it}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onBook?.(p.tier)}
              data-testid={`pricing-book-${p.tier.toLowerCase().replace(/\s/g, "-")}`}
              className={`mt-10 inline-flex items-center justify-center px-6 py-3 text-xs tracking-[0.22em] uppercase transition-colors ${
                p.featured
                  ? "bg-background text-primary hover:bg-black/80"
                  : "border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Book this tier
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
