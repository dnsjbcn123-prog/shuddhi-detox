import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "@/assets/hero-workspace.jpg";

interface IntroExperienceProps {
  onEnter: () => void;
}

const IntroExperience = ({ onEnter }: IntroExperienceProps) => {
  const [phase, setPhase] = useState(0);

  // Phase 0: breathing circle + "Pause."
  // Phase 1: "You are entering Shuddhi."
  // Phase 2: "Where technology meets balance." + image reveal + Enter button

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ backgroundColor: "hsl(196, 24%, 19%)" }}
      animate={{
        backgroundColor: phase >= 2 ? "hsl(196, 24%, 12%)" : "hsl(196, 24%, 19%)",
      }}
      transition={{ duration: 2 }}
    >
      {/* Background image reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 0.3 : 0 }}
        transition={{ duration: 3 }}
      >
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: phase >= 2 ? "blur(10px)" : "blur(40px)" }}
        />
      </motion.div>

      {/* Breathing circle */}
      <motion.div
        className="absolute"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: phase < 2 ? [0.8, 1.15, 0.8] : 1.5,
          opacity: phase < 2 ? [0.3, 0.7, 0.3] : 0,
        }}
        transition={
          phase < 2
            ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 2 }
        }
      >
        <div className="h-48 w-48 rounded-full bg-primary/30 blur-sm" />
      </motion.div>

      {/* Text phases */}
      <div className="relative z-10 text-center">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.h1
              key="pause"
              className="font-heading text-5xl font-light tracking-wide text-primary-foreground md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              onAnimationComplete={() => {
                setTimeout(() => setPhase(1), 2000);
              }}
            >
              Pause.
            </motion.h1>
          )}

          {phase === 1 && (
            <motion.h1
              key="entering"
              className="font-heading text-3xl font-light tracking-wide text-primary-foreground md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              onAnimationComplete={() => {
                setTimeout(() => setPhase(2), 2500);
              }}
            >
              You are entering Shuddhi.
            </motion.h1>
          )}

          {phase === 2 && (
            <motion.div
              key="balance"
              className="flex flex-col items-center gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <motion.p
                className="font-accent text-2xl italic text-primary-foreground/80 md:text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              >
                Where technology meets balance.
              </motion.p>

              <motion.button
                onClick={onEnter}
                className="glass-dark mt-8 cursor-pointer px-12 py-4 font-heading text-lg tracking-widest text-primary-foreground/90 uppercase transition-all duration-700 hover:bg-primary/20 hover:shadow-2xl"
                style={{ borderRadius: "var(--radius)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enter
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IntroExperience;
