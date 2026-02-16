import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import meditationImg from "@/assets/meditation-calm.jpg";
import readingImg from "@/assets/reading-nook.jpg";
import natureImg from "@/assets/nature-walk.jpg";
import focusedImg from "@/assets/focused-workspace.jpg";

const articles = [
  {
    id: 1,
    title: "The Art of Intentional Scrolling",
    category: "Mind",
    excerpt: "How mindfulness transforms your relationship with infinite feeds.",
    image: meditationImg,
    content: "In an age of infinite content, the act of scrolling has become automatic — a reflex rather than a choice. But what if every scroll was intentional?\n\nMindful scrolling isn't about limiting screen time. It's about bringing awareness to why you're reaching for your phone, what you're consuming, and how it makes you feel.\n\nBegin by noticing: Are you scrolling to learn, to connect, or to escape? There's no wrong answer — only awareness.\n\nThe ancient Indian concept of 'viveka' — discernment — applies beautifully here. It's the ability to distinguish between what serves your growth and what merely fills time.\n\nStart with one practice: before opening any app, take one conscious breath. This tiny pause creates a gap between impulse and action — and in that gap lies your freedom.",
  },
  {
    id: 2,
    title: "AI as a Thinking Partner",
    category: "Technology",
    excerpt: "Why artificial intelligence can amplify human creativity when used with intention.",
    image: focusedImg,
    content: "The narrative around AI often swings between utopian promise and existential dread. But there's a middle path — one that honors both human creativity and technological capability.\n\nAI works best not as a replacement for thinking, but as a catalyst for deeper thought. Use it to explore ideas you haven't considered, to challenge your assumptions, to accelerate the tedious parts of creation.\n\nThe key is maintaining your role as the decision-maker. AI generates options; you choose direction. AI produces variations; you define quality. AI suggests possibilities; you provide meaning.\n\nThis is the essence of digital balance: leveraging powerful tools while retaining your agency and creative sovereignty.",
  },
  {
    id: 3,
    title: "Digital Minimalism, Indian Style",
    category: "Balance",
    excerpt: "Ancient Indian philosophy meets modern tech wellness.",
    image: natureImg,
    content: "The concept of 'aparigraha' — non-possessiveness — is one of the fundamental principles in Indian philosophy. Applied to our digital lives, it asks us to hold our tools lightly.\n\nDigital minimalism isn't about owning fewer devices. It's about reducing the mental clutter that excessive digital engagement creates. It's about choosing quality over quantity in our digital consumption.\n\nConsider the Indian practice of 'mauna' — conscious silence. What if we applied periods of digital silence to our days? Not as punishment, but as restoration.\n\nThe goal isn't to return to a pre-digital age. It's to bring the wisdom of conscious living into our hyperconnected present.",
  },
  {
    id: 4,
    title: "Building Systems, Not Willpower",
    category: "Future",
    excerpt: "Why sustainable digital habits are designed, not forced.",
    image: readingImg,
    content: "Willpower is a finite resource. Every study on habit change confirms this. So why do we approach digital wellness as if it were a test of character?\n\nThe most effective approach is systems thinking: design your environment to make balanced choices the default.\n\nMove social media apps off your home screen. Set notification schedules. Create device-free zones in your home. These aren't restrictions — they're architecture for intentional living.\n\nThe technology industry designs for engagement. You can design for alignment — aligning your digital tools with your actual values and goals.\n\nThis is the future of digital balance: not less technology, but better-designed relationship with technology.",
  },
];

const videos = [
  {
    id: "v1",
    title: "How Social Media Rewires Your Brain",
    channel: "After Skool",
    youtubeId: "7I9MJPzYMPc",
    category: "Mind",
  },
  {
    id: "v2",
    title: "Digital Minimalism — Cal Newport",
    channel: "Cal Newport",
    youtubeId: "3E7hkPZ-HTk",
    category: "Balance",
  },
  {
    id: "v3",
    title: "The Attention Economy — How They Addict Us",
    channel: "Freedom in Thought",
    youtubeId: "50R21mblLb0",
    category: "Technology",
  },
  {
    id: "v4",
    title: "Monk Mode — How to Get Sh*t Done",
    channel: "Better Ideas",
    youtubeId: "JBzCoB_l8EM",
    category: "Future",
  },
  {
    id: "v5",
    title: "Why You're Always Tired — The Dopamine Trap",
    channel: "Sprouht",
    youtubeId: "kl1ujGtVFnQ",
    category: "Mind",
  },
  {
    id: "v6",
    title: "How I Cured My Phone Addiction",
    channel: "Matt D'Avella",
    youtubeId: "fVWT3MJnm48",
    category: "Balance",
  },
];

