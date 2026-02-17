import { useState, useEffect, useCallback, useRef } from "react";
import { Mic, MicOff, Zap, ScrollText, Grid3X3, Timer, Wind, Feather, Sparkles, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import calmNature from "@/assets/calm-nature.jpg";
import { WaveDivider, FloatingOrbs, FloatingLeaves, DotPattern } from "@/components/LabBackgroundElements";

const scoreCategories = [
{ max: 20, label: "Centered", color: "hsl(141, 40%, 45%)", message: "You navigate the digital world with remarkable intentionality. Your relationship with technology reflects deep awareness." },
{ max: 40, label: "Intentional", color: "hsl(141, 25%, 50%)", message: "You show strong signs of conscious digital habits. Small refinements can deepen your sense of balance." },
{ max: 60, label: "Balanced", color: "hsl(34, 46%, 64%)", message: "You maintain a healthy equilibrium. There's room to cultivate deeper awareness in how you engage with your devices." },
{ max: 80, label: "Stimulated", color: "hsl(34, 60%, 55%)", message: "Your digital environment may be creating more noise than signal. Consider creating intentional boundaries." },
{ max: 100, label: "Reactive", color: "hsl(0, 50%, 55%)", message: "Your current digital pattern suggests constant reaction. This is not judgment — it's awareness. The first step toward balance." }];


const getCategory = (score: number) => {
  return scoreCategories.find((c) => score <= c.max) || scoreCategories[4];
};

const DigitalBalanceLab = () => {
  const [screenTime, setScreenTime] = useState(4);
  const [platforms, setPlatforms] = useState(3);
  const [notifications, setNotifications] = useState(50);
  const [score, setScore] = useState<number | null>(null);

  const calculateScore = () => {
    const timeScore = Math.min(screenTime / 12 * 40, 40);
    const platScore = Math.min(platforms / 8 * 30, 30);
    const notifScore = Math.min(notifications / 200 * 30, 30);
    setScore(Math.round(timeScore + platScore + notifScore));
  };

  const category = score !== null ? getCategory(score) : null;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Global ambient elements */}
      <FloatingLeaves count={6} />
      <Navigation />

      {/* Hero with image */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0">
          <img src={calmNature} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="container relative mx-auto px-6">
          <motion.h1
            className="font-heading text-4xl font-bold text-foreground text-center md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>

            Digital Balance Lab
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-lg text-muted-foreground text-center my-[14px] px-0 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}>

Tools, games, and experiences to understand and transform your relationship with technology.
          </motion.p>
        </div>
      </section>
      <WaveDivider />

      {/* Digital Footprint Calculator */}
      <section className="py-20 relative">
        <FloatingOrbs count={4} />
        <DotPattern />
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl">
            <motion.div
              className="glass p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}>

              <h2 className="font-heading text-2xl font-bold text-foreground">
                Measure Your Digital Frequency
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">No judgment. Just awareness.</p>

              <div className="mt-10 space-y-8">
                <div>
                  <label className="mb-3 flex items-center justify-between font-body text-sm text-foreground">
                    <span>Daily screen time</span>
                    <span className="font-heading font-bold text-primary">{screenTime}h</span>
                  </label>
                  <input type="range" min={0} max={16} step={0.5} value={screenTime} onChange={(e) => setScreenTime(Number(e.target.value))} className="w-full accent-primary" />
                </div>
                <div>
                  <label className="mb-3 flex items-center justify-between font-body text-sm text-foreground">
                    <span>Social platforms used</span>
                    <span className="font-heading font-bold text-primary">{platforms}</span>
                  </label>
                  <input type="range" min={0} max={10} value={platforms} onChange={(e) => setPlatforms(Number(e.target.value))} className="w-full accent-primary" />
                </div>
                <div>
                  <label className="mb-3 flex items-center justify-between font-body text-sm text-foreground">
                    <span>Notifications per day</span>
                    <span className="font-heading font-bold text-primary">{notifications}</span>
                  </label>
                  <input type="range" min={0} max={300} step={5} value={notifications} onChange={(e) => setNotifications(Number(e.target.value))} className="w-full accent-primary" />
                </div>
              </div>

              <button
                onClick={calculateScore}
                className="mt-10 w-full rounded-lg bg-primary px-8 py-4 font-heading text-sm tracking-widest text-primary-foreground uppercase transition-all duration-300 hover:opacity-90"
                style={{ borderRadius: "var(--radius)" }}>

                Reveal My Harmony Score
              </button>
            </motion.div>

            <AnimatePresence>
              {score !== null && category &&
              <motion.div className="mt-8 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                  <div className="glass p-10 md:p-14">
                    <div className="relative mx-auto mb-8 h-48 w-48">
                      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                        <motion.circle cx="50" cy="50" r="42" fill="none" stroke={category.color} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${score / 100 * 264} 264`} initial={{ strokeDasharray: "0 264" }} animate={{ strokeDasharray: `${score / 100 * 264} 264` }} transition={{ duration: 1.5, ease: "easeOut" }} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-heading text-3xl font-bold" style={{ color: category.color }}>{score}</span>
                        <span className="text-xs text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                    <h3 className="font-heading text-2xl font-bold" style={{ color: category.color }}>{category.label}</h3>
                    <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-muted-foreground">{category.message}</p>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>
      </section>

      <WaveDivider flip />

      {/* Notification Storm */}
      <NotificationStorm />

      <WaveDivider />

      {/* Mindful Scrolling Challenge */}
      <MindfulScrollChallenge />

      <WaveDivider flip />

      {/* Digital Detox Bingo */}
      <DetoxBingo />

      <WaveDivider />

      {/* Breathing + Timer */}
      <section className="py-20 relative">
        <FloatingOrbs count={3} />
        <div className="container mx-auto px-6">
          <motion.h2
            className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            Reset & Restore
          </motion.h2>
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

      {/* Reaction Time Test */}
      <ReactionTimeTest />

      {/* Release Ritual */}
      <ReleaseRitual />

      <Footer />
    </div>);

};

/* ─── Sub-components ─── */

const NotificationStorm = () => {
  const [simulating, setSimulating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [notifications, setNotifications] = useState<{id: number;text: string;x: number;y: number;}[]>([]);

  const notifTexts = [
  "📱 New message from...", "🔔 You have 12 new...", "📧 Email: Don't miss...",
  "🎯 Your turn to...", "💬 Reply now!", "📢 Breaking news...",
  "🛒 Sale ending in...", "👍 Someone liked your...", "📸 New photo tagged...",
  "⚡ Trending now...", "🎮 Your friends are...", "📊 Weekly report...",
  "🔴 Live now!", "💳 Payment received", "📅 Reminder: Meeting in..."];


  const startStorm = () => {
    setSimulating(true);
    setShowMessage(false);
    setNotifications([]);
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 30) {
        clearInterval(interval);
        setTimeout(() => {setSimulating(false);setShowMessage(true);}, 500);
        return;
      }
      setNotifications((prev) => [...prev, { id: Date.now() + Math.random(), text: notifTexts[Math.floor(Math.random() * notifTexts.length)], x: Math.random() * 80 + 5, y: Math.random() * 70 + 10 }]);
      count++;
    }, 300);
  };

  return (
    <section className="py-20 relative">
      <FloatingOrbs count={3} />
      <div className="container mx-auto px-6">
        <motion.div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/20 shadow-2xl" style={{ minHeight: "450px", background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted) / 0.5) 100%)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {/* Decorative top gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-destructive/60 via-warm to-primary/60" />
          <div className="p-8 md:p-12">
            <div className="flex items-start gap-4">
              <motion.div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-destructive/10"
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Bell className="h-7 w-7 text-destructive/70" />
              </motion.div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Experience the Overload</h2>
                <p className="mt-1 text-sm text-muted-foreground">Feel what 30 notifications in 10 seconds does to your brain. Spoiler: it's chaotic.</p>
              </div>
            </div>
            {!simulating && !showMessage && (
              <motion.button
                onClick={startStorm}
                className="mt-8 flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 font-heading text-sm tracking-wider text-secondary-foreground uppercase shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Zap className="h-4 w-4" />
                Unleash the Storm
              </motion.button>
            )}
          <AnimatePresence>
            {notifications.map((n) =>
            <motion.div key={n.id} className="glass absolute px-4 py-2 text-xs text-foreground shadow-lg" style={{ left: `${n.x}%`, top: `${n.y}%`, borderRadius: "12px", zIndex: 10 }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0, y: -30 }} transition={{ duration: 0.3 }}>{n.text}</motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showMessage &&
            <motion.div className="relative z-20 mt-8 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <p className="font-accent text-2xl italic text-foreground">"This is your digital environment."</p>
                <p className="mt-2 text-sm text-muted-foreground">Now imagine this, all day, every day.</p>
                <motion.button onClick={() => {setNotifications([]);setShowMessage(false);}} className="mt-6 flex items-center gap-2 mx-auto rounded-xl bg-primary px-8 py-4 font-heading text-sm tracking-wider text-primary-foreground uppercase shadow-lg transition-all duration-300 hover:shadow-xl" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Wind className="h-4 w-4" />
                  Restore Balance
                </motion.button>
              </motion.div>
            }
          </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>);

};

const BreathingExercise = () => {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/meditation-ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {audioRef.current?.pause();audioRef.current = null;};
  }, []);

  const toggleBreathing = () => {
    if (!active) {audioRef.current?.play().catch(() => {});} else {if (audioRef.current) {audioRef.current.pause();audioRef.current.currentTime = 0;}}
    setActive(!active);
  };

  useEffect(() => {
    if (!active) return;
    const cycle = () => {setPhase("inhale");setTimeout(() => setPhase("hold"), 4000);setTimeout(() => setPhase("exhale"), 7000);};
    cycle();
    const interval = setInterval(cycle, 11000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-bold text-foreground">Breathe</h2>
      <div className="relative mt-8 flex h-52 w-52 items-center justify-center">
        <motion.div className="absolute h-full w-full rounded-full bg-primary/20" animate={active ? { scale: phase === "inhale" ? 1.3 : phase === "hold" ? 1.3 : 0.9, opacity: phase === "hold" ? 0.6 : 0.3 } : { scale: [0.95, 1.05, 0.95], opacity: [0.2, 0.35, 0.2] }} transition={active ? { duration: phase === "inhale" ? 4 : phase === "hold" ? 3 : 4, ease: "easeInOut" } : { duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute h-3/4 w-3/4 rounded-full bg-primary/30" animate={active ? { scale: phase === "inhale" ? 1.2 : phase === "hold" ? 1.2 : 0.85 } : { scale: [0.9, 1.1, 0.9] }} transition={active ? { duration: phase === "inhale" ? 4 : phase === "hold" ? 3 : 4, ease: "easeInOut" } : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
        <span className="relative z-10 font-heading text-lg text-foreground/70">{active ? phase === "inhale" ? "Breathe in..." : phase === "hold" ? "Hold..." : "Breathe out..." : "Ready"}</span>
      </div>
      <button onClick={toggleBreathing} className="mt-6 rounded-lg bg-primary/10 px-8 py-3 font-heading text-sm tracking-wider text-foreground uppercase transition-all duration-300 hover:bg-primary/20" style={{ borderRadius: "var(--radius)" }}>{active ? "Pause" : "Begin Breathing"}</button>
    </div>);

};

const FocusTimer = () => {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || timeLeft <= 0) {if (timeLeft === 0 && running) setRunning(false);return;}
    const t = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft]);

  const start = useCallback(() => {setTimeLeft(duration);setRunning(true);}, [duration]);
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-bold text-foreground">Focus Timer</h2>
      <div className="mt-6 flex gap-3">
        {[60, 180, 300].map((d) =>
        <button key={d} onClick={() => {setDuration(d);if (!running) setTimeLeft(0);}} className={`rounded-lg px-4 py-2 font-heading text-sm transition-all ${duration === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`} style={{ borderRadius: "var(--radius)" }}>{d / 60}m</button>
        )}
      </div>
      <div className="relative mt-8 flex h-40 w-40 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${(1 - timeLeft / duration) * 276.5} 276.5`} style={{ transition: "stroke-dasharray 1s linear" }} />
        </svg>
        <span className="relative font-heading text-2xl font-light text-foreground">{running || timeLeft > 0 ? `${mins}:${secs.toString().padStart(2, "0")}` : `${duration / 60}:00`}</span>
      </div>
      {!running ?
      <button onClick={start} className="mt-6 rounded-lg bg-primary px-8 py-3 font-heading text-sm tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:opacity-90" style={{ borderRadius: "var(--radius)" }}>Start</button> :

      <button onClick={() => setRunning(false)} className="mt-6 rounded-lg bg-muted px-8 py-3 font-heading text-sm tracking-wider text-muted-foreground uppercase transition-all duration-300 hover:bg-muted/80" style={{ borderRadius: "var(--radius)" }}>Pause</button>
      }
    </div>);

};

