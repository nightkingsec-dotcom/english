import { motion } from "framer-motion";
import { ArrowRight, Asterisk, MousePointerClick, Sparkles, Timer } from "lucide-react";
import { EASE, Item, Kicker, TagPill, type SlideProps } from "../components/ui";
import hero from "../assets/talk-hero.jpg";

const NAMES = ["ASHIB", "PAVAN", "BHARATH", "PRAMOD", "JEEVAN S."];
const MARQUEE = [
  "EMPATHY",
  "CLARITY",
  "TONE",
  "FEEDBACK",
  "LISTENING",
  "ASYNC",
  "RESPECT",
  "BREVITY",
];

function OrbitBadge({ accent }: { accent: string }) {
  return (
    <div className="relative h-28 w-28 md:h-32 md:w-32" style={{ color: accent }}>
      <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
        <defs>
          <path
            id="orbit-circle"
            d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          className="fill-current font-display"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="3.2"
        >
          <textPath href="#orbit-circle">COMMUNICATION • WORKPLACE • ENERGY •</textPath>
        </text>
      </svg>
      <Sparkles className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

export default function S01Title({ accent, tag, next }: SlideProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {/* giant ghost word */}
      <div
        aria-hidden
        className="text-stroke-soft pointer-events-none absolute -left-6 top-16 select-none whitespace-nowrap font-display font-bold italic leading-none opacity-60"
        style={{ fontSize: "clamp(11rem, 26vw, 30rem)" }}
      >
        HELLO
      </div>

      {/* floating hero visual */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: 6 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ delay: 0.55, duration: 0.9, ease: EASE }}
        className="absolute right-[3.5%] top-[13%] z-10 hidden w-[32vw] max-w-[500px] lg:block"
      >
        <div className="animate-float relative">
          <div
            className="overflow-hidden rounded-[2.2rem] border border-white/12 shadow-2xl"
            style={{ boxShadow: `0 40px 120px -30px ${accent}55` }}
          >
            <img
              src={hero}
              alt="Glossy 3D speech bubble and megaphone"
              className="aspect-[4/4.6] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -left-14 -top-12">
            <OrbitBadge accent={accent} />
          </div>
          <div className="absolute -left-16 bottom-8 w-56 rounded-2xl border border-white/12 bg-ink-2/85 p-4 backdrop-blur-md">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-mute">
              Agenda
            </p>
            <p className="mt-1 font-display text-lg font-bold leading-snug">
              4 interactive segments. Zero lecture mode.
            </p>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2, 3].map((d) => (
                <span
                  key={d}
                  className="h-1.5 flex-1 rounded-full"
                  style={{ background: accent }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* top bar */}
      <header className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-5 pt-6 md:px-12 md:pt-8">
        <Item i={0}>
          <Kicker accent={accent}>Communication &amp; Workplace — The Interactive Cut</Kicker>
        </Item>
        <Item i={0} className="hidden md:block">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
              <Timer className="h-3.5 w-3.5" style={{ color: accent }} />
              ±15 min · 0 boring parts
            </span>
            <TagPill accent={accent} icon={tag.icon} label={tag.label} />
          </div>
        </Item>
      </header>

      {/* hero copy */}
      <main className="relative z-20 flex flex-1 flex-col justify-center px-5 pb-10 md:px-12">
        <div className="max-w-[52rem]">
          <Item i={1}>
            <h1 className="font-display font-bold leading-[0.88] tracking-[-0.03em] text-[clamp(3.6rem,10.5vw,9rem)]">
              TALK
              <br />
              <span className="text-stroke">THAT</span>
              <br />
              WORKS<span style={{ color: accent }}>.</span>
            </h1>
          </Item>
          <Item i={2} className="mt-6 max-w-xl">
            <p className="text-base leading-relaxed text-white/60 md:text-lg">
              Emails, meetings &amp; group chats — the unwritten rules of talking to
              humans at work, decoded by your classmates. No PowerPoint voice.
              Promise.
            </p>
          </Item>
          <Item i={3} className="mt-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-mute">
                The crew
              </span>
              {NAMES.map((n, idx) => (
                <span key={n} className="flex items-center gap-4">
                  <span className="font-display text-sm font-bold tracking-[0.08em] md:text-base">
                    {n}
                  </span>
                  {idx < NAMES.length - 1 && (
                    <Asterisk className="h-4 w-4" style={{ color: accent }} />
                  )}
                </span>
              ))}
            </div>
          </Item>
          <Item i={4} className="mt-9">
            <div className="flex flex-wrap items-center gap-5">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={next}
                className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink"
                style={{ background: accent, boxShadow: `0 14px 50px -10px ${accent}80` }}
              >
                Start talking
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <span className="flex items-center gap-2 text-xs text-white/45">
                <MousePointerClick className="h-4 w-4" style={{ color: accent }} />
                or press
                <kbd className="rounded-md border border-white/20 bg-white/[0.06] px-2 py-1 text-[10px] font-bold tracking-widest">
                  SPACE
                </kbd>
              </span>
            </div>
          </Item>
        </div>
      </main>

      {/* marquee */}
      <div className="relative z-20 mb-14 overflow-hidden border-y border-white/10 bg-white/[0.03] py-3.5">
        <div className="animate-marquee flex w-max items-center">
          {[...MARQUEE, ...MARQUEE].map((w, idx) => (
            <span
              key={idx}
              className="flex items-center gap-8 pr-8 font-display text-sm font-bold tracking-[0.4em] text-white/35"
            >
              {w}
              <Asterisk className="h-4 w-4" style={{ color: `${accent}aa` }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
