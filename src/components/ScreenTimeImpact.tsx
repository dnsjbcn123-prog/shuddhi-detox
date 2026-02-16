import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, BookOpen, Footprints, UtensilsCrossed } from "lucide-react";

const ScreenTimeImpact = () => {
  const [hours, setHours] = useState(8);
  const [calculated, setCalculated] = useState(false);

  const hoursPerYear = hours * 365;
  const fullDays = Math.round(hoursPerYear / 24);
  const weeks = (hoursPerYear / (24 * 7)).toFixed(1);
  const booksCouldRead = Math.round(hoursPerYear / 8);
  const milesCouldWalk = Math.round(hoursPerYear * 3);
  const mealsCouldCook = Math.round(hoursPerYear);

  return (
    <section className="relative bg-secondary py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-heading text-xs tracking-[0.3em] text-primary uppercase">
            Interactive Tool
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-secondary-foreground md:text-5xl">
            Your Screen Time Impact
          </h2>
          <p className="mt-4 font-body text-secondary-foreground/60">
            See what your daily screen habits really add up to over a year.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="rounded-2xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg bg-secondary-foreground/10 p-2">
                <Clock className="h-4 w-4 text-secondary-foreground/60" />
              </div>
              <span className="font-body text-sm text-secondary-foreground/80">
                Daily non-work screen time
              </span>
            </div>

            <div className="flex items-end justify-between mb-6">
              <span className="font-accent text-6xl italic text-primary">{hours}</span>
              <span className="font-body text-sm text-secondary-foreground/50">hours / day</span>
            </div>

            <input
              type="range"
              min={1}
              max={14}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-primary mb-2"
            />
            <div className="flex justify-between text-xs text-secondary-foreground/40 font-body">
              <span>1h</span>
              <span>7h</span>
              <span>14h</span>
            </div>

            <button
              onClick={() => setCalculated(true)}
              className="mt-8 w-full rounded-2xl bg-primary py-4 font-heading text-sm font-medium tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:opacity-90"
            >
              Calculate My Impact
            </button>
          </div>

          {calculated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mt-6 border-t border-secondary-foreground/10 pt-6" />

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Clock, value: hoursPerYear.toLocaleString(), label: "hours / year" },
                  { icon: Calendar, value: fullDays, label: "full days" },
                  { icon: Calendar, value: weeks, label: "weeks" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="rounded-2xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-5 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <stat.icon className="mx-auto mb-3 h-5 w-5 text-secondary-foreground/40" />
                    <p className="font-heading text-2xl font-bold text-secondary-foreground">{stat.value}</p>
                    <p className="mt-1 text-xs text-secondary-foreground/50">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <p className="mb-4 text-sm text-secondary-foreground/50">Instead, you could have:</p>

              {[
                { icon: BookOpen, label: "Books you could read", value: booksCouldRead, unit: "books" },
                { icon: Footprints, label: "Miles you could walk", value: milesCouldWalk.toLocaleString(), unit: "miles" },
                { icon: UtensilsCrossed, label: "Meals you could cook", value: mealsCouldCook.toLocaleString(), unit: "meals" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="mb-3 flex items-center justify-between rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 px-6 py-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-secondary-foreground/40" />
                    <span className="font-body text-sm text-secondary-foreground/80">{item.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-lg font-bold text-primary">{item.value}</span>
                    <span className="text-xs text-secondary-foreground/40">{item.unit}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ScreenTimeImpact;
