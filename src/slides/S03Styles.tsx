import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Flame, Ghost, MousePointerClick, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CORAL, CYAN, GOLD, LIME } from "../lib/palette";
import { Caveat, EASE, Headline, Item, SlideShell, type SlideProps } from "../components/ui";

interface StyleCard {
  key: string;
  name: string;
  icon: LucideIcon;
  color: string;
  flag: string;
  goal?: boolean;
  quote: string;
  diag: string;
  fix: string;
}

const CARDS: StyleCard[] = [
  {
    key: "passive",
    name: "PASSIVE",
    icon: Cloud,
    color: CYAN,
    flag: "RED FLAG",
    quote: "“Whatever works for you guys…”",
    diag: "Ideas stay locked in the notes app. Conflict avoided — value avoided too.",
    fix: "“I have a thought — can I add something?”",
  },
  {
    key: "aggressive",
    name: "AGGRESSIVE",
    icon: Flame,
    color: CORAL,
    flag: "RED FLAG",
    quote: "“Wrong. Do it again.”",
    diag: "Wins the argument, loses the people. Meetings go quiet — the bad kind of quiet.",
    fix: "“I disagree — here's my reasoning.”",
  },
  {
    key: "passagg",
    name: "PASSIVE-AGGR.",
    icon: Ghost,
    color: GOLD,
    flag: "RED FLAG",
    quote: "“Sure, per your interesting idea…”",
    diag: "Sarcasm plus read receipts. Nobody ever knows where they stand.",
    fix: "Name the actual issue. Kindly. Out loud.",
  },
  {
    key: "assertive",
    name: "ASSERTIVE",
    icon: Target,
    color: LIME,
    flag: "GREEN FLAG",
    goal: true,
    quote: "“I see it differently — here's my take.”",
    diag: "Clear and respectful. Says the hard thing without making it weird.",
    fix: "This is the whole game — unlock it with slides 04–07.",
  },
];

function FlipCard({ card, i }: { card: StyleCard; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const c = card.color;
  return (
    <Item i={2 + i} className="h-[290px] md:h-[320px]">
      <div
        className="flip-scene h-full cursor-pointer"
        onClick={() => setFlipped((f) => !f)}
        role="button"
        aria-label={`Flip ${card.name} card`}
      >
        <motion.div
          className="flip-inner relative h-full w-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {/* FRONT */}
          <div
            className="flip-face absolute inset-0 flex flex-col rounded-2xl border bg-ink-2/85 p-5 backdrop-blur"
            style={{
              borderColor: card.goal ? `${c}88` : "rgba(245,243,238,0.12)",
              boxShadow: card.goal ? `0 0 44px -12px ${c}44` : undefined,
            }}
          >
            {card.goal && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-display text-[9px] font-bold uppercase tracking-[0.22em] text-ink"
                style={{ background: c }}
              >
                The goal
              </span>
            )}
            <span
              className="grid h-12 w-12 place-items-center rounded-xl"
              style={{ background: `${c}1a`, border: `1px solid ${c}44` }}
            >
              <card.icon className="h-6 w-6" style={{ color: c }} strokeWidth={2.2} />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight md:text-[1.35rem]">
              {card.name}
            </h3>
            <p className="mt-3 flex-1 text-[0.95rem] italic leading-relaxed text-white/70">
              {card.quote}
            </p>
            <span
              className="mt-2 inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ color: c }}
            >
              <MousePointerClick className="h-3.5 w-3.5" />
              Tap — see the fix
            </span>
          </div>

          {/* BACK */}
          <div
            className="flip-face absolute inset-0 flex flex-col rounded-2xl border p-5 [transform:rotateY(180deg)]"
            style={{ background: `${c}14`, borderColor: `${c}55` }}
          >
            <span
              className="inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.22em]"
              style={{ borderColor: `${c}66`, color: c }}
            >
              {card.flag}
            </span>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/75">{card.diag}</p>
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="font-display text-[9px] font-bold uppercase tracking-[0.26em] text-mute">
                Say it instead
              </p>
              <p className="mt-1.5 font-display text-[0.95rem] font-bold leading-snug" style={{ color: c }}>
                {card.fix}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Item>
  );
}

export default function S03Styles(props: SlideProps) {
  const { accent } = props;
  return (
    <SlideShell {...props}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_2.1fr] lg:gap-12">
        <div className="flex flex-col justify-center">
          <Item i={0}>
            <Caveat color={accent}>one message, four personalities</Caveat>
          </Item>
          <Item i={1} className="mt-2">
            <Headline>
              SAME POINT.
              <br />
              FOUR WAYS TO
              <br />
              <span style={{ color: accent }}>DELIVER IT.</span>
            </Headline>
          </Item>
          <Item i={2} className="mt-6 max-w-sm">
            <p className="text-sm leading-relaxed text-white/55 md:text-base">
              Most of us cycle through all four styles inside a single group project.
              Spot the pattern, steal the upgrade — flip each card.
            </p>
          </Item>
          <Item i={3} className="mt-6">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3">
              <Target className="h-5 w-5" style={{ color: LIME }} />
              <p className="text-xs leading-snug text-white/60">
                <span className="font-display font-bold text-paper">Spoiler:</span> assertive
                is the only one that scales — with grades, jobs and friendships.
              </p>
            </div>
          </Item>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((card, i) => (
            <FlipCard key={card.key} card={card} i={i} />
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
