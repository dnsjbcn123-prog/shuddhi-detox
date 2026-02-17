import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DayComparison from "@/components/DayComparison";
import journalImage from "@/assets/journal-desk.jpg";
import heroImage from "@/assets/hero-workspace.jpg";
import teamRivaan from "@/assets/team-rivaan.jpg";
import teamAakash from "@/assets/team-aakash.jpg";
import teamSamay from "@/assets/team-samay.jpg";
import teamDhir from "@/assets/team-dhir.jpg";

const teamMembers = [
{ name: "Samay Shah", role: "Lead Developer", image: teamSamay },
{ name: "Dhir Jain", role: "Backend Developer", image: teamDhir },
{ name: "Rivaan Shah", role: "Content Manager", image: teamRivaan },
{ name: "Aakash Sharma", role: "Tester", image: teamAakash }];


const About = () =>
<div className="min-h-screen bg-background">
    <Navigation />

    {/* Hero */}
    <section className="relative pt-32 pb-20">
      <div className="absolute inset-0 opacity-5">
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
        transition={{ duration: 0.8 }}>

          <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
            About Shuddhi
          </h1>
          <p className="mt-6 font-accent text-xl italic text-primary md:text-2xl">
            शुद्धि — Purification. Clarity. Balance.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Shuddhi Meaning Section (moved from homepage) */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}>

            <h2 className="font-accent text-4xl italic text-foreground md:text-5xl">शुद्धि</h2>
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

    {/* Story */}
    <section className="bg-muted py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl space-y-12">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

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
          transition={{ duration: 1 }}>

            <div className="absolute left-0 top-0 h-72 w-3/5 overflow-hidden shadow-2xl" style={{ borderRadius: "var(--radius)" }}>
              <img alt="Sunlit workspace" className="h-full w-full object-cover" src="/lovable-uploads/ff885130-4e9b-4300-9037-fa22b22d3a96.png" />
            </div>
            <div className="absolute right-0 bottom-0 h-56 w-2/5 overflow-hidden shadow-xl" style={{ borderRadius: "var(--radius)" }}>
              <img alt="Journal on desk" className="h-full w-full object-cover" src="/lovable-uploads/b4a7f415-0b50-4c84-9f88-1efcc3a1fb84.png" />
            </div>
          </motion.div>

          <motion.div
          className="glass p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}>

            <p className="font-heading text-xl font-bold text-foreground">This is not anti-tech.</p>
            <p className="mt-2 font-heading text-xl font-light text-primary">This is conscious tech.</p>
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
          transition={{ duration: 1 }}>

            <p className="font-accent text-3xl italic text-foreground">
              Stay Connected. Stay Centered.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Day Comparison (moved from homepage) */}
    <DayComparison />

    {/* Team Section */}
    <section className="bg-muted py-32">
      <div className="container mx-auto px-6">
        <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}>

          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            The Team Behind Shuddhi
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground">
            Building a more intentional digital future.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl h-[600px] md:h-[550px]">
          {teamMembers.map((member, i) => {
            const positions = [
              "absolute top-0 left-0 z-10 w-[45%] md:w-[30%]",
              "absolute top-[5%] right-[5%] z-20 w-[42%] md:w-[28%]",
              "absolute bottom-[5%] left-[15%] z-30 w-[40%] md:w-[26%]",
              "absolute bottom-0 right-[2%] z-20 w-[44%] md:w-[29%]",
            ];
            const animations = [
              { x: -40, y: 0 },
              { x: 40, y: -20 },
              { x: -20, y: 40 },
              { x: 30, y: 30 },
            ];
            return (
              <motion.div
                key={member.name}
                className={`${positions[i]} group overflow-hidden shadow-2xl`}
                style={{ borderRadius: "var(--radius)" }}
                initial={{ opacity: 0, x: animations[i].x, y: animations[i].y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.04, zIndex: 40 }}
              >
                <div className="relative h-64 md:h-72 w-full overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: "center 25%" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/80 to-transparent p-4 pt-10">
                    <h3 className="font-heading text-sm font-bold text-secondary-foreground">{member.name}</h3>
                    <p className="font-body text-xs text-primary">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    <Footer />
  </div>;


export default About;