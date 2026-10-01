import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCheck,
  ChevronLeft,
  Phone,
  RotateCcw,
  Timer,
  Video,
} from "lucide-react";
import { CORAL, CYAN, GOLD, LIME, VIOLET } from "../lib/palette";
import { pop } from "../lib/confetti";
import { EASE, Headline, Item, SlideShell, type SlideProps } from "../components/ui";

interface Choice {
  key: string;
  text: string;
  stamp: string;
  stampColor: string;
  outcome: string;
}

const CHOICES: Choice[] = [
  {
    key: "A",
    text: "Call her out in the group: “Reply in 10 minutes or we're telling the professor.”",
    stamp: "RISKY MOVE",
    stampColor: CORAL,
    outcome:
      "Public pressure reads as an attack. Priya goes fully dark, trust drops to zero, and the professor gets a 9 AM soap opera instead of a project.",
  },
  {
    key: "B",
    text: "Say nothing. Quietly build her entire part yourself tonight.",
    stamp: "MARTYR MODE",
    stampColor: GOLD,
    outcome:
      "Heroic tonight, toxic pattern forever. You get three hours of sleep; she learns that ghosting works. Repeat every semester.",
  },
  {
    key: "C",
    text: "DM privately: “Hey — everything okay? We need the charts by 7 AM. Can you take it, or should we split it?”",
    stamp: "PRO MOVE",
    stampColor: LIME,
    outcome:
      "Private + specific + an escape hatch. Charts land by 07:40, friendship intact, and nobody's reputation gets speed-run.",
  },
];

