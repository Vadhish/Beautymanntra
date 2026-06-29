import { SERVICE_TAGS } from "@/constants/data";

export const Marquee = () => {
  const row = [...SERVICE_TAGS, ...SERVICE_TAGS];
  return (
    <section
      data-testid="marquee-section"
      className="border-y border-white/5 py-10 overflow-hidden bg-secondary/40"
    >
      <div className="flex whitespace-nowrap animate-marquee gap-12">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-serif-display text-5xl md:text-7xl tracking-tight text-transparent"
            style={{
              WebkitTextStroke: "1px #C29F72",
            }}
          >
            <em className="not-italic">{t}</em>
            <span className="text-primary text-3xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};
