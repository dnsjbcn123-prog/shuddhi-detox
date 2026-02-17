import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Send, MessageCircle, RefreshCw, Globe, Lightbulb, Rocket, HelpCircle, ChevronDown, Sparkles, Bot } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

type ChatMsg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shuddhi-chat`;

const futureVisionItems = [
  {
    icon: Globe,
    title: "Evolution of Technology",
    content: "We envision a world where technology adapts to human rhythms — not the other way around. Shuddhi tracks emerging trends in AI, social media, and device design to help you stay ahead of the curve while maintaining your digital well-being.",
  },
  {
    icon: Lightbulb,
    title: "Smart Planning & Innovation",
    content: "From AI-powered screen-time insights to personalized digital wellness plans, we're building tools that make intentional living effortless. Our roadmap includes smart notifications, focus-mode automation, and community-driven challenges.",
  },
  {
    icon: Rocket,
    title: "Next-Generation Solutions",
    content: "We're developing features like real-time digital habit tracking, gamified detox journeys, and cross-device wellness syncing — all designed to empower the next generation to build a healthier relationship with technology.",
  },
  {
    icon: HelpCircle,
    title: "Why Shuddhi?",
    content: "Shuddhi isn't just another wellness app — it's a movement rooted in ancient Indian wisdom and modern behavioural science. We combine mindfulness traditions with cutting-edge technology to offer a uniquely holistic approach to digital balance.",
  },
];

const FAQ = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [visionOpen, setVisionOpen] = useState<number | null>(null);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSatisfied, setShowSatisfied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, showSatisfied]);

  const sendMessage = async (input: string) => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMsg = { role: "user", content: input.trim() };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsLoading(true);
    setShowSatisfied(false);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setChatMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const allMessages = [...chatMessages, userMsg];
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => null);
        throw new Error(errData?.error || `Request failed (${resp.status})`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Flush remaining
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch { /* ignore */ }
        }
      }

      setShowSatisfied(true);
    } catch (e) {
      console.error("Chat error:", e);
      toast({
        title: "Couldn't get a response",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskAnother = () => {
    setShowSatisfied(false);
  };

  const handleReset = () => {
    setChatMessages([]);
    setShowSatisfied(false);
    setChatInput("");
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
              Knowledge Vault
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Understanding digital balance, one question at a time.
            </p>
          </motion.div>

          {/* AI Promotion Banner */}
          <motion.div
            className="mx-auto mb-16 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8 text-center">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                  <Bot className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Meet Shuddhi AI — Your Digital Wellness Guide
                </h3>
                <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
                  Have a question about digital balance, mindful tech, or building healthier habits? Our AI assistant is trained on everything Shuddhi — scroll down to start a conversation.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-primary/70">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="font-heading tracking-wider uppercase">Powered by Shuddhi Intelligence</span>
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Future Vision Panel */}
          <motion.div
            className="mx-auto mb-20 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass overflow-hidden">
              <div className="p-8 text-center border-b border-border/50">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Future Vision</h2>
                <p className="mt-2 text-sm text-muted-foreground italic max-w-lg mx-auto">
                  Highlighting Shuddhi's forward-thinking mindset — understanding how technology and digital systems will evolve and preparing solutions for the next generation.
                </p>
              </div>
              <div className="divide-y divide-border/50">
                {futureVisionItems.map((item, i) => (
                  <div key={i}>
                    <button
                      className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/30"
                      onClick={() => setVisionOpen(visionOpen === i ? null : i)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-primary shrink-0" />
                        <span className="font-heading text-sm font-medium text-foreground">{item.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: visionOpen === i ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {visionOpen === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                          <p className="px-5 pb-5 pl-13 font-body text-sm leading-relaxed text-muted-foreground">
                            {item.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
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

          {/* Still Curious - AI Chat */}
          <motion.div
            className="mx-auto mt-20 max-w-xl text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-accent text-2xl italic text-foreground">Still Curious?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask our AI guide anything about digital balance.
            </p>

            {!chatOpen ? (
              <motion.button
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-heading text-sm tracking-wider text-primary-foreground uppercase transition-all duration-300 hover:opacity-90"
                onClick={() => setChatOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="h-4 w-4" />
                Start a conversation
              </motion.button>
            ) : (
              <motion.div
                className="glass mt-6 overflow-hidden text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Chat messages */}
                <div className="max-h-80 overflow-y-auto p-6 space-y-4">
                  {chatMessages.length === 0 && (
                    <p className="text-center font-body text-sm text-muted-foreground/60 italic">
                      Ask me anything about digital balance, mindful tech, or Shuddhi...
                    </p>
                  )}

                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && chatMessages[chatMessages.length - 1]?.role !== "assistant" && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                        <span className="animate-pulse">Thinking...</span>
                      </div>
                    </div>
                  )}

                  {/* Satisfaction prompt */}
                  {showSatisfied && !isLoading && (
                    <motion.div
                      className="flex flex-col items-center gap-3 pt-4 border-t border-border"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <p className="font-body text-sm text-muted-foreground">
                        Was this helpful?
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={handleReset}
                          className="rounded-full bg-primary/10 px-5 py-2 text-xs font-heading tracking-wider text-primary uppercase hover:bg-primary/20 transition-colors"
                        >
                          Yes, thank you! ✨
                        </button>
                        <button
                          onClick={handleAskAnother}
                          className="inline-flex items-center gap-1.5 rounded-full bg-muted px-5 py-2 text-xs font-heading tracking-wider text-foreground uppercase hover:bg-muted/80 transition-colors"
                        >
                          <RefreshCw className="h-3 w-3" />
                          Ask another
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                {!showSatisfied && (
                  <div className="border-t border-border p-4">
                    <div className="flex gap-2">
                      <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") sendMessage(chatInput);
                        }}
                        disabled={isLoading}
                      />
                      <button
                        onClick={() => sendMessage(chatInput)}
                        disabled={!chatInput.trim() || isLoading}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
