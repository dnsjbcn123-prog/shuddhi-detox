import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const habits = [
  "No phone during meals",
  "1 hour screen-free before bed",
  "No social media before noon",
  "Weekly tech-free nature walk",
  "Read a physical book daily",
  "Turn off non-essential notifications",
];

const CommitToPledge = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [committed, setCommitted] = useState(false);

  const toggle = (habit: string) => {
    setSelected((prev) =>
      prev.includes(habit) ? prev.filter((h) => h !== habit) : [...prev, habit]
    );
  };

  return (
    <section className="relative bg-primary py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-heading text-xs tracking-[0.3em] text-secondary uppercase">
            Take the Pledge
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-secondary md:text-5xl">
            Commit to Change
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-secondary/70">
            Select the habits you're willing to adopt. Small commitments lead to lasting transformation.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!committed ? (
            <motion.div
              key="selection"
              className="mx-auto mt-12 max-w-2xl text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-wrap justify-center gap-3">
                {habits.map((habit) => (
                  <motion.button
                    key={habit}
                    onClick={() => toggle(habit)}
                    className={`rounded-full border px-5 py-2.5 font-body text-sm transition-all duration-300 ${
                      selected.includes(habit)
                        ? "border-secondary bg-secondary text-secondary-foreground"
                        : "border-secondary/30 bg-secondary/10 text-secondary/80 hover:border-secondary/50"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {selected.includes(habit) && "✓ "}{habit}
                  </motion.button>
                ))}
              </div>

              {selected.length > 0 && (
                <motion.button
                  className="mt-10 rounded-full bg-secondary px-8 py-3 font-heading text-sm font-medium tracking-wider text-secondary-foreground uppercase transition-all duration-300 hover:opacity-90"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setCommitted(true)}
                  whileHover={{ scale: 1.02 }}
                >
                  I'm Committing to {selected.length} Habit{selected.length > 1 ? "s" : ""}
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="committed"
              className="mx-auto mt-16 max-w-md text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">🌱</div>
              <h3 className="font-heading text-2xl font-bold text-secondary">
                Your journey begins now.
              </h3>
              <p className="mt-4 font-body text-secondary/70">
                {selected.length} commitment{selected.length > 1 ? "s" : ""} toward intentional living.
                Every small step reshapes your relationship with technology.
              </p>
              <button
                onClick={() => { setCommitted(false); setSelected([]); }}
                className="mt-8 text-sm text-secondary/50 underline hover:text-secondary/80"
              >
                Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CommitToPledge;
