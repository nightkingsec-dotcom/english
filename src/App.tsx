import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { slides } from "./data/deck";
import { Chrome, Overview } from "./components/Chrome";
import { EASE } from "./components/ui";

const slideV: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "6%" : "-6%",
    opacity: 0,
    scale: 0.985,
    filter: "blur(12px)",
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "-4%" : "4%",
    opacity: 0,
    scale: 0.99,
    filter: "blur(12px)",
    transition: { duration: 0.32, ease: [0.64, 0, 0.78, 0] },
  }),
};

const blurActive = () => {
  const el = document.activeElement;
  if (el instanceof HTMLElement) el.blur();
};

export default function App() {
  const total = slides.length;
  const [state, setState] = useState<{ i: number; dir: number }>({ i: 0, dir: 1 });
  const [overview, setOverview] = useState(false);

  const goTo = useCallback(
    (n: number) => {
      const clamped = Math.max(0, Math.min(total - 1, n));
      blurActive();
      setState((s) => (clamped === s.i ? s : { i: clamped, dir: clamped > s.i ? 1 : -1 }));
    },
    [total],
  );

  const next = useCallback(() => {
    blurActive();
    setState((s) => (s.i >= total - 1 ? s : { i: s.i + 1, dir: 1 }));
  }, [total]);

  const prev = useCallback(() => {
    blurActive();
    setState((s) => (s.i <= 0 ? s : { i: s.i - 1, dir: -1 }));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        setOverview(false);
        return;
      }
      if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
        return;
      }
      if (e.key.toLowerCase() === "o") {
        blurActive();
        setOverview((o) => !o);
        return;
      }
      if (overview) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, overview, total]);

  const slide = slides[state.i];
  const Active = slide.Component;

  return (
    <div className="grain fixed inset-0 select-none overflow-hidden bg-ink text-paper">
      {/* ambient grid + color blobs */}
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[12vw] -top-[18vw] h-[48vw] w-[48vw] rounded-full blur-[140px]"
        animate={{ backgroundColor: slide.accent }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{ opacity: 0.14 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-[22vw] -right-[14vw] h-[44vw] w-[44vw] rounded-full blur-[140px]"
        animate={{ backgroundColor: slide.accent }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
        style={{ opacity: 0.1 }}
      />

      {/* slide stage */}
      <AnimatePresence mode="wait" custom={state.dir} initial={false}>
        <motion.div
          key={slide.id}
          custom={state.dir}
          variants={slideV}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-10"
        >
          <Active
            accent={slide.accent}
            kicker={slide.kicker}
            bgWord={slide.bgWord}
            tag={slide.tag}
            next={next}
          />
        </motion.div>
      </AnimatePresence>

      <Chrome
        slides={slides}
        index={state.i}
        onPrev={prev}
        onNext={next}
        onJump={goTo}
        onToggleOverview={() => setOverview((o) => !o)}
      />
      <Overview
        open={overview}
        slides={slides}
        index={state.i}
        onClose={() => setOverview(false)}
        onJump={goTo}
      />
    </div>
  );
}
