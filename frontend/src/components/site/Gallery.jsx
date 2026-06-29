import { motion } from "framer-motion";
import { GALLERY } from "@/constants/data";
import { Reveal } from "@/components/site/Reveal";

export const Gallery = () => {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="relative py-32 md:py-44 max-w-7xl mx-auto px-6 lg:px-12"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
        <div>
          <Reveal>
            <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">
              — Gallery
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-[0.95]">
              The <em className="gold-text">work,</em><br />in frames.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <p className="max-w-sm text-sm md:text-base text-foreground/60">
            A small selection from recent weeks — bridal, colour, smoothening
            and stillness, captured.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(4,minmax(0,1fr))] auto-rows-[160px] gap-3 md:gap-5">
        {GALLERY.map((src, i) => {
          // Variable spans to create masonry feel
          const spans = [
            "col-span-2 row-span-2",
            "row-span-2",
            "row-span-2",
            "col-span-2",
            "col-span-1 row-span-2",
            "col-span-1",
            "col-span-2",
            "col-span-2 row-span-2",
          ];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative overflow-hidden ring-soft group ${spans[i % spans.length]}`}
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={src}
                alt={`Beautymanntra work ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
