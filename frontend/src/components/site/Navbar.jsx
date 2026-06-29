import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV, BRAND } from "@/constants/data";

export const Navbar = ({ onBook }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2"
          data-testid="brand-link"
        >
          <span className="font-serif-display text-2xl tracking-tight">
            Beauty<em className="not-italic gold-text">manntra</em>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.to}
              className="text-xs tracking-[0.28em] uppercase text-foreground/70 hover:text-primary transition-colors"
              data-testid={`nav-${n.label.toLowerCase()}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="hidden md:flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-foreground/70 hover:text-primary transition-colors"
            data-testid="nav-call"
          >
            <Phone className="w-3.5 h-3.5" />
            {BRAND.phone}
          </a>
          <button
            onClick={onBook}
            data-testid="nav-book-btn"
            className="hidden sm:inline-flex items-center px-5 py-2.5 text-xs tracking-[0.22em] uppercase bg-primary text-primary-foreground hover:bg-[#D8B485] transition-colors"
          >
            Book Now
          </button>
          <button
            className="lg:hidden text-foreground/80 p-2"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            aria-label="menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-4"
        >
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.to}
              onClick={() => setOpen(false)}
              className="text-sm tracking-[0.22em] uppercase text-foreground/80"
            >
              {n.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onBook?.();
            }}
            className="mt-2 inline-flex justify-center items-center px-5 py-3 text-xs tracking-[0.22em] uppercase bg-primary text-primary-foreground"
          >
            Book Appointment
          </button>
        </motion.div>
      )}
    </motion.header>
  );
};