const categoryColors: Record<string, string> = {
  Mind: "bg-primary/15 text-primary",
  Technology: "bg-accent/30 text-accent-foreground",
  Balance: "bg-warm/40 text-warm-foreground",
  Future: "bg-secondary/15 text-secondary",
};

const Articles = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [reflection, setReflection] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const [activeTab, setActiveTab] = useState<"articles" | "videos">("articles");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
              Living Book Library
            </h1>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              Perspectives on technology, balance, and conscious living.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="mx-auto mb-12 flex max-w-xs justify-center gap-2">
            <button
              onClick={() => setActiveTab("articles")}
              className={`rounded-lg px-6 py-3 font-heading text-sm tracking-wider uppercase transition-all duration-300 ${
                activeTab === "articles"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
              style={{ borderRadius: "var(--radius)" }}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`rounded-lg px-6 py-3 font-heading text-sm tracking-wider uppercase transition-all duration-300 ${
                activeTab === "videos"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
              style={{ borderRadius: "var(--radius)" }}
            >
              Videos
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "articles" ? (
              <motion.div
                key="articles"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Article cards */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
                  {articles.map((article, i) => (
                    <motion.div
                      key={article.id}
                      className="glass group cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      whileHover={{ y: -5, rotateY: 3 }}
                      onClick={() => setSelectedArticle(article)}
                      style={{ perspective: "1000px", borderRadius: "var(--radius)" }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <span className={`absolute bottom-4 left-4 inline-block rounded-full px-3 py-1 font-body text-xs ${categoryColors[article.category]}`}>{article.category}</span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-xl font-bold text-foreground">{article.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                        <span className="mt-4 inline-block text-xs tracking-wider text-primary uppercase">Read →</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Video cards */}
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {videos.map((video, i) => (
                    <motion.div
                      key={video.id}
                      className="glass overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      <div className="relative aspect-video w-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <span className={`inline-block rounded-full px-3 py-1 font-body text-xs ${categoryColors[video.category]}`}>{video.category}</span>
                        <h3 className="mt-3 font-heading text-base font-bold leading-snug text-foreground">{video.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{video.channel}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Article reader overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setSelectedArticle(null); setShowReflection(false); setReflection(""); }}
          >
            <motion.div
              className="mx-4 max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-background shadow-2xl"
              style={{ borderRadius: "var(--radius)" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 overflow-hidden" style={{ borderRadius: "var(--radius) var(--radius) 0 0" }}>
                <img src={selectedArticle.image} alt={selectedArticle.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <div className="p-8 md:p-12">
                <span className={`inline-block rounded-full px-3 py-1 font-body text-xs ${categoryColors[selectedArticle.category]}`}>{selectedArticle.category}</span>
                <h2 className="mt-6 font-heading text-3xl font-bold text-foreground">{selectedArticle.title}</h2>
                <div className="mt-8 space-y-4">
                  {selectedArticle.content.split("\n\n").map((para, i) => (
                    <p key={i} className="font-body text-base leading-relaxed text-foreground/80">{para}</p>
                  ))}
                </div>
                <div className="mt-12 border-t border-border pt-8">
                  <p className="font-accent text-lg italic text-primary">What will you apply today?</p>
                  {!showReflection ? (
                    <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} onBlur={() => { if (reflection.trim()) setShowReflection(true); }} placeholder="Write your reflection..." className="mt-4 w-full resize-none border-none bg-transparent p-0 font-accent text-base italic text-foreground/60 placeholder:text-muted-foreground/30 focus:outline-none" rows={2} />
                  ) : (
                    <motion.p className="mt-4 font-accent italic text-foreground/40" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 3, delay: 1 }}>{reflection}</motion.p>
                  )}
                </div>
                <button onClick={() => { setSelectedArticle(null); setShowReflection(false); setReflection(""); }} className="mt-8 text-sm text-muted-foreground transition-colors hover:text-foreground">← Back to Library</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Articles;
