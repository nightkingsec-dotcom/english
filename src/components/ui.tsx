import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface SlideTag {
  icon: LucideIcon;
  label: string;
}

export interface SlideProps {
  accent: string;
  kicker: string;
  bgWord: string;
  tag: SlideTag;
  next: () => void;
}

/* ---------- motion primitives ---------- */

export const itemV: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.14 + i * 0.09, duration: 0.65, ease: EASE },
  }),
};

export function Item({
  i = 0,
  className,
  children,
}: {
  i?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={itemV}
      initial="hidden"
      animate="show"
      custom={i}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- typographic chrome ---------- */

export function Kicker({
  accent,
  children,
}: {
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-mute">
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: accent, boxShadow: `0 0 14px ${accent}` }}
      />
      {children}
    </div>
  );
}

export function TagPill({
  accent,
  icon: Icon,
  label,
}: {
  accent: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.24em]"
      style={{ borderColor: `${accent}44`, color: accent, background: `${accent}0d` }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: accent }}
        />
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ background: accent }}
        />
      </span>
      <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
      {label}
    </div>
  );
}

export function Headline({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.1rem,4.6vw,4.2rem)]">
      {children}
    </h2>
  );
}

/* ---------- shared slide scaffold ---------- */

export function SlideShell({
  accent,
  kicker,
  bgWord,
  tag,
  children,
}: SlideProps & { children: ReactNode }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <div
        aria-hidden
        className="text-stroke-soft pointer-events-none absolute -bottom-16 -right-4 select-none whitespace-nowrap font-display font-bold italic leading-none"
        style={{ fontSize: "clamp(11rem, 24vw, 26rem)" }}
      >
        {bgWord}
      </div>
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 pt-6 md:px-12 md:pt-8">
        <Kicker accent={accent}>{kicker}</Kicker>
        <TagPill accent={accent} icon={tag.icon} label={tag.label} />
      </header>
      <main className="no-scrollbar relative z-10 flex min-h-0 flex-1 flex-col justify-center overflow-y-auto px-5 pb-24 pt-6 md:px-12">
        {children}
      </main>
    </div>
  );
}

/* ---------- tiny shared bits ---------- */

export function Caveat({
  children,
  className = "",
  color,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <span
      className={`font-hand text-2xl leading-none md:text-[1.7rem] ${className}`}
      style={{ color: color ?? "#c8ff3d" }}
    >
      {children}
    </span>
  );
}

export function AccentButton({
  accent,
  onClick,
  children,
  className = "",
}: {
  accent: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink shadow-lg ${className}`}
      style={{ background: accent, boxShadow: `0 12px 40px -8px ${accent}66` }}
    >
      {children}
    </motion.button>
  );
}

export function GhostButton({
  onClick,
  children,
  className = "",
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-paper backdrop-blur transition-colors hover:border-white/45 ${className}`}
    >
      {children}
    </motion.button>
  );
}
