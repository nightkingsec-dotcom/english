import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Brain, Drama, Mic, Palette, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CYAN, GOLD, LIME, PINK, VIOLET } from "../lib/palette";
import { Caveat, EASE, Headline, Item, SlideShell, type SlideProps } from "../components/ui";

interface Member {
  id: string;
  name: string;
  mono: string;
  role: string;
  icon: LucideIcon;
  color: string;
  line: string;
  stat: string;
}

const MEMBERS: Member[] = [
  {
    id: "ashib",
    name: "ASHIB",
    mono: "AS",
    role: "Host & Emcee",
    icon: Mic,
    color: LIME,
    line: "Owns the narrative arc and keeps the room's energy at mildly dangerous levels.",
    stat: "Rehearsal fuel: 9 coffees",
  },
  {
    id: "PAVAN",
    name: "PAVAN",
    mono: "PW",
    role: "Polls & Data",
    icon: BarChart3,
    color: CYAN,
    line: "Built the live polls and fact-checked every stat you just pretended not to be shocked by.",
    stat: "Poll options A/B-tested: 14",
  },
  {
    id: "bharath",
    name: "BHARATH",
    mono: "BH",
    role: "Scenario Architect",
    icon: Drama,
    color: VIOLET,
    line: "Wrote the office dilemmas that made everyone squirm — including Priya's legendary ghost act.",
    stat: "Plot twists drafted: 6",
  },
  {
    id: "pramod",
    name: "PRAMOD",
    mono: "PR",
    role: "Quiz Master",
    icon: Brain,
    color: GOLD,
    line: "Authored Myth vs. Fact and kept the whole team honest when the claims got spicy.",
    stat: "Myths officially busted: 4",
  },
  {
    id: "jeevan",
    name: "JEEVAN S.",
    mono: "JS",
    role: "Deck & Design",
    icon: Palette,
    color: PINK,
    line: "Designed the slides, the motion and the exact vibe you're currently sitting inside.",
    stat: "Slides polished: 10 / 10",
  },
];

export default function S08Team(props: SlideProps) {
  const [sel, setSel] = useState<Member>(MEMBERS[0]);

  return (
    <SlideShell {...props}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Item i={0}>
          <Headline>
            FIVE BRAINS.
            <br />
            ONE <span style={{ color: props.accent }}>DECK.</span>
          </Headline>
        </Item>
        <Item i={1} className="pb-2">
          <Caveat color={props.accent}>click around — we're interactive too</Caveat>
        </Item>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* spotlight stage */}
        <Item i={2}>
          <div className="relative h-full min-h-[300px] overflow-hidden rounded-[1.8rem] border border-white/12 bg-ink-2/85 backdrop-blur md:min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={sel.id}
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative z-10 flex h-full flex-col justify-between p-7 md:p-9"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em]"
                    style={{ borderColor: `${sel.color}55`, color: sel.color, background: `${sel.color}0f` }}
                  >
                    <sel.icon className="h-3.5 w-3.5" />
                    {sel.role}
                  </span>
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl font-display text-base font-bold text-ink md:h-14 md:w-14"
                    style={{ background: sel.color }}
                  >
                    {sel.mono}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-display text-5xl font-bold leading-none tracking-tight md:text-7xl">
                    {sel.name}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                    {sel.line}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/60"
                    style={{ borderColor: `${sel.color}66` }}
                  >
                    Field report — <span style={{ color: sel.color }}>{sel.stat}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* giant ghost monogram */}
            <AnimatePresence mode="wait">
              <motion.span
                key={sel.id}
                aria-hidden
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-stroke-soft pointer-events-none absolute -bottom-10 -right-2 select-none font-display font-bold italic leading-none"
                style={{ fontSize: "clamp(9rem, 16vw, 15rem)", WebkitTextStrokeColor: `${sel.color}55` }}
              >
                {sel.mono}
              </motion.span>
            </AnimatePresence>
          </div>
        </Item>

        {/* roster */}
        <div className="flex flex-col justify-center gap-2.5">
          {MEMBERS.map((m, i) => {
            const active = sel.id === m.id;
            return (
              <Item key={m.id} i={2 + i}>
                <motion.button
                  onClick={() => setSel(m)}
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.985 }}
                  className="flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors"
                  style={{
                    borderColor: active ? `${m.color}88` : "rgba(245,243,238,0.1)",
                    background: active ? `${m.color}10` : "rgba(245,243,238,0.02)",
                  }}
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-xs font-bold"
                    style={{
                      background: active ? m.color : `${m.color}1f`,
                      color: active ? "#0a0a0f" : m.color,
                    }}
                  >
                    {m.mono}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-bold tracking-wide">{m.name}</span>
                    <span className="block truncate text-xs text-white/50">{m.role}</span>
                  </span>
                  <m.icon
                    className="h-4.5 w-4.5 shrink-0 transition-opacity"
                    style={{ color: m.color, opacity: active ? 1 : 0.35 }}
                  />
                </motion.button>
              </Item>
            );
          })}
        </div>
      </div>

      <Item i={7} className="mt-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4">
          <Users className="h-5 w-5 shrink-0" style={{ color: props.accent }} />
          <p className="font-display text-sm font-bold md:text-base">
            Five brains. One deck. Zero meetings that could've been emails.
          </p>
          <Caveat color={props.accent} className="-rotate-2 text-xl md:text-2xl">
            that's actual synergy ↑
          </Caveat>
        </div>
      </Item>
    </SlideShell>
  );
}
