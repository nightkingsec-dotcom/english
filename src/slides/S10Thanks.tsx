import { motion } from "framer-motion";
import { Asterisk, MessageCircleQuestion, PartyPopper } from "lucide-react";
import { AccentButton, GhostButton, Item, Kicker, type SlideProps } from "../components/ui";
import { cannons } from "../lib/confetti";
import hero from "../assets/talk-hero.jpg";

const NAMES = ["ASHIB", "PAVAN", "BHARATH", "PRAMOD", "JEEVAN S."];

export default function S10Thanks({ accent, kicker, tag }: SlideProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <div
        aria-hidden
        className="text-stroke-soft pointer-events-none absolute -bottom-16 -left-6 select-none whitespace-nowrap font-display font-bold italic leading-none"
        style={{ fontSize: "clamp(12rem, 30vw, 34rem)" }}
      >
        Q&amp;A
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
        animate={{ opacity: 1, rotate: -7 }}
        transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[5%] top-[14%] hidden w-44 lg:block xl:w-52"
      >
        <div className="animate-float overflow-hidden rounded-3xl border border-white/12 shadow-2xl" style={{ boxShadow: `0 30px 90px -20px ${accent}55` }}>
          <img src={hero} alt="" className="aspect-square w-full object-cover" />
        </div>
        <p className="mt-3 -rotate-2 text-center font-hand text-xl" style={{ color: accent }}>
          this deck's spirit animal
        </p>
      </motion.div>

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 pt-6 md:px-12 md:pt-8">
        <Kicker accent={accent}>{kicker}</Kicker>
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ borderColor: `${accent}44`, color: accent, background: `${accent}0d` }}
        >
          <tag.icon className="h-3.5 w-3.5" />
          {tag.label}
        </span>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-start justify-center px-5 pb-24 md:px-12">
        <Item i={1}>
          <h1 className="font-display font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(3.2rem,9.5vw,8.5rem)]">
            NOW IT'S
            <br />
            <span className="text-stroke">YOUR</span> TURN
            <span style={{ color: accent }}>.</span>
          </h1>
        </Item>
        <Item i={2} className="mt-6 max-w-xl">
          <p className="text-base leading-relaxed text-white/60 md:text-lg">
            Questions, hot takes and inbox horror stories — all welcome. Bonus points for
            the worst email opener you've ever received. We will be judging (kindly).
          </p>
        </Item>
        <Item i={3} className="mt-9">
          <div className="flex flex-wrap items-center gap-4">
            <AccentButton accent={accent} onClick={() => cannons()}>
              <PartyPopper className="h-4 w-4" />
              Cue the confetti
            </AccentButton>
            <GhostButton>
              <MessageCircleQuestion className="h-4 w-4" style={{ color: accent }} />
              Ask us anything
            </GhostButton>
          </div>
        </Item>
        <Item i={4} className="mt-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white/45">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-mute">
              Made with over-caffeination by
            </span>
            {NAMES.map((n, idx) => (
              <span key={n} className="flex items-center gap-3">
                <span className="font-display text-sm font-bold tracking-[0.08em] text-paper/80">
                  {n}
                </span>
                {idx < NAMES.length - 1 && (
                  <Asterisk className="h-3.5 w-3.5" style={{ color: accent }} />
                )}
              </span>
            ))}
          </div>
        </Item>
      </main>

      <div className="pointer-events-none absolute bottom-20 right-6 z-10 md:right-12">
        <motion.p
          initial={{ opacity: 0, rotate: 8 }}
          animate={{ opacity: 1, rotate: -4 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="font-hand text-4xl md:text-5xl"
          style={{ color: accent }}
        >
          fin.
        </motion.p>
      </div>
    </div>
  );
}
