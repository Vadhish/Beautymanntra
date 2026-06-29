import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { BRAND, NAV } from "@/constants/data";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await api.post("/newsletter", { email });
      toast.success("Subscribed. See you in your inbox.");
      setEmail("");
    } catch {
      toast.error("Couldn't subscribe. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer
      data-testid="site-footer"
      className="relative pt-24 pb-10 bg-background border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <h3 className="font-serif-display text-3xl md:text-4xl tracking-tighter leading-tight">
              Stay close to<br />
              <em className="gold-text">the atelier.</em>
            </h3>
            <p className="mt-4 text-sm text-foreground/60 max-w-sm">
              Occasional notes — new services, seasonal rituals and bridal
              calendars. No noise.
            </p>
            <form
              onSubmit={submit}
              className="mt-6 flex items-center border-b border-white/15 focus-within:border-primary transition-colors"
              data-testid="newsletter-form"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent py-3 text-sm placeholder:text-foreground/30 focus:outline-none"
                data-testid="newsletter-email"
              />
              <button
                type="submit"
                disabled={busy}
                data-testid="newsletter-submit"
                className="ml-4 text-xs tracking-[0.28em] uppercase text-primary hover:text-foreground transition-colors disabled:opacity-50"
              >
                {busy ? "…" : "Subscribe"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.to}
                    className="text-sm text-foreground/75 hover:text-primary transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 mb-4">
              Reach
            </p>
            <p className="text-sm text-foreground/75 leading-relaxed">
              {BRAND.address}
            </p>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="block mt-4 text-sm text-foreground/85 hover:text-primary transition-colors"
            >
              {BRAND.phone}
            </a>
          </div>
        </div>

        <h2 className="font-serif-display text-[20vw] leading-none tracking-tighter text-transparent select-none"
          style={{ WebkitTextStroke: "1px rgba(194,159,114,0.18)" }}
        >
          beautymanntra
        </h2>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs tracking-[0.22em] uppercase text-foreground/40">
            © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
          </p>
          <p className="text-xs tracking-[0.22em] uppercase text-foreground/40">
            Crafted in Vadodara · India
          </p>
        </div>
      </div>
    </footer>
  );
};
