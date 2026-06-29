import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const RevealLines = ({ text, className = "", delay = 0 }) => {
  const lines = text.split("\n");
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.08,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
