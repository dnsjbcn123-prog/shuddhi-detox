import { Link } from "react-router-dom";
import { Leaf, Brain, Gamepad2, BookOpen, HelpCircle, Users } from "lucide-react";

const Footer = () =>
<footer className="border-t border-border bg-secondary py-16 text-secondary-foreground">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        {/* About Shuddhi */}
        <div className="md:col-span-1">
          <h3 className="font-heading text-2xl font-bold tracking-wider">SHUDDHI</h3>
          <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/70">
            Shuddhi (शुद्धि) means purification. We believe in digital balance — not disconnecting from technology, but mastering your relationship with it. Use tech intentionally, live mindfully.
          </p>
          <p className="mt-4 font-accent text-sm italic text-primary/80">
            Stay Connected. Stay Centered.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-secondary-foreground/80">Pages</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/60">
            <li><Link to="/" className="flex items-center gap-2 transition-colors hover:text-primary"><Leaf className="h-3.5 w-3.5" /> Home</Link></li>
            <li><Link to="/lab" className="flex items-center gap-2 transition-colors hover:text-primary"><Gamepad2 className="h-3.5 w-3.5" /> Balance Lab</Link></li>
            <li><Link to="/articles" className="flex items-center gap-2 transition-colors hover:text-primary"><BookOpen className="h-3.5 w-3.5" /> Articles</Link></li>
            <li><Link to="/reflections" className="flex items-center gap-2 transition-colors hover:text-primary"><Brain className="h-3.5 w-3.5" /> Reflections</Link></li>
            <li><Link to="/faq" className="flex items-center gap-2 transition-colors hover:text-primary"><HelpCircle className="h-3.5 w-3.5" /> FAQ</Link></li>
            <li><Link to="/about" className="flex items-center gap-2 transition-colors hover:text-primary"><Users className="h-3.5 w-3.5" /> About Us</Link></li>
          </ul>
        </div>

        {/* Key Features */}
        <div>
          <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-secondary-foreground/80">Key Features</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/60">
            <li> Digital Harmony Score</li>
            <li>Interactive Balance Games</li>
            <li> AI Voice Transcription</li>
            <li>Guided Meditation Timer</li>
            <li>Screen Time Impact Data</li>
            <li>Reflection Archive</li>
          </ul>
        </div>

        {/* Developers */}
        <div>
          <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-secondary-foreground/80">Our Team</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/60">
            <li><span className="text-secondary-foreground/90 font-medium">Samay</span> — Lead Developer</li>
            <li><span className="text-secondary-foreground/90 font-medium">Dhir</span> — Backend Developer</li>
            <li><span className="text-secondary-foreground/90 font-medium">Rivaan</span> — Content Manager</li>
            <li><span className="text-secondary-foreground/90 font-medium">Aakash</span> — Tester</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-border/50 pt-8 flex flex-col items-center gap-3 md:flex-row md:justify-between">
        <p className="text-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} Shuddhi. Built by Samay, Dhir, Rivaan & Aakash. All rights reserved.
        </p>
        <p className="text-xs text-secondary-foreground/40">
          Empowering mindful digital living.
        </p>
      </div>
    </div>
  </footer>;


export default Footer;