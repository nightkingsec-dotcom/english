import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Shuffle, Ticket } from "lucide-react";
import { CYAN, GOLD, LIME, PINK, VIOLET } from "../lib/palette";
import { pop } from "../lib/confetti";
import { EASE, Item, SlideShell, type SlideProps } from "../components/ui";

const ROWS = [
  { t: "Clarity beats cleverness", d: "Short. Concrete. Screenshot-proof.", c: LIME },
  { t: "Assume positive intent", d: "Read generously. Write carefully.", c: CYAN },
  { t: "Match message to medium", d: "Chat for quick · call for tricky · email for paper trail.", c: VIOLET },
  { t: "Listen to understand", d: "Pause → probe → paraphrase.", c: GOLD },
  { t: "Feedback travels in SBI", d: "Situation · Behavior · Impact. Never character.", c: PINK },
];

const WORDS = [
  { w: "PAUSE", c: GOLD },
  { w: "KIND + CLEAR", c: LIME },
  { w: "TONE", c: CYAN },
  { w: "SBI", c: PINK },
  { w: "ASK, DON'T TELL", c: VIOLET },
  { w: "2 SECONDS", c: GOLD },
  { w: "CLARITY", c: LIME },
  { w: "ASYNC FIRST", c: CYAN },
];

export default function S09Takeaways(props: SlideProps) {
  const { accent } = props;
  const [hover, setHover] = useState<number | null>(null);
  const [word, setWord] = useState(WORDS[3]);
  const [drawn, setDrawn] = useState(false);

  const draw = () => {
    let next = word;
    let guard = 0;
    while (next.w === word.w && guard < 10) {
      next = WORDS[Math.floor(Math.random() * WORDS.length)];
      guard++;
    }
    setWord(next);
    setDrawn(true);
    pop(0.78, 0.72, 55);
  };

  return (
    <SlideShell {...props}>
      <Item i={0}>
        <p className="font-hand text-2xl" style={{ color: accent }}>
          if you only remember five things —
        </p>
      </Item>

      <div className="mt-4">
        {ROWS.map((r, i) => (
          <Item key={r.t} i={1 + i}>
            <button
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="group flex w-full items-baseline gap-4 border-b border-white/10 py-3 text-left md:gap-7 md:py-4"
            >
              <span
                className="w-9 shrink-0 font-display text-sm font-bold tabular-nums transition-colors md:text-base"
                style={{ color: hover === i ? r.c : "rgba(163,162,176,0.8)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <motion.span
                animate={{ x: hover === i ? 10 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="font-display font-bold leading-tight tracking-tight text-[clamp(1.4rem,3.4vw,2.9rem)] transition-colors duration-300"
                style={{ color: hover === i ? r.c : "#f5f3ee" }}
              >
                {r.t}
              </motion.span>
              <span
                className="ml-auto hidden max-w-[16rem] text-right text-xs leading-snug transition-opacity duration-300 md:block md:text-sm"
                style={{ color: "rgba(245,243,238,0.55)", opacity: hover === i ? 1 : 0.35 }}
              >
                {r.d}
              </span>
            </button>
          </Item>
        ))}
      </div>

      <Item i={7} className="mt-7">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[1.6rem] border border-white/12 bg-ink-2/80 px-6 py-5 backdrop-blur">
          <div className="max-w-md">
            <p
              className="inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.26em]"
              style={{ color: accent }}
            >
              <Ticket className="h-4 w-4" />
              Exit ticket — one-word checkout
            </p>
            <p className="mt-1.5 text-sm leading-snug text-white/60">
              Shout the ONE idea you're taking back to your group chats… or let fate decide
              for you.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="h-14 w-32 overflow-hidden md:w-44">
              <AnimatePresence mode="wait">
                <motion.p
                  key={word.w}
                  initial={{ y: 40, opacity: 0, rotate: 4 }}
                  animate={{ y: 0, opacity: 1, rotate: -2 }}
                  exit={{ y: -40, opacity: 0, rotate: -4 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="whitespace-nowrap font-display text-3xl font-bold md:text-4xl"
                  style={{ color: drawn ? word.c : "rgba(245,243,238,0.35)" }}
                >
                  {drawn ? word.w : "READY?"}
                </motion.p>
              </AnimatePresence>
            </div>
            <motion.button
              whileHover={{ scale: 1.06, rotate: -1 }}
              whileTap={{ scale: 0.93 }}
              onClick={draw}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink"
              style={{ background: accent, boxShadow: `0 10px 36px -10px ${accent}80` }}
            >
              <Shuffle className="h-4 w-4" />
              Draw a word
            </motion.button>
          </div>
        </div>
      </Item>
    </SlideShell>
  );
}
