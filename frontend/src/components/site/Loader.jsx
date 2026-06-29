import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Loader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setProgress(100);
        setTimeout(() => {
          setDone(true);
          onDone?.();
        }, 500);
      } else {
        setProgress(Math.floor(p));
      }
    }, 160);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="loading-screen"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center grain"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <p className="text-xs tracking-[0.5em] uppercase text-primary/80 mb-6">
              Beautymanntra
            </p>
            <h1 className="font-serif-display text-6xl sm:text-7xl md:text-8xl tracking-tighter text-foreground/90">
              <span className="gold-text">Atelier</span> of
              <br />
              <em className="not-italic">Beauty.</em>
            </h1>
          </motion.div>

          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3 px-6">
            <div className="w-full max-w-md h-px bg-muted relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex w-full max-w-md justify-between text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
              <span>Loading Experience</span>
              <span data-testid="loader-progress">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