function HuddleTimer({ accent }: { accent: string }) {
  const [left, setLeft] = useState(60);
  const [running, setRunning] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          window.clearInterval(t);
          setRunning(false);
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (left === 0 && !running && !fired.current) {
      fired.current = true;
      pop(0.85, 0.55, 60);
    }
    if (left > 0) fired.current = false;
  }, [left, running]);

  const toggle = () => {
    if (left === 0) {
      setLeft(60);
      setRunning(true);
      return;
    }
    setRunning((r) => !r);
  };

  const reset = () => {
    setRunning(false);
    setLeft(60);
  };

  const pct = (left / 60) * 100;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4">
      <div className="min-w-0">
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.26em] text-mute">
          60-second huddle
        </p>
        <p className="mt-1 text-sm leading-snug text-white/70">
          What would <span className="font-bold text-paper">you</span> actually type? Compare
          with your neighbor.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(245,243,238,0.1)" strokeWidth="3.5" />
            <motion.circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke={accent}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="97.4"
              animate={{ strokeDashoffset: 97.4 - (97.4 * pct) / 100 }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-xs font-bold tabular-nums">
            {left}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink"
          style={{ background: accent }}
        >
          <Timer className="h-3.5 w-3.5" />
          {left === 0 ? "Go again" : running ? "Pause" : "Start"}
        </motion.button>
        <button
          onClick={reset}
          aria-label="Reset timer"
          className="rounded-full border border-white/15 p-2 text-white/50 transition hover:border-white/40 hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function S07Scenario(props: SlideProps) {
  const { accent } = props;
  const [picked, setPicked] = useState<string | null>(null);
  const choice = CHOICES.find((c) => c.key === picked) ?? null;

  return (
    <SlideShell {...props}>
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* phone mock */}
        <Item i={2} className="hidden md:block">
          <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-white/12 bg-ink-2/90 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <ChevronLeft className="h-4 w-4 text-white/40" />
              <div className="flex -space-x-2">
                {[
                  { l: "Y", c: CYAN },
                  { l: "P", c: GOLD },
                  { l: "A", c: VIOLET },
                ].map((a) => (
                  <span
                    key={a.l}
                    className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink font-display text-[10px] font-bold text-ink"
                    style={{ background: a.c }}
                  >
                    {a.l}
                  </span>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold">final-project-squad</p>
                <p className="text-[10px] text-mute">4 members · 1 ghost</p>
              </div>
              <Phone className="h-4 w-4 text-white/40" />
              <Video className="h-4 w-4 text-white/40" />
            </div>
            <div className="space-y-3 px-5 py-5">
              <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3">
                <p className="font-display text-[10px] font-bold tracking-widest" style={{ color: CYAN }}>
                  ARJUN
                </p>
                <p className="mt-0.5 text-sm text-white/85">Priya did you finish the charts??</p>
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3">
                <p className="font-display text-[10px] font-bold tracking-widest" style={{ color: VIOLET }}>
                  MEERA
                </p>
                <p className="mt-0.5 text-sm text-white/85">presentation slot is booked for 9 AM…</p>
              </div>
              <div className="flex items-center justify-end gap-1.5 text-[10px] text-white/40">
                <CheckCheck className="h-3.5 w-3.5" style={{ color: accent }} />
                Priya — read 23:02
              </div>
              <div className="flex justify-center pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-coral/40 bg-coral/10 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-coral">
                  <AlertTriangle className="h-3 w-3" />
                  Deadline · tomorrow 09:00
                </span>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-white/30">
                Your reply goes here…
              </div>
            </div>
          </div>
        </Item>

        {/* decision block */}
        <div>
          <Item i={0}>
            <p className="mb-3 font-hand text-2xl" style={{ color: accent }}>
              23:47 · tomorrow 09:00 · heart rate: rising
            </p>
          </Item>
          <Item i={1}>
            <Headline>
              THE GROUP CHAT
              <br />
              <span style={{ color: accent }}>INCIDENT.</span>
            </Headline>
          </Item>
          <Item i={2} className="mt-4 max-w-xl">
            <p className="text-sm leading-relaxed text-white/60 md:text-base">
              Priya has read every message and delivered precisely nothing. The chat is
              heating up. Pick your reply — then defend your choice.
            </p>
          </Item>

          <div className="mt-6 space-y-2.5">
            {CHOICES.map((c, i) => {
              const active = picked === c.key;
              return (
                <Item key={c.key} i={3 + i}>
                  <motion.button
                    onClick={() => setPicked(active ? null : c.key)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex w-full items-start gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors"
                    style={{
                      borderColor: active ? c.stampColor : "rgba(245,243,238,0.12)",
                      background: active ? `${c.stampColor}12` : "rgba(245,243,238,0.02)",
                      boxShadow: active ? `0 0 36px -14px ${c.stampColor}` : undefined,
                    }}
                  >
                    <span
                      className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg font-display text-sm font-bold"
                      style={{
                        background: active ? c.stampColor : "rgba(245,243,238,0.08)",
                        color: active ? "#0a0a0f" : "#f5f3ee",
                      }}
                    >
                      {c.key}
                    </span>
                    <span className="text-sm leading-relaxed text-white/80 md:text-[0.95rem]">
                      {c.text}
                    </span>
                  </motion.button>
                </Item>
              );
            })}
          </div>

          <div className="mt-4 min-h-[120px]">
            <AnimatePresence mode="wait">
              {choice ? (
                <motion.div
                  key={choice.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex items-start gap-5 rounded-2xl border border-white/12 bg-ink-2/80 p-5"
                >
                  <span
                    className="mt-1 inline-block -rotate-6 shrink-0 rounded-lg border-4 px-3 py-1.5 font-display text-sm font-bold uppercase tracking-[0.16em] md:text-base"
                    style={{ borderColor: choice.stampColor, color: choice.stampColor }}
                  >
                    {choice.stamp}
                  </span>
                  <p className="text-sm leading-relaxed text-white/70">{choice.outcome}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid min-h-[110px] place-items-center rounded-2xl border border-dashed border-white/15 text-sm text-white/35"
                >
                  Pick a move — we'll show you how it plays out.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Item i={6} className="mt-4">
            <HuddleTimer accent={accent} />
          </Item>
        </div>
      </div>
    </SlideShell>
  );
}
