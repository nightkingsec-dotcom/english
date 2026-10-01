import { useState } from "react";
import { motion } from "framer-motion";
import {
  Apple,
  BellRing,
  Hourglass,
  Mail,
  MousePointerClick,
  PhoneOff,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Caveat, Headline, Item, SlideShell, type SlideProps } from "../components/ui";

interface Jargon {
  icon: LucideIcon;
  say: string;
  mean: string;
}

const ITEMS: Jargon[] = [
  { icon: Mail, say: "“Per my last email…”", mean: "Please. Read. The. Email." },
  { icon: PhoneOff, say: "“Let's take this offline.”", mean: "Stop talking. We'll deal with it later." },
  { icon: BellRing, say: "“Gentle reminder…”", mean: "This is reminder #3. I'm tired." },
  { icon: Rocket, say: "“Moving forward…”", mean: "Never, ever do that again." },
  { icon: Apple, say: "“Low-hanging fruit.”", mean: "The easy win nobody bothered to pick." },
  { icon: Hourglass, say: "“Quick sync?”", mean: "A 47-minute meeting. Bring snacks." },
];

function DecodeCard({ j, i, accent }: { j: Jargon; i: number; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Item i={2 + i} className="h-40 md:h-44">
      <div
        role="button"
        aria-label={`Translate ${j.say}`}
        onClick={() => setOpen((o) => !o)}
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/12 bg-ink-2/85 backdrop-blur transition-colors hover:border-white/30"
      >
        {/* front */}
        <div className="flex h-full flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-[9px] font-bold uppercase tracking-[0.26em] text-mute">
              Corporate says
            </span>
            <j.icon className="h-5 w-5 text-white/35 transition group-hover:text-white/70" strokeWidth={2.2} />
          </div>
          <p className="mt-auto font-display text-lg font-bold leading-tight md:text-xl">{j.say}</p>
          <span
            className="mt-3 inline-flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] transition-opacity"
            style={{ color: accent, opacity: open ? 0 : 1 }}
          >
            <MousePointerClick className="h-3.5 w-3.5 animate-pulse" />
            Tap to translate
          </span>
        </div>
        {/* reveal */}
        <motion.div
          initial={false}
          animate={{ y: open ? "0%" : "102%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex flex-col p-5 text-ink"
          style={{ background: accent }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-[9px] font-bold uppercase tracking-[0.26em] text-ink/60">
              Actually means
            </span>
            <j.icon className="h-5 w-5 text-ink/50" strokeWidth={2.4} />
          </div>
          <p className="mt-auto font-display text-xl font-bold leading-tight md:text-[1.35rem]">
            {j.mean}
          </p>
        </motion.div>
      </div>
    </Item>
  );
}

export default function S04Decoder(props: SlideProps) {
  const { accent } = props;
  return (
    <SlideShell {...props}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Item i={0}>
            <Caveat color={accent}>warning: your future inbox, decoded</Caveat>
          </Item>
          <Item i={1} className="mt-2">
            <Headline>
              OFFICE-SPEAK,
              <br />
              <span style={{ color: accent }}>TRANSLATED.</span>
            </Headline>
          </Item>
        </div>
        <Item i={2} className="max-w-sm pb-2">
          <p className="text-sm leading-relaxed text-white/55 md:text-base">
            Jargon is camouflage for simple thoughts. Learn to decode it now — future
            coworkers will think you have superpowers.
          </p>
        </Item>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ITEMS.map((j, i) => (
          <DecodeCard key={j.say} j={j} i={i} accent={accent} />
        ))}
      </div>

      <Item i={8} className="mt-8">
        <p className="text-sm text-white/50 md:text-base">
          Golden rule:{" "}
          <Caveat color={accent} className="mx-1">
            if you wouldn't say it to a friend, rewrite it.
          </Caveat>{" "}
          Every email passes the friend test, or it stays in drafts.
        </p>
      </Item>
    </SlideShell>
  );
}
