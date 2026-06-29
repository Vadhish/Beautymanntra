import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Star } from "lucide-react";
import { BRAND, HERO_IMAGE } from "@/constants/data";
import { RevealLines } from "@/components/site/Reveal";
import { MagneticButton } from "@/components/site/MagneticButton";

export const Hero = ({ onBook }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const scale = useTransform(scrollY, [0, 800], [1.05, 1.2]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden grain"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.img
          src={HERO_IMAGE}
          alt="Beautymanntra salon interior"
          className="w-full h-full object-cover"
          style={{
            transform: `translate3d(${mouse.x}px, ${mouse.y}px, 0) scale(1.08)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-background/30" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[3px] h-[3px] rounded-full bg-primary/60"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: ["0%", "-120%"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex items-center gap-3 mb-8 text-xs tracking-[0.4em] uppercase text-primary/90"
        >
          <span className="w-12 h-px bg-primary/60" />
          Vadodara · Est. since
        </motion.div>

        <h1
          className="font-serif-display tracking-tighter leading-[0.95] text-foreground"
          data-testid="hero-headline"
        >
          <RevealLines
            text={"An atelier of\nhair, skin\n& slow rituals."}
            className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.2rem]"
            delay={1.4}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <p className="max-w-md text-base sm:text-lg text-foreground/70 font-light leading-relaxed">
            A unisex salon &amp; spa in Vadodara where every cut, colour and
            ceremony is treated as a quiet, private craft.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton onClick={onBook} data-testid="hero-book-btn">
              Book an appointment
            </MagneticButton>
            <a href="#services">
              <MagneticButton variant="ghost" data-testid="hero-explore-btn">
                Explore services
              </MagneticButton>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-12 flex items-center justify-between border-t border-white/10 pt-6"
        >
          <div className="flex items-center gap-3" data-testid="hero-rating">
            <div className="flex items-center gap-0.5 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-primary" />
              ))}
            </div>
            <span className="text-xs tracking-[0.28em] uppercase text-foreground/70">
              {BRAND.rating} · {BRAND.reviews.toLocaleString()} Google reviews
            </span>
          </div>
          <a
            href="#about"
            className="hidden md:flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-foreground/60 hover:text-primary transition-colors"
          >
            Scroll <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