const ReleaseRitual = () => {
  const [text, setText] = useState("");
  const [released, setReleased] = useState(false);
  const [particles, setParticles] = useState<{id: number;x: number;char: string;}[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const toggleVoice = async () => {
    if (isListening) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        setIsTranscribing(true);

        try {
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");

          const res = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-transcribe`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              },
              body: formData,
            }
          );

          if (!res.ok) throw new Error("Transcription failed");
          const data = await res.json();
          if (data.text) {
            setText((prev) => (prev ? prev + " " + data.text : data.text));
          }
        } catch (err) {
          console.error("Transcription error:", err);
          alert("Transcription failed. Please try again.");
        } finally {
          setIsTranscribing(false);
        }
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch {
      alert("Microphone access is required for voice typing.");
    }
  };

  const release = () => {
    if (!text.trim()) return;
    if (isListening) {
      mediaRecorderRef.current?.stop();
      setIsListening(false);
    }
    const chars = text.split("").map((char, i) => ({ id: i, x: 30 + Math.random() * 40, char }));
    setParticles(chars);
    setText("");
    setTimeout(() => {setReleased(true);setParticles([]);}, 3000);
    setTimeout(() => setReleased(false), 6000);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col items-center px-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Release Ritual</h2>
        <p className="mt-2 text-sm text-muted-foreground">Type or speak what you want to let go of.</p>
        <div className="relative mt-8 w-full max-w-md">
          <div className="relative">
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What do you want to release?" className="glass w-full resize-none p-6 pr-14 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30" rows={3} style={{ borderRadius: "var(--radius)" }} />
            <button
              onClick={toggleVoice}
              disabled={isTranscribing}
              className={`absolute right-3 top-3 rounded-full p-2 transition-all duration-300 ${isListening ? "bg-red-500/20 text-red-500 animate-pulse" : isTranscribing ? "bg-muted/30 text-muted-foreground cursor-wait" : "bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              title={isListening ? "Stop recording" : isTranscribing ? "Transcribing..." : "Start voice typing"}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          </div>
          {isListening && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-center text-xs text-primary animate-pulse">
              🎙️ Recording... click mic to stop & transcribe
            </motion.p>
          )}
          {isTranscribing && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-center text-xs text-muted-foreground animate-pulse">
              ✨ Transcribing your voice...
            </motion.p>
          )}
          <AnimatePresence>
            {particles.map((p) =>
            <motion.span key={p.id} className="pointer-events-none absolute text-lg text-primary" style={{ left: `${p.x}%` }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -200 }} exit={{ opacity: 0 }} transition={{ duration: 2.5, ease: "easeOut", delay: p.id * 0.03 }}>{p.char}</motion.span>
            )}
          </AnimatePresence>
        </div>
        {!released ?
        <button onClick={release} className="mt-6 rounded-lg bg-primary/10 px-8 py-3 font-heading text-sm tracking-wider text-foreground uppercase transition-all duration-300 hover:bg-primary/20" style={{ borderRadius: "var(--radius)" }}>Release</button> :

        <motion.p className="mt-8 font-accent text-xl italic text-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>Space Created.</motion.p>
        }
      </div>
    </section>);

};

