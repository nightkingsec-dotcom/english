import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Quote, RotateCcw, Trophy, X } from "lucide-react";
import { CORAL, LIME } from "../lib/palette";
import { pop } from "../lib/confetti";
import { EASE, Item, SlideShell, type SlideProps } from "../components/ui";

type Pick = "myth" | "fact";

interface Q {
  q: string;
  answer: Pick;
  why: string;
}

const QUESTIONS: Q[] = [
  {
    q: "Great communicators are born, not made.",
    answer: "myth",
    why: "It's reps, not genetics. Every “natural” speaker has a decade of awkward practice you never saw.",
  },
  {
    q: "Jumping on a quick call is always faster than sending a message.",
    answer: "myth",
    why: "Calls shatter deep work for everyone invited. Async first; call when it's nuanced — or on fire.",
  },
  {
    q: "Face-to-face, tone and body language can outweigh your actual words.",
    answer: "fact",
    why: "Mehrabian's 7-38-55 finding: when words and tone mismatch, people trust the tone. (It applies to feelings, not spreadsheets.)",
  },
  {
    q: "The compliment sandwich is the gold standard for giving feedback.",
    answer: "myth",
    why: "People hear the bread and miss the filling. Be kind AND direct — that's literally what SBI is for.",
  },
];

function verdict(score: number): string {
  if (score === 4) return "Certified communication scholar. Please teach the class.";
  if (score === 3) return "Strong. HR would nod quietly and stamp your file.";
  if (score === 2) return "Survivable. A revisit to slides 03–05 is prescribed.";
  return "The group chat is officially scared of you. Retake?";
}

export default function S06Quiz(props: SlideProps) {
  const { accent } = props;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Pick | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[idx];
  const isLast = idx === QUESTIONS.length - 1;

  const answer = (p: Pick) => {
    if (picked) return;
    setPicked(p);
    if (p === q.answer) {
      setScore((s) => s + 1);
      pop(0.5, 0.55, 70);
    }
  };

  const advance = () => {
    if (isLast) {
      setDone(true);
      if (score === QUESTIONS.length) pop(0.5, 0.4, 140);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const retake = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const styleBtn = (b: Pick) => {
    const color = b === "myth" ? CORAL : LIME;
    if (!picked)
      return { borderColor: `${color}55`, background: "rgba(245,243,238,0.03)" };
    if (b === q.answer)
      return { borderColor: color, background: `${color}22`, boxShadow: `0 0 40px -10px ${color}66` };
    if (b === picked) return { borderColor: `${color}66`, background: `${color}0d` };
    return { borderColor: "rgba(245,243,238,0.08)", opacity: 0.45 };
  };

  return (
    <SlideShell {...props}>
      <div className="mx-auto w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`q-${idx}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Item i={0}>
                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-mute">
                    Myth or fact — lock it in
                  </p>
                </Item>
                <Item i={0}>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                      Q {idx + 1} / {QUESTIONS.length}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink"
                      style={{ background: accent }}
                    >
                      Score {String(score).padStart(2, "0")}
                    </span>
                  </div>
                </Item>
              </div>

              <Item i={1} className="mt-6">
                <div className="relative rounded-[1.8rem] border border-white/12 bg-ink-2/85 p-7 backdrop-blur md:p-9">
                  <Quote
                    className="absolute -top-4 left-7 h-8 w-8 rounded-xl border border-white/12 bg-ink p-1.5"
                    style={{ color: accent }}
                  />
                  <p className="font-display text-xl font-bold leading-snug md:text-[1.7rem]">
                    {q.q}
                  </p>
                  <AnimatePresence>
                    {picked && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
                        animate={{ opacity: 1, scale: 1, rotate: -8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="absolute -right-3 -top-5 rounded-lg border-4 px-4 py-1.5 font-display text-lg font-bold uppercase tracking-[0.2em]"
                        style={{
                          borderColor: picked === q.answer ? LIME : CORAL,
                          color: picked === q.answer ? LIME : CORAL,
                          background: "#0a0a0f",
                        }}
                      >
                        {picked === q.answer ? "Nailed it +1" : "Oof"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Item>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {(["myth", "fact"] as Pick[]).map((b, i) => {
                  const color = b === "myth" ? CORAL : LIME;
                  const wrongPick = picked === b && picked !== q.answer;
                  return (
                    <motion.button
                      key={b}
                      onClick={() => answer(b)}
                      disabled={!!picked}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0, x: wrongPick ? [0, -9, 9, -6, 6, 0] : 0 }}
                      transition={{
                        delay: 0.2 + i * 0.07,
                        duration: wrongPick ? 0.4 : 0.45,
                        ease: EASE,
                      }}
                      whileHover={!picked ? { y: -3, scale: 1.015 } : undefined}
                      whileTap={!picked ? { scale: 0.97 } : undefined}
                      className={`flex items-center justify-center gap-3 rounded-2xl border-2 px-6 py-5 font-display text-xl font-bold uppercase tracking-[0.14em] md:text-2xl ${
                        picked ? "cursor-default" : "cursor-pointer"
                      }`}
                      style={{ ...styleBtn(b), color }}
                    >
                      {b === "myth" ? <X className="h-6 w-6" /> : <Check className="h-6 w-6" />}
                      {b}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-5 min-h-[92px]">
                <AnimatePresence>
                  {picked && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border-l-4 bg-white/[0.04] p-4"
                      style={{ borderColor: accent }}
                    >
                      <p className="max-w-lg text-sm leading-relaxed text-white/70">{q.why}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={advance}
                        className="group inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink"
                        style={{ background: accent }}
                      >
                        {isLast ? "See my score" : "Next question"}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-center rounded-[1.8rem] border border-white/12 bg-ink-2/85 p-10 text-center backdrop-blur"
            >
              <Trophy className="h-10 w-10" style={{ color: accent }} />
              <p className="mt-4 font-display text-[11px] font-bold uppercase tracking-[0.3em] text-mute">
                Final score
              </p>
              <p className="mt-2 font-display text-7xl font-bold leading-none md:text-8xl">
                {score}
                <span className="text-3xl text-white/35 md:text-4xl">/{QUESTIONS.length}</span>
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                {verdict(score)}
              </p>
              <div className="mt-2 flex gap-1.5">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-8 rounded-full"
                    style={{ background: i < score ? accent : "rgba(245,243,238,0.12)" }}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={retake}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] transition hover:border-white/50"
              >
                <RotateCcw className="h-4 w-4" style={{ color: accent }} />
                Run it back
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideShell>
  );
}
