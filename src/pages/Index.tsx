import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScreenTimeImpact from "@/components/ScreenTimeImpact";
import DayComparison from "@/components/DayComparison";
import CommitToPledge from "@/components/CommitToPledge";
import OverlappingImages from "@/components/OverlappingImages";
import heroImage from "@/assets/hero-sunlit-workspace.jpg";
import journalImage from "@/assets/journal-desk.jpg";
import readingImg from "@/assets/reading-nook.jpg";
import focusedImg from "@/assets/focused-workspace.jpg";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <Navigation />

      {/* Hero Section */}
      <section className="grain-overlay relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Sunlit minimal workspace"
            className="h-full w-full object-cover" />

          <div className="absolute inset-0 bg-secondary/50" />
        </div>

        {/* Animated wave overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-64"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 40px, hsl(141, 13%, 50%, 0.15) 40px, hsl(141, 13%, 50%, 0.15) 41px)"
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            className="font-heading text-5xl font-bold leading-tight tracking-tight text-primary-foreground md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}>

            The Future Isn't Offline.
            <br />
            <span className="text-green-50">It's Intentional.</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-8 max-w-2xl font-body text-lg leading-relaxed text-primary-foreground/70 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}>

            Master the art of digital balance. Not disconnection — but intentional,
            conscious connection with the technology that shapes your world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}>

            <Link
              to="/lab"
              className="glass-dark mt-12 inline-block px-10 py-4 font-heading text-sm tracking-widest text-primary-foreground uppercase transition-all duration-500 hover:bg-primary/20"
              style={{ borderRadius: "var(--radius)" }}>

              Enter the Experience
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Meaning Section */}
      <section className="relative overflow-hidden bg-background py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}>

              <h2 className="font-accent text-4xl italic text-foreground md:text-5xl">
                शुद्धि
              </h2>
              <p className="mt-4 font-heading text-lg tracking-wide text-muted-foreground">
                Shuddhi — Purification, Clarity, Inner Cleansing
              </p>
            </motion.div>

            <motion.div
              className="mt-16 space-y-8 text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}>

              <p className="font-body text-lg leading-relaxed text-foreground/80">
                <span className="font-accent italic text-primary">"Shuddhi"</span> is an English
                transliteration of the Hindi word शुद्धि. Its original meaning is purification,
                clarity, and inner cleansing.
              </p>
              <p className="font-body text-lg leading-relaxed text-foreground/80">
                We chose the name Shuddhi to connect with India — a culture deeply rooted
                in balance, mindfulness, and conscious living.
              </p>
              <div className="my-12 h-px bg-border" />
              <p className="font-body text-lg leading-relaxed text-foreground/80">
                This platform does not promote rejecting technology.
                <br />
                <span className="font-medium text-foreground">It promotes mastering it.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overlapping Images Section */}
      <OverlappingImages />

      {/* Philosophy Pillars */}
      <section className="relative bg-muted py-32">
        <div className="container mx-auto px-6">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>

            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Technology is not the enemy.
            </h2>
            <p className="mt-4 font-heading text-3xl font-light text-primary md:text-4xl">
              Imbalance is.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {[
            { left: "Technology", right: "Humanity" },
            { left: "Speed", right: "Stillness" },
            { left: "Innovation", right: "Awareness" },
            { left: "India", right: "Future" }].
            map((pair, i) =>
            <motion.div
              key={i}
              className="glass flex items-center justify-between px-8 py-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}>

                <span className="font-heading text-lg font-medium text-foreground">
                  {pair.left}
                </span>
                <span className="text-primary">+</span>
                <span className="font-heading text-lg font-light text-primary">
                  {pair.right}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Screen Time Impact */}
      <ScreenTimeImpact />

      {/* Editorial overlapping image section */}
      <section className="relative overflow-hidden bg-background py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}>

              <p className="font-accent text-3xl italic leading-relaxed text-foreground md:text-4xl">
                "The goal is not disconnecting.
                <br />
                The goal is intentional connection."
              </p>
              <div className="mt-8 h-px w-24 bg-primary" />
            </motion.div>

            <div className="relative h-[400px]">
              <motion.div
                className="absolute top-0 right-0 w-[70%] overflow-hidden shadow-xl"
                style={{ borderRadius: "var(--radius)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}>

                <img src={readingImg} alt="Reading nook" className="h-full w-full object-cover" />
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 z-10 w-[60%] overflow-hidden shadow-xl"
                style={{ borderRadius: "var(--radius)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}>

                <img src={focusedImg} alt="Focused workspace" className="h-full w-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Day Comparison */}
      <DayComparison />

      {/* Commit to Change Pledge */}
      <CommitToPledge />

      {/* CTA Section */}
      <section className="bg-background py-32 text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>

            <h2 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
              Begin Your Digital Balance Journey
            </h2>
            <p className="mx-auto mt-6 max-w-lg font-body text-lg text-muted-foreground">
              Explore tools, reflections, and insights designed to help you
              find harmony in a hyperconnected world.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                to="/lab"
                className="rounded-lg bg-primary px-8 py-4 font-heading text-sm tracking-widest text-primary-foreground uppercase transition-all duration-300 hover:opacity-90"
                style={{ borderRadius: "var(--radius)" }}>

                Digital Balance Lab
              </Link>
              <Link
                to="/reset"
                className="glass px-8 py-4 font-heading text-sm tracking-widest text-foreground uppercase transition-all duration-300 hover:bg-primary/10">

                Reset Space
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Index;