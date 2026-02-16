import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const initialReflections = [
  "I realized I check my phone 80 times a day without thinking. Today, I'll try 40.",
  "Balance isn't about less screen time — it's about more presence.",
  "Turned off all notifications for a week. Didn't miss anything important.",
  "Technology gave me my career. Mindfulness gave me my peace.",
  "The phone isn't the problem. My relationship with it was.",
  "Started journaling instead of scrolling before bed. Sleep changed completely.",
  "Digital minimalism taught me that less input means more clarity.",
  "I don't need to be reachable 24/7. That was a story I told myself.",
];

const ReflectionArchive = () => {
  const [reflections, setReflections] = useState(initialReflections);
  const [newReflection, setNewReflection] = useState("");

  const submit = () => {
    if (!newReflection.trim()) return;
    setReflections((prev) => [newReflection.trim(), ...prev]);
    setNewReflection("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
              Reflection Archive
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Anonymous thoughts on digital balance from fellow travelers.
            </p>
          </motion.div>

          {/* Submit */}
          <div className="mx-auto mb-16 max-w-lg">
            <div className="glass p-6">
              <textarea
                value={newReflection}
                onChange={(e) => setNewReflection(e.target.value)}
                placeholder="Share your reflection..."
                className="w-full resize-none bg-transparent font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
                rows={2}
              />
              <button
                onClick={submit}
                className="mt-3 w-full rounded-lg bg-primary/10 py-2 font-heading text-sm tracking-wider text-foreground uppercase transition-all hover:bg-primary/20"
                style={{ borderRadius: "var(--radius)" }}
              >
                Share Anonymously
              </button>
            </div>
          </div>

          {/* Floating cards */}
          <div className="mx-auto max-w-4xl columns-1 gap-4 sm:columns-2 lg:columns-3">
            <AnimatePresence>
              {reflections.map((r, i) => (
                <motion.div
                  key={`${r}-${i}`}
                  className="glass mb-4 break-inside-avoid p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-accent text-sm italic leading-relaxed text-foreground/80">
                    "{r}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReflectionArchive;
