import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { BRAND } from "@/constants/data";
import { Reveal } from "@/components/site/Reveal";

export const Contact = ({ onBook }) => {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-32 md:py-44 max-w-7xl mx-auto px-6 lg:px-12"
    >
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-xs tracking-[0.5em] uppercase text-primary mb-6">
              — Visit
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif-display text-5xl md:text-6xl tracking-tighter leading-[0.95]">
              Come<br />
              <em className="gold-text">find us.</em>
            </h2>
          </Reveal>

          <div className="mt-10 space-y-6">
            <Reveal delay={0.15}>
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-1">
                    Address
                  </p>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed max-w-sm">
                    {BRAND.address}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${BRAND.phoneRaw}`}
                    className="text-sm md:text-base text-foreground/85 hover:text-primary transition-colors"
                    data-testid="contact-phone"
                  >
                    {BRAND.phone}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex items-start gap-4">
                <Clock className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-1">
                    Hours
                  </p>
                  <p className="text-sm md:text-base text-foreground/85">
                    Mon–Sun · 10 am – 9 pm
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.instagram.com/beautymanntrasalon/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 border border-white/15 hover:border-primary hover:text-primary text-foreground/70 flex items-center justify-center transition-colors"
                  data-testid="social-instagram"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/beautymanntrasalon"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 border border-white/15 hover:border-primary hover:text-primary text-foreground/70 flex items-center justify-center transition-colors"
                  data-testid="social-facebook"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <button
                onClick={onBook}
                data-testid="contact-book-btn"
                className="mt-6 inline-flex items-center px-7 py-3.5 text-xs tracking-[0.22em] uppercase bg-primary text-primary-foreground hover:bg-[#D8B485] transition-colors"
              >
                Book an appointment
              </button>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <div
              className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[560px] ring-soft overflow-hidden bg-secondary"
              data-testid="contact-map"
            >
              <iframe
                title="Beautymanntra location"
                src={BRAND.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) contrast(0.85) saturate(0.6)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
