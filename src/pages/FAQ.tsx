import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "Is Shuddhi anti-technology?",
    a: "Not at all. Shuddhi promotes digital balance — not rejection. Technology is a powerful tool for connection, creativity, and growth. The question isn't whether to use it, but how to use it with intention.",
  },
  {
    q: "What is digital balance?",
    a: "Digital balance is the practice of using technology consciously — in ways that serve your goals, relationships, and well-being. It's about creating a healthy relationship with your devices rather than being controlled by them.",
  },
  {
    q: "Why the name 'Shuddhi'?",
    a: "Shuddhi (शुद्धि) is a Hindi word meaning purification and clarity. We chose it to honor India's deep tradition of mindfulness and conscious living, connecting ancient wisdom with modern digital challenges.",
  },
  {
    q: "How is this different from digital detox?",
    a: "Digital detox suggests complete disconnection — which is temporary and often unsustainable. Digital balance is a lasting practice. It's about building systems and habits that make intentional use the default, not the exception.",
  },
  {
    q: "Can technology and mindfulness coexist?",
    a: "Absolutely. Technology can enhance mindfulness through meditation apps, focus tools, and connected communities. The key is choosing tools that align with your values and using them with awareness.",
  },
  {
    q: "Who is Shuddhi for?",
    a: "Anyone who uses technology — which is nearly everyone. Whether you're a student, professional, creator, or parent, digital balance is relevant. Shuddhi meets you where you are and helps you find your own rhythm.",
  },
];

const FAQ = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
              Knowledge Vault
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Understanding digital balance, one question at a time.
            </p>
          </motion.div>

          {/* FAQ cards */}
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="glass cursor-pointer overflow-hidden transition-all duration-500"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: selected === i ? 1 : 1.01 }}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="font-heading text-base font-medium text-foreground pr-4">
                    {faq.q}
                  </h3>
                  <motion.span
                    className="shrink-0 text-primary"
                    animate={{ rotate: selected === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </div>
                <AnimatePresence>
                  {selected === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 font-body text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still Curious */}
          <motion.div
            className="mx-auto mt-20 max-w-md text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-accent text-2xl italic text-foreground">Still Curious?</h3>
            {!submitted ? (
              <div className="mt-6">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question..."
                  className="glass w-full p-4 text-center font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  style={{ borderRadius: "var(--radius)" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && question.trim()) {
                      setSubmitted(true);
                      setQuestion("");
                    }
                  }}
                />
              </div>
            ) : (
              <motion.p
                className="mt-6 font-accent text-lg italic text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Balance begins with awareness.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
