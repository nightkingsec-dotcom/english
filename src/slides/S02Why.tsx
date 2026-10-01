import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Banknote, RotateCcw, ShieldAlert, TrendingDown, Vote } from "lucide-react";
import { Headline, Item, SlideShell, type SlideProps } from "../components/ui";

const STATS = [
  {
    icon: TrendingDown,
    value: "86%",
    line: "of employees & executives blame workplace failures on poor communication and collaboration.",
    src: "Salesforce survey",
  },
  {
    icon: Banknote,
    value: "$37B",
    line: "estimated annual cost of employee miscommunication across US & UK enterprises.",
    src: "Holmes Report",
  },
  {
    icon: ShieldAlert,
    value: "69%",
    line: "of managers admit they're genuinely uncomfortable just talking with their own teams.",
    src: "Harvard Business Review",
  },
];

const OPTIONS = [
  { key: "A", label: "Speaking up in a room full of managers", votes: 14 },
  { key: "B", label: "Writing an email that can't be misread", votes: 23 },
  { key: "C", label: "Small talk that isn't an NPC side quest", votes: 9 },
  { key: "D", label: "Giving feedback without the ouch", votes: 16 },
];

function LivePoll({ accent }: { accent: string }) {
  const [votes, setVotes] = useState<number[] | null>(null);
  const [picked, setPicked] = useState<number | null>(null);

  const total = useMemo(
    () => (votes ? votes.reduce((a, b) => a + b, 0) : OPTIONS.reduce((a, o) => a + o.votes, 0)),
    [votes],
  );

  const cast = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setVotes(OPTIONS.map((o, idx) => o.votes + (idx === i ? 1 : 0)));
  };

  const reset = () => {
    setPicked(null);
    setVotes(null);
  };

  const current = votes ?? OPTIONS.map((o) => o.votes);
  const pickedPct = picked !== null ? Math.round((current[picked] / total) * 100) : 0;

  return (
    <div className="w-full rounded-[1.8rem] border border-white/12 bg-ink-2/80 p-6 backdrop-blur md:p-7">
      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.26em]"
          style={{ color: accent }}
        >
          <Vote className="h-4 w-4" />
          Live poll — icebreaker
        </span>
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-mute">
          {total} votes
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-bold leading-snug md:text-2xl">
        What's your biggest workplace-comm fear?
      </h3>

      <div className="mt-5 space-y-2.5">
        {OPTIONS.map((opt, i) => {
          const pct = Math.round((current[i] / total) * 100);
          const isPicked = picked === i;
          return (
            <motion.button
              key={opt.key}
              onClick={() => cast(i)}
              disabled={picked !== null}
              whileHover={picked === null ? { scale: 1.015, x: 3 } : undefined}
              whileTap={picked === null ? { scale: 0.985 } : undefined}
              className={`relative w-full overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-colors ${
                isPicked ? "border-transparent" : "border-white/12"
              } ${picked === null ? "cursor-pointer hover:border-white/35" : "cursor-default"}`}
              style={isPicked ? { borderColor: accent, boxShadow: `inset 0 0 0 1.5px ${accent}` } : undefined}
            >
              <motion.div
                aria-hidden
                initial={false}
                animate={{
                  width: picked !== null ? `${pct}%` : "0%",
                  opacity: picked !== null ? 1 : 0,
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.08 }}
                className="absolute inset-y-0 left-0"
                style={{ background: isPicked ? `${accent}33` : "rgba(245,243,238,0.07)" }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-lg font-display text-xs font-bold"
                  style={{
                    background: isPicked ? accent : "rgba(245,243,238,0.08)",
                    color: isPicked ? "#0a0a0f" : "#f5f3ee",
                  }}
                >
                  {opt.key}
                </span>
                <span className="flex-1 text-sm font-medium leading-snug text-white/85">
                  {opt.label}
                </span>
                <span
                  className="font-display text-sm font-bold tabular-nums transition-opacity duration-300"
                  style={{
                    color: isPicked ? accent : "rgba(245,243,238,0.55)",
                    opacity: picked !== null ? 1 : 0,
                  }}
                >
                  {pct}%
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 flex min-h-10 items-center justify-between gap-3">
        {picked !== null ? (
          <>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm leading-snug text-white/65"
            >
              You're in the{" "}
              <span className="font-display font-bold" style={{ color: accent }}>
                {pickedPct}%
              </span>{" "}
              — statistically very normal. We coach exactly this by slide 05.
            </motion.p>
            <button
              onClick={reset}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 transition hover:border-white/40 hover:text-white"
            >
              <RotateCcw className="h-3 w-3" />
              Re-run
            </button>
          </>
        ) : (
          <p className="text-sm text-white/40">Tap an answer — the room's stats appear.</p>
        )}
      </div>
    </div>
  );
}

export default function S02Why(props: SlideProps) {
  const { accent } = props;
  return (
    <SlideShell {...props}>
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <Item i={0}>
            <p className="mb-3 font-hand text-2xl" style={{ color: accent }}>
              first — the honest, slightly scary bit
            </p>
          </Item>
          <Item i={1}>
            <Headline>
              SILENCE IS
              <br />
              <span style={{ color: accent }}>EXPENSIVE.</span>
            </Headline>
          </Item>
          <div className="mt-8 space-y-5">
            {STATS.map((s, i) => (
              <Item key={s.value} i={2 + i}>
                <div className="group flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/[0.04] transition-transform group-hover:-rotate-6">
                    <s.icon className="h-5 w-5" style={{ color: accent }} strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="font-display text-3xl font-bold leading-none tracking-tight md:text-4xl">
                      {s.value}
                      <span className="ml-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-mute">
                        {s.src}
                      </span>
                    </p>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/60">{s.line}</p>
                  </div>
                </div>
              </Item>
            ))}
          </div>
          <Item i={5} className="mt-7">
            <p className="border-l-2 pl-4 text-sm text-white/50" style={{ borderColor: accent }}>
              Translation: how you write a Slack message is literally a budget line. Good
              news — it's a skill, and skills can be trained. Starting now.
            </p>
          </Item>
        </div>
        <Item i={3}>
          <LivePoll accent={accent} />
        </Item>
      </div>
    </SlideShell>
  );
}
