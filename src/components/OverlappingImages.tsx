import { motion } from "framer-motion";
import meditationImg from "@/assets/meditation-calm.jpg";
import phoneImg from "@/assets/intentional-phone.jpg";
import natureImg from "@/assets/nature-walk.jpg";

const OverlappingImages = () => {
  return (
    <section className="relative bg-background py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* Overlapping image composition */}
          <div className="relative h-[500px] md:h-[600px]">
            <motion.div
              className="absolute top-0 left-0 z-10 w-[65%] overflow-hidden shadow-2xl"
              style={{ borderRadius: "var(--radius)" }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img src={meditationImg} alt="Meditation and mindfulness" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              className="absolute top-[15%] right-0 z-20 w-[55%] overflow-hidden shadow-2xl"
              style={{ borderRadius: "var(--radius)" }}
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <img src={phoneImg} alt="Intentional technology use" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-[10%] z-30 w-[50%] overflow-hidden shadow-2xl"
              style={{ borderRadius: "var(--radius)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <img src={natureImg} alt="Walking in nature" className="h-full w-full object-cover" />
            </motion.div>
          </div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Balance isn't a destination.
              <br />
              <span className="font-light text-primary">It's a practice.</span>
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-muted-foreground">
              Every moment of awareness is a step toward harmony. Shuddhi helps you 
              cultivate intentionality — not by removing technology, but by transforming 
              your relationship with it.
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-muted-foreground">
              From mindful mornings to conscious consumption, the journey of digital 
              balance begins with a single pause.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OverlappingImages;
