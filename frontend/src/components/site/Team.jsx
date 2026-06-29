import { motion } from "framer-motion";
import { TEAM } from "@/constants/data";
import { Reveal } from "@/components/site/Reveal";

export const Team = () => {
  return (
    <section
      id="team"
      data-testid="team-section"
      className="relative py-32 md:py-44 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div>
            <Reveal>
              <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">
                — Atelier
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-[0.95]">
                Hands behind<br />
                <em className="gold-text">the craft.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm md:text-base text-foreground/60">
              Senior stylists, bridal artists and skin therapists — each trained
              for hours that you&apos;ll never see, so your hour feels effortless.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[3/4] overflow-hidden ring-soft bg-secondary"
              data-testid={`team-card-${i}`}
            >
              <img
                src={m.img}
                alt={m.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="relative h-full p-6 flex flex-col justify-end">
                <h3 className="font-serif-display text-2xl tracking-tight">
                  {m.name}
                </h3>
                <p className="text-[10px] tracking-[0.32em] uppercase text-primary/90 mt-1">
                  {m.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