/* ─── NEW: Mindful Scrolling Challenge ─── */
const MindfulScrollChallenge = () => {
  const [started, setStarted] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started || finished) return;
    const timer = setInterval(() => setTimeElapsed((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, [started, finished]);

  useEffect(() => {
    if (!started || finished) return;
    const handler = () => setScrollCount((p) => p + 1);
    const el = containerRef.current;
    el?.addEventListener("scroll", handler);
    return () => el?.removeEventListener("scroll", handler);
  }, [started, finished]);

  const messages = [
  "Notice how your thumb moves automatically.",
  "Are you reading this, or just scrolling past?",
  "What are you looking for?",
  "How does this feel in your body?",
  "Take one deep breath before continuing.",
  "You've been scrolling. That's okay. Just notice it.",
  "What if you stopped right here?",
  "This content will never end. But your attention will.",
  "You could close this and look out a window.",
  "Still here? You're proving the point.",
  "The scroll is a reflex. Can you pause it?",
  "Three more... then a truth.",
  "Two more...",
  "One more...",
  "You just scrolled through nothing meaningful — and your brain barely noticed."];


  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
          style={{ background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--accent) / 0.15) 100%)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          <div className="h-1.5 w-full bg-gradient-to-r from-accent/80 via-primary/60 to-accent/80" />
          <div className="p-8">
            <div className="flex items-start gap-4">
              <motion.div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/20"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ScrollText className="h-7 w-7 text-accent-foreground/70" />
              </motion.div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">The Scroll Trap</h2>
                <p className="mt-1 text-sm text-muted-foreground">Think you can stop scrolling when you want? This experiment might surprise you.</p>
              </div>
            </div>
          </div>

          {!started && !finished &&
          <div className="px-8 pb-8">
              <motion.button onClick={() => setStarted(true)} className="flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 font-heading text-sm tracking-wider text-secondary-foreground uppercase shadow-lg transition-all duration-300 hover:shadow-xl" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Sparkles className="h-4 w-4" />
                Fall Into the Trap
              </motion.button>
            </div>
          }

          {started && !finished &&
          <div ref={containerRef} className="h-72 overflow-y-auto px-8 pb-8" style={{ scrollBehavior: "smooth" }}>
              <div className="space-y-32 pb-20">
                {messages.map((msg, i) =>
              <motion.p
                key={i}
                className="font-body text-base text-foreground/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                onViewportEnter={() => {if (i === messages.length - 1) setFinished(true);}}>

                    {msg}
                  </motion.p>
              )}
              </div>
            </div>
          }

          {finished &&
          <motion.div className="px-8 pb-8 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-heading text-accent-foreground mb-4">
                <Zap className="h-3 w-3" /> Trap Completed
              </div>
              <p className="font-accent text-2xl italic text-foreground">
                You scrolled {scrollCount} times in {timeElapsed}s
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Imagine this for hours, every day. That's the scroll trap.
              </p>
              <motion.button onClick={() => {setStarted(false);setFinished(false);setScrollCount(0);setTimeElapsed(0);}} className="mt-6 rounded-xl bg-primary/10 px-8 py-3 font-heading text-sm tracking-wider text-foreground uppercase transition-all hover:bg-primary/20" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                Try Again
              </motion.button>
            </motion.div>
          }
        </motion.div>
      </div>
    </section>);

};

