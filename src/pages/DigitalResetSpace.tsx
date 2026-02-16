import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import calmNature from "@/assets/calm-nature.jpg";

const DigitalResetSpace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0">
          <img src={calmNature} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="container relative mx-auto px-6">
          <motion.h1
            className="font-heading text-4xl font-bold text-foreground md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Digital Reset Space
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A calm environment to pause, breathe, and create space.
          </motion.p>
        </div>
      </section>

      {/* Breathing + Timer side by side */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="glass p-8" style={{ borderRadius: "var(--radius)" }}>
              <BreathingExercise />
            </div>
            <div className="glass p-8" style={{ borderRadius: "var(--radius)" }}>
              <FocusTimer />
            </div>
          </div>
        </div>
      </section>
      <ReleaseRitual />

      <Footer />
    </div>
  );
};

const BreathingExercise = () => {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/meditation-ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleBreathing = () => {
    if (!active) {
      audioRef.current?.play().catch(() => {});
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
    setActive(!active);
  };

  useEffect(() => {
    if (!active) return;
    const cycle = () => {
      setPhase("inhale");
      setTimeout(() => setPhase("hold"), 4000);
      setTimeout(() => setPhase("exhale"), 7000);
    };
    cycle();
    const interval = setInterval(cycle, 11000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-bold text-foreground">Breathe</h2>

      <div className="relative mt-8 flex h-52 w-52 items-center justify-center">
        <motion.div
          className="absolute h-full w-full rounded-full bg-primary/20"
          animate={
            active
              ? {
                  scale: phase === "inhale" ? 1.3 : phase === "hold" ? 1.3 : 0.9,
                  opacity: phase === "hold" ? 0.6 : 0.3,
                }
              : { scale: [0.95, 1.05, 0.95], opacity: [0.2, 0.35, 0.2] }
          }
          transition={
            active
              ? { duration: phase === "inhale" ? 4 : phase === "hold" ? 3 : 4, ease: "easeInOut" }
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute h-3/4 w-3/4 rounded-full bg-primary/30"
          animate={
            active
              ? {
                  scale: phase === "inhale" ? 1.2 : phase === "hold" ? 1.2 : 0.85,
                }
              : { scale: [0.9, 1.1, 0.9] }
          }
          transition={
            active
              ? { duration: phase === "inhale" ? 4 : phase === "hold" ? 3 : 4, ease: "easeInOut" }
              : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }
        />
        <span className="relative z-10 font-heading text-lg text-foreground/70">
          {active ? (phase === "inhale" ? "Breathe in..." : phase === "hold" ? "Hold..." : "Breathe out...") : "Ready"}
        </span>
      </div>

      <button
        onClick={toggleBreathing}
        className="mt-6 rounded-lg bg-primary/10 px-8 py-3 font-heading text-sm tracking-wider text-foreground uppercase transition-all duration-300 hover:bg-primary/20"
        style={{ borderRadius: "var(--radius)" }}
      >
        {active ? "Pause" : "Begin Breathing"}
      </button>
    </div>
  );
};

const FocusTimer = () => {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || timeLeft <= 0) {
      if (timeLeft === 0 && running) setRunning(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft]);

  const start = useCallback(() => {
    setTimeLeft(duration);
    setRunning(true);
  }, [duration]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-bold text-foreground">Focus Timer</h2>

      <div className="mt-6 flex gap-3">
        {[60, 180, 300].map((d) => (
          <button
            key={d}
            onClick={() => { setDuration(d); if (!running) setTimeLeft(0); }}
            className={`rounded-lg px-4 py-2 font-heading text-sm transition-all ${
              duration === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"
            }`}
            style={{ borderRadius: "var(--radius)" }}
          >
            {d / 60}m
          </button>
        ))}
      </div>

      <div className="relative mt-8 flex h-40 w-40 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(1 - timeLeft / duration) * 276.5} 276.5`}
            style={{ transition: "stroke-dasharray 1s linear" }}
          />
        </svg>
        <span className="relative font-heading text-2xl font-light text-foreground">
          {running || timeLeft > 0
            ? `${mins}:${secs.toString().padStart(2, "0")}`
            : `${duration / 60}:00`}
        </span>
      </div>

      {!running ? (
        <button
          onClick={start}
          className="mt-6 rounded-lg bg-primary px-8 py-3 font-heading text-sm tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:opacity-90"
          style={{ borderRadius: "var(--radius)" }}
        >
          Start
        </button>
      ) : (
        <button
          onClick={() => setRunning(false)}
          className="mt-6 rounded-lg bg-muted px-8 py-3 font-heading text-sm tracking-wider text-muted-foreground uppercase transition-all duration-300 hover:bg-muted/80"
          style={{ borderRadius: "var(--radius)" }}
        >
          Pause
        </button>
      )}
    </div>
  );
};

const ReleaseRitual = () => {
  const [text, setText] = useState("");
  const [released, setReleased] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; char: string }[]>([]);

  const release = () => {
    if (!text.trim()) return;
    const chars = text.split("").map((char, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      char,
    }));
    setParticles(chars);
    setText("");
    setTimeout(() => {
      setReleased(true);
      setParticles([]);
    }, 3000);
    setTimeout(() => setReleased(false), 6000);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col items-center px-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Release Ritual</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Type what you want to let go of.
        </p>

        <div className="relative mt-8 w-full max-w-md">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you want to release?"
            className="glass w-full resize-none p-6 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            rows={3}
            style={{ borderRadius: "var(--radius)" }}
          />

          {/* Particles */}
          <AnimatePresence>
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="pointer-events-none absolute text-lg text-primary"
                style={{ left: `${p.x}%` }}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -200 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: p.id * 0.03 }}
              >
                {p.char}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {!released ? (
          <button
            onClick={release}
            className="mt-6 rounded-lg bg-primary/10 px-8 py-3 font-heading text-sm tracking-wider text-foreground uppercase transition-all duration-300 hover:bg-primary/20"
            style={{ borderRadius: "var(--radius)" }}
          >
            Release
          </button>
        ) : (
          <motion.p
            className="mt-8 font-accent text-xl italic text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Space Created.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default DigitalResetSpace;
