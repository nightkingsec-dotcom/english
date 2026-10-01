import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  MessageCircleQuestion,
  PauseCircle,
  Repeat2,
  Sparkles,
} from "lucide-react";
import { CYAN, TANG, VIOLET } from "../lib/palette";
import { EASE, Headline, Item, SlideShell, type SlideProps } from "../components/ui";

const RULES = [
  {
    icon: PauseCircle,
    name: "PAUSE",
    line: "Count two full seconds before replying. Silence isn't awkward — it's processing.",
  },
  {
    icon: MessageCircleQuestion,
    name: "PROBE",
    line: "Ask one clarifying question before your opinion: “What happened right before that?”",
  },
  {
    icon: Repeat2,
    name: "PARAPHRASE",
    line: "Play it back in your words: “So the real blocker is X — did I get that right?”",
  },
];

const SEGMENTS = [
  { k: "S", label: "SITUATION", hint: "set the scene, zero drama", color: TANG },
  { k: "B", label: "BEHAVIOR", hint: "the action — never the person", color: VIOLET },
  { k: "I", label: "IMPACT", hint: "why it actually mattered", color: CYAN },
];

function FeedbackLab({ accent }: { accent: string }) {
  const [mode, setMode] = useState<"blame" | "sbi">("sbi");
  const [hover, setHover] = useState<string | null>(null);

  const segStyle = (k: string) => {
    const seg = SEGMENTS.find((s) => s.k === k)!;
    const active = hover === k || hover === null;
    return {
      background: `${seg.color}${active ? "2e" : "14"}`,
      borderBottom: `2px solid ${seg.color}`,
      opacity: hover === null || hover === k ? 1 : 0.45,
    };
  };

  return (
    <div className="w-full rounded-[1.8rem] border border-white/12 bg-ink-2/80 p-6 backdrop-blur md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.26em]"
          style={{ color: accent }}
        >
          <Sparkles className="h-4 w-4" />
          Feedback lab
        </span>
        <div className="flex rounded-full border border-white/12 bg-white/[0.04] p-1">
          {(["blame", "sbi"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="relative rounded-full px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
              style={{ color: mode === m ? "#0a0a0f" : "rgba(245,243,238,0.55)" }}
            >
              {mode === m && (
                <motion.span
                  layoutId="lab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: accent }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10">{m === "blame" ? "Blame mode" : "SBI mode"}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 min-h-[170px]">
        <AnimatePresence mode="wait">
          {mode === "blame" ? (
            <motion.div
              key="blame"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p className="font-display text-xl font-bold leading-snug text-coral md:text-2xl">
                “You NEVER send updates. You're just unreliable.”
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Character attack", "Absolute: never", "Zero way out"].map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-coral/40 bg-coral/10 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-coral"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-white/45">
                Result: defensiveness, nothing fixed, group chat goes cold.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="sbi"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p className="font-display text-lg font-medium leading-[2.1] md:text-xl">
                “<span className="rounded-md px-1.5 py-0.5 transition-all" style={segStyle("S")}>In yesterday's client review</span>,{" "}
                <span className="rounded-md px-1.5 py-0.5 transition-all" style={segStyle("B")}>the status report went out two hours after the deadline</span>,{" "}
                <span className="rounded-md px-1.5 py-0.5 transition-all" style={segStyle("I")}>so QA had to rush and we nearly missed sign-off</span>.”
              </p>
              <p className="mt-4 font-display text-base font-bold md:text-lg" style={{ color: accent }}>
                “Can we flag blockers by 4 PM next time?”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 grid gap-2 border-t border-white/10 pt-5 sm:grid-cols-3">
        {SEGMENTS.map((s) => (
          <button
            key={s.k}
            onMouseEnter={() => setHover(s.k)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(s.k)}
            onBlur={() => setHover(null)}
            className="rounded-xl border p-3 text-left transition-all"
            style={{
              borderColor: `${s.color}${mode === "sbi" ? "44" : "22"}`,
              background: `${s.color}${mode === "sbi" ? "10" : "06"}`,
              opacity: mode === "sbi" ? 1 : 0.4,
            }}
          >
            <p className="font-display text-xs font-bold tracking-[0.18em]" style={{ color: s.color }}>
              {s.k} — {s.label}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-white/55">{s.hint}</p>
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/40">
        Behavior, not personality → they leave knowing exactly what to change.{" "}
        {mode === "sbi" ? "Hover the S-B-I chips." : "Flip back to SBI mode."}
      </p>
    </div>
  );
}

export default function S05Listen(props: SlideProps) {
  const { accent } = props;
  return (
    <SlideShell {...props}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Item i={0}>
            <p className="mb-3 font-hand text-2xl" style={{ color: accent }}>
              most people listen to reload, not to understand
            </p>
          </Item>
          <Item i={1}>
            <Headline>
              LISTEN LIKE
              <br />
              YOU <span style={{ color: accent }}>MEAN IT.</span>
            </Headline>
          </Item>
          <div className="mt-8 space-y-4">
            {RULES.map((r, i) => (
              <Item key={r.name} i={2 + i}>
                <div className="group flex items-start gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition-transform group-hover:-rotate-6"
                    style={{ background: `${accent}14`, borderColor: `${accent}44` }}
                  >
                    <r.icon className="h-5 w-5" style={{ color: accent }} strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold tracking-[0.06em]">
                      {i + 1}. {r.name}
                    </p>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-white/60">{r.line}</p>
                  </div>
                </div>
              </Item>
            ))}
          </div>
        </div>
        <Item i={3}>
          <FeedbackLab accent={accent} />
        </Item>
      </div>
    </SlideShell>
  );
}