/* ─── NEW: Digital Detox Bingo ─── */
const DetoxBingo = () => {
  const activities = [
  "Read for 30 min", "No phone at meals", "Walk without earbuds",
  "1 hour no notifications", "Call a friend instead of texting", "No screens before bed",
  "Meditate 10 min", "Journal your thoughts", "Cook without a recipe video",
  "Watch a sunset", "Have a face-to-face conversation", "Go screen-free for 2 hours",
  "Draw or doodle something", "Listen to nature sounds", "Organize a physical space",
  "Do 20 min of exercise", "Write a letter by hand", "Take photos with intention",
  "Practice deep breathing", "Eat mindfully without distractions", "Spend time with a pet or plant",
  "Play a board game", "Do a digital cleanup", "Read a physical newspaper",
  "Stretch for 15 minutes"];


  const [checked, setChecked] = useState<boolean[]>(new Array(25).fill(false));

  const toggle = (i: number) => {
    setChecked((prev) => {const n = [...prev];n[i] = !n[i];return n;});
  };

  const completedCount = checked.filter(Boolean).length;

  return (
    <section className="py-20 relative">
      <FloatingOrbs count={3} />
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          <div className="rounded-2xl border border-white/20 p-8 shadow-2xl" style={{ background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--warm) / 0.2) 100%)" }}>
            <div className="flex items-start gap-4 mb-6">
              <motion.div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-warm/30"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Grid3X3 className="h-7 w-7 text-warm-foreground/70" />
              </motion.div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Digital Detox Bingo</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete real-world activities to reclaim your time. <span className="font-heading font-bold text-primary">{completedCount}/25</span> done!
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-warm"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / 25) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

          <div className="mt-8 grid grid-cols-5 gap-2">
            {activities.map((activity, i) =>
            <motion.button
              key={i}
              onClick={() => toggle(i)}
              className={`aspect-square flex items-center justify-center rounded-lg p-1 text-center font-body text-[10px] leading-tight transition-all duration-300 md:text-xs ${
              checked[i] ?
              "bg-primary text-primary-foreground shadow-lg" :
              "bg-muted text-muted-foreground hover:bg-primary/10"}`
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>

                {checked[i] ? "✓" : activity}
              </motion.button>
            )}
          </div>

          {completedCount >= 5 &&
          <motion.p
            className="mt-6 font-accent text-lg italic text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>

              {completedCount >= 25 ? "🏆 Full board! You're a digital balance master!" :
            completedCount >= 15 ? "🌟 Amazing progress! Keep going!" :
            completedCount >= 10 ? "💪 Great momentum! You're building real habits." :
            "🌱 Beautiful start! Every small step matters."}
            </motion.p>
          }
          </div>
        </motion.div>
      </div>
    </section>);

};

