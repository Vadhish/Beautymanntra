import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS, BRAND } from "@/constants/data";
import { Reveal } from "@/components/site/Reveal";

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      data-testid="testimonials-section"
      className="relative py-32 md:py-44 max-w-7xl mx-auto px-6 lg:px-12"
    >
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">
              — Voices
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif-display text-5xl md:text-6xl tracking-tighter leading-[0.95]">
              Said by<br />
              <em className="gold-text">our guests.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div
              className="mt-10 flex items-center gap-3"
              data-testid="aggregate-rating"
            >
              <div className="flex items-center gap-0.5 text-primary">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-primary" />
                ))}
              </div>
              <div>
                <p className="font-serif-display text-3xl">{BRAND.rating}</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">
                  Google · {BRAND.reviews.toLocaleString()} reviews
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8 relative">
          <Quote className="w-16 h-16 text-primary/30 mb-6" />
          <div className="min-h-[220px] relative">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif-display text-3xl md:text-4xl tracking-tight leading-tight text-foreground/90"
                data-testid="testimonial-quote"
              >
                &ldquo;{t.quote}&rdquo;
                <footer className="mt-8 text-sm font-sans-display tracking-[0.18em] uppercase text-foreground/60">
                  <span className="text-primary">{t.name}</span> · {t.meta}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={() =>
                setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
              }
              data-testid="testimonial-prev"
              className="w-10 h-10 border border-white/15 hover:border-primary hover:text-primary text-foreground/70 flex items-center justify-center transition-colors"
              aria-label="prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setI((v) => (v + 1) % TESTIMONIALS.length)}
              data-testid="testimonial-next"
              className="w-10 h-10 border border-white/15 hover:border-primary hover:text-primary text-foreground/70 flex items-center justify-center transition-colors"
              aria-label="next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 ml-3">
              {TESTIMONIALS.map((_, k) => (
                <span
                  key={k}
                  className={`h-px transition-all duration-500 ${
                    k === i ? "w-10 bg-primary" : "w-5 bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
