import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { SERVICES } from "@/constants/data";
import { Reveal } from "@/components/site/Reveal";

export const Services = ({ onBook }) => {
  const [active, setActive] = useState(null);
  const open = active !== null ? SERVICES[active] : null;

  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-32 md:py-44 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div>
            <Reveal>
              <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">
                — Services
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-[0.95] max-w-3xl">
                Crafted rituals,<br />
                <em className="gold-text">six disciplines.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm md:text-base text-foreground/60 leading-relaxed">
              Hover or tap any discipline to peek inside. Book the one that&apos;s
              calling your name today.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.05}>
              <motion.button
                whileHover="hover"
                onClick={() => setActive(i)}
                data-testid={`service-card-${s.key}`}
                className="group relative w-full text-left aspect-[4/5] overflow-hidden ring-soft bg-secondary"
              >
                <motion.img
                  src={s.image}
                  alt={s.title}
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="relative h-full p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-primary/90">
                      {s.tag}
                    </span>
                    <motion.span
                      variants={{ hover: { x: 4, y: -4 } }}
                      transition={{ duration: 0.4 }}
                      className="text-primary"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.span>
                  </div>
                  <div>
                    <h3 className="font-serif-display text-4xl md:text-5xl tracking-tighter">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm text-foreground/70 max-w-xs">
                      {s.blurb}
                    </p>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Detail dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setActive(null)}
            data-testid="service-dialog"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl grid md:grid-cols-2 bg-secondary ring-soft overflow-hidden"
            >
              <img
                src={open.image}
                alt={open.title}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="p-8 md:p-12 relative">
                <button
                  className="absolute top-5 right-5 text-foreground/60 hover:text-primary"
                  onClick={() => setActive(null)}
                  aria-label="close"
                  data-testid="service-dialog-close"
                >
                  <X className="w-5 h-5" />
                </button>
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">
                  {open.tag}
                </p>
                <h3 className="font-serif-display text-4xl md:text-5xl tracking-tighter">
                  {open.title}
                </h3>
                <p className="mt-4 text-sm md:text-base text-foreground/70">
                  {open.blurb}
                </p>
                <ul className="mt-8 space-y-3">
                  {open.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-3 text-sm border-b border-white/5 pb-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {it}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setActive(null);
                    onBook?.(open.title);
                  }}
                  data-testid="service-dialog-book"
                  className="mt-10 inline-flex items-center px-6 py-3 text-xs tracking-[0.22em] uppercase bg-primary text-primary-foreground hover:bg-[#D8B485] transition-colors"
                >
                  Book this service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