/* ─── NEW: Reaction Time Test ─── */
const ReactionTimeTest = () => {
  const [state, setState] = useState<"idle" | "waiting" | "ready" | "done">("idle");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    setState("waiting");
    const delay = 2000 + Math.random() * 4000;
    timeoutRef.current = setTimeout(() => {
      setState("ready");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (state === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState("idle");
      return;
    }
    if (state === "ready") {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setAttempts((prev) => [...prev, time]);
      setState("done");
    }
  };

  const avg = attempts.length > 0 ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length) : 0;

  const getMessage = (ms: number) => {
    if (ms < 250) return "Lightning fast! But is speed always the answer? 🤔";
    if (ms < 350) return "Quick reflexes! Your brain is wired for instant response.";
    if (ms < 500) return "Normal range. Your brain takes time — and that's okay.";
    return "Slow and mindful. Sometimes the best response is a delayed one. 🧘";
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/20 shadow-2xl text-center"
          style={{ background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--primary) / 0.1) 100%)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          <div className="h-1.5 w-full bg-gradient-to-r from-primary/60 via-accent/60 to-primary/60" />
          <div className="p-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="h-6 w-6 text-primary" />
              </motion.div>
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Reaction Time Test</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              How fast does your brain react? Does constant stimulation make us faster — or just more reactive?
            </p>
          </div>

          <div
            onClick={state === "waiting" || state === "ready" ? handleClick : undefined}
            className={`flex h-48 cursor-pointer items-center justify-center transition-colors duration-300 ${
            state === "waiting" ? "bg-destructive/20" :
            state === "ready" ? "bg-primary/30" :
            "bg-muted/50"}`
            }>

            {state === "idle" &&
            <button onClick={start} className="rounded-lg bg-primary px-8 py-3 font-heading text-sm tracking-wider text-primary-foreground uppercase" style={{ borderRadius: "var(--radius)" }}>
                Start Test
              </button>
            }
            {state === "waiting" &&
            <p className="font-heading text-xl text-foreground/60">Wait for green...</p>
            }
            {state === "ready" &&
            <motion.p
              className="font-heading text-2xl font-bold text-primary"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}>

                CLICK NOW!
              </motion.p>
            }
            {state === "done" &&
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="font-heading text-4xl font-bold text-primary">{reactionTime}ms</p>
                <p className="mt-2 text-sm text-muted-foreground">{getMessage(reactionTime)}</p>
                {attempts.length > 1 &&
              <p className="mt-1 text-xs text-muted-foreground/60">Average: {avg}ms over {attempts.length} attempts</p>
              }
                <button onClick={() => {setState("idle");}} className="mt-4 rounded-lg bg-primary/10 px-6 py-2 font-heading text-xs tracking-wider text-foreground uppercase" style={{ borderRadius: "var(--radius)" }}>
                  Try Again
                </button>
              </motion.div>
            }
          </div>
        </motion.div>
      </div>
    </section>);

};

export default DigitalBalanceLab;