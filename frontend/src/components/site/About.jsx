import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { ABOUT_IMAGES, BRAND } from "@/constants/data";

const Counter = ({ to, suffix = "", duration = 1800 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="font-serif-display text-5xl md:text-6xl gold-text">
      {val}
      {suffix}
    </span>
  );
};

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-32 md:py-44 max-w-7xl mx-auto px-6 lg:px-12"
    >
      <Reveal>
        <p className="text-xs tracking-[0.5em] uppercase text-primary mb-8">
          — The House
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-[0.95]">
            <RevealLines
              text={"A salon that\nmoves slowly,\nintentionally."}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed">
              For over a decade, Beautymanntra has quietly become Vadodara&apos;s
              address for ceremony-ready bridal looks, considered hair colour
              and the kind of facials that get talked about over dinner.
              Everything we do is built around one belief — beauty should feel
              private, never performed.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-xl text-sm md:text-base text-foreground/60 leading-relaxed">
              {BRAND.address}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 relative h-[520px] md:h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 w-[70%] h-[60%] overflow-hidden ring-soft"
          >
            <img
              src={ABOUT_IMAGES[0]}
              alt="Salon detail"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 w-[65%] h-[55%] overflow-hidden ring-soft"
          >
            <img
              src={ABOUT_IMAGES[1]}
              alt="Therapist at work"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/5 pt-12"
        data-testid="about-stats"
      >
        {[
          { v: 12, s: "+", l: "Years of craft" },
          { v: BRAND.reviews, s: "+", l: "5-star reviews" },
          { v: 60, s: "+", l: "Trained artists" },
          { v: 4.6, s: "★", l: "Google rating" },
        ].map((it, i) => (
          <Reveal key={i} delay={0.1 * i}>
            <div>
              <Counter to={it.v} suffix={it.s} />
              <p className="mt-3 text-xs tracking-[0.28em] uppercase text-foreground/60">
                {it.l}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
