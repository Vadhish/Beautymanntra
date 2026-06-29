import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MagneticButton = ({
  children,
  onClick,
  variant = "solid",
  className = "",
  ...rest
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center px-7 py-3.5 text-sm tracking-[0.18em] uppercase transition-colors duration-300 select-none";
  const styles =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:bg-[#D8B485]"
      : "border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
