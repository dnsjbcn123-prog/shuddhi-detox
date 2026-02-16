import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const scoreCategories = [
  { max: 20, label: "Centered", color: "hsl(141, 40%, 45%)", message: "You navigate the digital world with remarkable intentionality. Your relationship with technology reflects deep awareness." },
  { max: 40, label: "Intentional", color: "hsl(141, 25%, 50%)", message: "You show strong signs of conscious digital habits. Small refinements can deepen your sense of balance." },
  { max: 60, label: "Balanced", color: "hsl(34, 46%, 64%)", message: "You maintain a healthy equilibrium. There's room to cultivate deeper awareness in how you engage with your devices." },
  { max: 80, label: "Stimulated", color: "hsl(34, 60%, 55%)", message: "Your digital environment may be creating more noise than signal. Consider creating intentional boundaries." },
  { max: 100, label: "Reactive", color: "hsl(0, 50%, 55%)", message: "Your current digital pattern suggests constant reaction. This is not judgment — it's awareness. The first step toward balance." },
];

const getCategory = (score: number) => {
  return scoreCategories.find((c) => score <= c.max) || scoreCategories[4];
};

const DigitalBalanceLab = () => {
  const [screenTime, setScreenTime] = useState(4);
  const [platforms, setPlatforms] = useState(3);
  const [notifications, setNotifications] = useState(50);
  const [score, setScore] = useState<number | null>(null);

  const calculateScore = () => {
    const timeScore = Math.min((screenTime / 12) * 40, 40);
    const platScore = Math.min((platforms / 8) * 30, 30);
    const notifScore = Math.min((notifications / 200) * 30, 30);
    setScore(Math.round(timeScore + platScore + notifScore));
  };

  const category = score !== null ? getCategory(score) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
              Digital Balance Lab
            </h1>
            <p className="mt-6 font-body text-lg text-muted-foreground">
              Tools to understand, measure, and transform your relationship with technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Digital Footprint Calculator */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl">
            <motion.div
              className="glass p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Measure Your Digital Frequency
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                No judgment. Just awareness.
              </p>

              <div className="mt-10 space-y-8">
                <div>
                  <label className="mb-3 flex items-center justify-between font-body text-sm text-foreground">
                    <span>Daily screen time</span>
                    <span className="font-heading font-bold text-primary">{screenTime}h</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={16}
                    step={0.5}
                    value={screenTime}
                    onChange={(e) => setScreenTime(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 flex items-center justify-between font-body text-sm text-foreground">
                    <span>Social platforms used</span>
                    <span className="font-heading font-bold text-primary">{platforms}</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={platforms}
                    onChange={(e) => setPlatforms(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 flex items-center justify-between font-body text-sm text-foreground">
                    <span>Notifications per day</span>
                    <span className="font-heading font-bold text-primary">{notifications}</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={300}
                    step={5}
                    value={notifications}
                    onChange={(e) => setNotifications(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <button
                onClick={calculateScore}
                className="mt-10 w-full rounded-lg bg-primary px-8 py-4 font-heading text-sm tracking-widest text-primary-foreground uppercase transition-all duration-300 hover:opacity-90"
                style={{ borderRadius: "var(--radius)" }}
              >
                Reveal My Harmony Score
              </button>
            </motion.div>

            {/* Score Result */}
            <AnimatePresence>
              {score !== null && category && (
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="glass p-10 md:p-14">
                    {/* Circular meter */}
                    <div className="relative mx-auto mb-8 h-48 w-48">
                      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="hsl(var(--muted))"
                          strokeWidth="6"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke={category.color}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${(score / 100) * 264} 264`}
                          initial={{ strokeDasharray: "0 264" }}
                          animate={{ strokeDasharray: `${(score / 100) * 264} 264` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-heading text-3xl font-bold" style={{ color: category.color }}>
                          {score}
                        </span>
                        <span className="text-xs text-muted-foreground">/ 100</span>
                      </div>
                    </div>

                    <h3
                      className="font-heading text-2xl font-bold"
                      style={{ color: category.color }}
                    >
                      {category.label}
                    </h3>
                    <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
                      {category.message}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Notification Storm Simulator */}
      <NotificationStorm />

      <Footer />
    </div>
  );
};

const NotificationStorm = () => {
  const [simulating, setSimulating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  const notifTexts = [
    "📱 New message from...", "🔔 You have 12 new...", "📧 Email: Don't miss...",
    "🎯 Your turn to...", "💬 Reply now!", "📢 Breaking news...",
    "🛒 Sale ending in...", "👍 Someone liked your...", "📸 New photo tagged...",
    "⚡ Trending now...", "🎮 Your friends are...", "📊 Weekly report...",
    "🔴 Live now!", "💳 Payment received", "📅 Reminder: Meeting in...",
  ];

  const startStorm = () => {
    setSimulating(true);
    setShowMessage(false);
    setNotifications([]);

    let count = 0;
    const interval = setInterval(() => {
      if (count >= 30) {
        clearInterval(interval);
        setTimeout(() => {
          setSimulating(false);
          setShowMessage(true);
        }, 500);
        return;
      }
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          text: notifTexts[Math.floor(Math.random() * notifTexts.length)],
          x: Math.random() * 80 + 5,
          y: Math.random() * 70 + 10,
        },
      ]);
      count++;
    }, 300);
  };

  const restoreBalance = () => {
    setNotifications([]);
    setShowMessage(false);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="glass relative mx-auto max-w-3xl overflow-hidden p-8 md:p-12"
          style={{ minHeight: "400px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Experience the Overload
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            What does your digital environment feel like?
          </p>

          {!simulating && !showMessage && (
            <button
              onClick={startStorm}
              className="mt-8 rounded-lg bg-secondary px-8 py-3 font-heading text-sm tracking-wider text-secondary-foreground uppercase transition-all duration-300 hover:opacity-90"
              style={{ borderRadius: "var(--radius)" }}
            >
              Simulate 10 Seconds
            </button>
          )}

          {/* Floating notifications */}
          <AnimatePresence>
            {notifications.map((n) => (
              <motion.div
                key={n.id}
                className="glass absolute px-4 py-2 text-xs text-foreground shadow-lg"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  borderRadius: "12px",
                  zIndex: 10,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, y: -30 }}
                transition={{ duration: 0.3 }}
              >
                {n.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* After storm message */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                className="relative z-20 mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p className="font-accent text-xl italic text-foreground">
                  "This is your digital environment."
                </p>
                <button
                  onClick={restoreBalance}
                  className="mt-6 rounded-lg bg-primary px-8 py-3 font-heading text-sm tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:opacity-90"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  Restore Balance
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalBalanceLab;
