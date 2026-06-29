import { motion } from "framer-motion";
import { PROCESS } from "@/constants/data";
import { Reveal } from "@/components/site/Reveal";

export const Process = () => {
  return (
    <section
      data-testid="process-section"
      className="relative py-32 md:py-44 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <Reveal>
              <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">
                — Process
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif-display text-5xl md:text-6xl tracking-tighter leading-[0.95]">
                Four quiet<br />
                <em className="gold-text">acts.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-sm md:text-base text-foreground/60 max-w-sm">
                No queues, no rush. Just a clear, considered sequence — designed
                to make you feel held from the moment you walk in.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10" />
            <div className="space-y-14">
              {PROCESS.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-14"
                  data-testid={`process-step-${p.n}`}
                >
                  <span className="absolute left-0 top-1 w-7 h-7 border border-primary/60 rounded-full flex items-center justify-center text-[10px] tracking-widest text-primary bg-background">
                    {i + 1}
                  </span>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-2">
                    Act {p.n}
                  </p>
                  <h3 className="font-serif-display text-3xl md:text-4xl tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-foreground/70 max-w-md">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
