import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import journalImage from "@/assets/journal-desk.jpg";
import heroImage from "@/assets/hero-workspace.jpg";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navigation />

    {/* Hero */}
    <section className="relative pt-32 pb-20">
      <div className="absolute inset-0 opacity-5">
        {/* Subtle geometric pattern */}
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="hsl(141, 13%, 50%)" />
              <circle cx="0" cy="0" r="1" fill="hsl(141, 13%, 50%)" />
              <circle cx="60" cy="0" r="1" fill="hsl(141, 13%, 50%)" />
              <circle cx="0" cy="60" r="1" fill="hsl(141, 13%, 50%)" />
              <circle cx="60" cy="60" r="1" fill="hsl(141, 13%, 50%)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo)" />
        </svg>
      </div>

      <div className="container relative mx-auto px-6">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
            About Shuddhi
          </h1>
          <p className="mt-6 font-accent text-xl italic text-primary md:text-2xl">
            शुद्धि — Purification. Clarity. Balance.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-lg leading-relaxed text-foreground/80">
              <span className="font-accent text-2xl italic text-primary">Shuddhi</span> comes
              from Hindi — meaning purification and clarity. It represents the process of removing
              what doesn't serve you, creating space for what does.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="font-body text-lg leading-relaxed text-foreground/80">
              We chose this name to connect India's philosophy of balance with the future of
              technology. India has gifted the world practices of mindfulness, yoga, and conscious
              living. Now, as technology reshapes how we live, work, and connect — these ancient
              principles become more relevant than ever.
            </p>
          </motion.div>

          {/* Image composition */}
          <motion.div
            className="relative my-16 h-96"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="absolute left-0 top-0 h-72 w-3/5 overflow-hidden shadow-2xl" style={{ borderRadius: "var(--radius)" }}>
              <img src={heroImage} alt="Sunlit workspace" className="h-full w-full object-cover" />
            </div>
            <div className="absolute right-0 bottom-0 h-56 w-2/5 overflow-hidden shadow-xl" style={{ borderRadius: "var(--radius)" }}>
              <img src={journalImage} alt="Journal on desk" className="h-full w-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            className="glass p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="font-heading text-xl font-bold text-foreground">
              This is not anti-tech.
            </p>
            <p className="mt-2 font-heading text-xl font-light text-primary">
              This is conscious tech.
            </p>
            <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
              We believe technology is one of humanity's greatest achievements. The challenge isn't
              the tools themselves — it's our relationship with them. Shuddhi exists to help you
              build a relationship with technology that serves your well-being, creativity, and connection.
            </p>
          </motion.div>

          <motion.div
            className="pt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-accent text-3xl italic text-foreground">
              Stay Connected. Stay Centered.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
