import { motion } from "framer-motion";
import { Smartphone, Mountain, AlertCircle, Smile } from "lucide-react";

const withScreens = [
  { time: "7:00 AM", action: "Check phone immediately", mood: "Anxious", moodColor: "text-destructive/70" },
  { time: "8:00 AM", action: "Scroll social media over breakfast", mood: "Distracted", moodColor: "text-destructive/60" },
  { time: "12:00 PM", action: "Eat lunch watching videos", mood: "Numb", moodColor: "text-destructive/50" },
  { time: "3:00 PM", action: "Constant notification checking", mood: "Overwhelmed", moodColor: "text-destructive/60" },
  { time: "6:00 PM", action: "Doom-scroll after work", mood: "Drained", moodColor: "text-destructive/70" },
  { time: "11:00 PM", action: "Fall asleep to blue light", mood: "Restless", moodColor: "text-destructive/60" },
];

const withoutScreens = [
  { time: "7:00 AM", action: "Stretch and meditate", mood: "Centered", moodColor: "text-primary" },
  { time: "8:00 AM", action: "Mindful breakfast with family", mood: "Present", moodColor: "text-primary" },
  { time: "12:00 PM", action: "Walk outside during lunch", mood: "Refreshed", moodColor: "text-primary" },
  { time: "3:00 PM", action: "Deep work, no interruptions", mood: "Focused", moodColor: "text-primary" },
  { time: "6:00 PM", action: "Cook dinner, read a book", mood: "Fulfilled", moodColor: "text-primary" },
  { time: "11:00 PM", action: "Journal and restful sleep", mood: "Peaceful", moodColor: "text-primary" },
];

const DayComparison = () => {
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
          <span className="font-heading text-xs tracking-[0.3em] text-primary/60 uppercase">
            Side by Side
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-secondary-foreground md:text-5xl">
            A Day With vs. Without Screens
          </h2>
          <p className="mt-4 font-body text-secondary-foreground/60">
            Same 24 hours, radically different experiences.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* With Screens */}
          <motion.div
            className="rounded-2xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Smartphone className="h-5 w-5 text-secondary-foreground/60" />
              <h3 className="font-heading text-lg font-bold text-secondary-foreground">With Screens</h3>
            </div>
            <div className="space-y-1">
              {withScreens.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-secondary-foreground/5"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div>
                    <p className="font-body text-sm text-secondary-foreground/90">{item.action}</p>
                    <p className="text-xs text-secondary-foreground/40">{item.time}</p>
                  </div>
                  <span className={`rounded-full border border-destructive/20 px-3 py-1 text-xs ${item.moodColor}`}>
                    {item.mood}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Without Screens */}
          <motion.div
            className="rounded-2xl border border-primary/20 bg-secondary-foreground/5 p-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Mountain className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-lg font-bold text-primary">Without Screens</h3>
            </div>
            <div className="space-y-1">
              {withoutScreens.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-secondary-foreground/5"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div>
                    <p className="font-body text-sm text-secondary-foreground/90">{item.action}</p>
                    <p className="text-xs text-secondary-foreground/40">{item.time}</p>
                  </div>
                  <span className={`rounded-full border border-primary/30 px-3 py-1 text-xs ${item.moodColor}`}>
                    {item.mood}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DayComparison;
