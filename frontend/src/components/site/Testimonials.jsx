import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND } from "@/constants/data";
import { REAL_REVIEWS } from "@/constants/reviews";
import { Reveal } from "@/components/site/Reveal";

const FEATURED = REAL_REVIEWS.slice(0, 8);

const initials = (n) =>
  n
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const t = FEATURED[i];

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % FEATURED.length), 6500);
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
          <div className="min-h-[260px] relative">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif-display text-2xl md:text-3xl tracking-tight leading-snug text-foreground/90"
                data-testid="testimonial-quote"
              >
                &ldquo;{t.text}&rdquo;
                <footer className="mt-8 text-sm font-sans-display tracking-[0.18em] uppercase text-foreground/60">
                  <span className="text-primary">{t.name}</span> · {t.service} · {t.when}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={() =>
                setI((v) => (v - 1 + FEATURED.length) % FEATURED.length)
              }
              data-testid="testimonial-prev"
              className="w-10 h-10 border border-white/15 hover:border-primary hover:text-primary text-foreground/70 flex items-center justify-center transition-colors"
              aria-label="prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setI((v) => (v + 1) % FEATURED.length)}
              data-testid="testimonial-next"
              className="w-10 h-10 border border-white/15 hover:border-primary hover:text-primary text-foreground/70 flex items-center justify-center transition-colors"
              aria-label="next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 ml-3">
              {FEATURED.map((_, k) => (
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

      {/* Wall of all reviews */}
      <div className="mt-28">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <Reveal>
              <p className="text-xs tracking-[0.5em] uppercase text-primary mb-4">
                — All Reviews
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-serif-display text-3xl md:text-4xl tracking-tight">
                A wall of <em className="gold-text">real Google reviews.</em>
              </h3>
            </Reveal>
          </div>
          <button
            onClick={() => setShowAll((v) => !v)}
            data-testid="toggle-all-reviews"
            className="text-xs tracking-[0.28em] uppercase border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors px-5 py-3"
          >
            {showAll ? "Show less" : `Show all ${REAL_REVIEWS.length}`}
          </button>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-testid="reviews-wall"
        >
          {(showAll ? REAL_REVIEWS : REAL_REVIEWS.slice(0, 9)).map((r, k) => (
            <motion.article
              key={r.name + k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: (k % 9) * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-secondary/60 ring-soft p-6 flex flex-col"
              data-testid={`review-card-${k}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-xs tracking-widest text-primary font-sans-display">
                  {initials(r.name)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-foreground/90 truncate">{r.name}</p>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/45">
                    {r.when}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-0.5 text-primary">
                  {[...Array(r.rating)].map((_, kk) => (
                    <Star key={kk} className="w-3 h-3 fill-primary" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed line-clamp-6">
                {r.text}
              </p>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-primary/80">
                {r.service}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-xs tracking-[0.28em] uppercase text-foreground/40 text-center">
          + {(BRAND.reviews - REAL_REVIEWS.length).toLocaleString()} more reviews on Google
        </p>
      </div>
    </section>
  );
};
