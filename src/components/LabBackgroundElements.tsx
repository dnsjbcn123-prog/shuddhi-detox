import { motion } from "framer-motion";

/** Animated SVG wave divider */
export const WaveDivider = ({ flip = false, className = "" }: { flip?: boolean; className?: string }) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="w-full h-[60px] md:h-[80px]"
    >
      <motion.path
        d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,120 L0,120 Z"
        fill="hsl(var(--primary) / 0.06)"
        initial={{ d: "M0,40 C360,100 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,120 L0,120 Z" }}
        animate={{
          d: [
            "M0,40 C360,100 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,120 L0,120 Z",
            "M0,60 C360,20 720,80 1080,30 C1260,10 1380,70 1440,40 L1440,120 L0,120 Z",
            "M0,40 C360,100 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,120 L0,120 Z",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,70 C480,30 960,90 1440,50 L1440,120 L0,120 Z"
        fill="hsl(var(--accent) / 0.05)"
        animate={{
          d: [
            "M0,70 C480,30 960,90 1440,50 L1440,120 L0,120 Z",
            "M0,50 C480,90 960,20 1440,70 L1440,120 L0,120 Z",
            "M0,70 C480,30 960,90 1440,50 L1440,120 L0,120 Z",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

/** Floating organic orbs */
export const FloatingOrbs = ({ count = 5 }: { count?: number }) => {
  const orbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 80 + Math.random() * 200,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 12 + Math.random() * 10,
    color: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--accent)" : "var(--warm)",
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `hsl(${orb.color} / 0.07)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
};

/** Floating leaf / botanical particles */
export const FloatingLeaves = ({ count = 8 }: { count?: number }) => {
  const leaves = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 15 + Math.random() * 10,
    size: 12 + Math.random() * 14,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.x}%`,
            top: "-5%",
            fontSize: leaf.size,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(leaf.id) * 60, Math.cos(leaf.id) * -40, 0],
            rotate: [leaf.rotation, leaf.rotation + 360],
            opacity: [0, 0.35, 0.35, 0],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            ease: "linear",
            delay: leaf.delay,
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
};

/** Subtle grid dots pattern */
export const DotPattern = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    <svg width="100%" height="100%" className="opacity-[0.03]">
      <defs>
        <pattern id="lab-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="hsl(var(--foreground))" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lab-dots)" />
    </svg>
  </div>
);
