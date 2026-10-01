import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, LayoutGrid, Maximize, Minimize, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { SlideDef } from "../data/deck";
import { EASE } from "./ui";

interface ChromeProps {
  slides: SlideDef[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
  onToggleOverview: () => void;
}

function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  return { isFullscreen, toggle };
}

function NavBtn({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1 } : undefined}
      whileTap={!disabled ? { scale: 0.9 } : undefined}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
        disabled
          ? "cursor-not-allowed border-white/8 text-white/20"
          : "border-white/15 text-paper hover:border-white/50 hover:bg-white/[0.06]"
      }`}
    >
      {children}
    </motion.button>
  );
}

export function Chrome({ slides, index, onPrev, onNext, onJump, onToggleOverview }: ChromeProps) {
  const total = slides.length;
  const accent = slides[index].accent;
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();

  return (
    <>
      {/* progress */}
      <div className="fixed inset-x-0 top-0 z-40 h-[3px] bg-white/[0.07]">
        <motion.div
          className="h-full"
          animate={{
            width: `${((index + 1) / total) * 100}%`,
            backgroundColor: accent,
          }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ boxShadow: `0 0 18px ${accent}` }}
        />
      </div>

      {/* bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <p className="font-display text-sm font-bold tabular-nums">
              <span style={{ color: accent }}>{String(index + 1).padStart(2, "0")}</span>
              <span className="text-white/30"> / {String(total).padStart(2, "0")}</span>
            </p>
            <span className="hidden h-4 w-px bg-white/15 md:block" />
            <p className="hidden truncate font-display text-[10px] font-bold uppercase tracking-[0.28em] text-mute md:block">
              {slides[index].title}
            </p>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => onJump(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                title={s.title}
                className="group relative grid h-6 place-items-center"
              >
                <motion.span
                  className="block h-2 rounded-full"
                  animate={{
                    width: i === index ? 22 : 8,
                    backgroundColor: i === index ? s.accent : "rgba(245,243,238,0.22)",
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                  whileHover={{ backgroundColor: i === index ? s.accent : "rgba(245,243,238,0.55)" }}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <p className="hidden items-center gap-2 text-[10px] text-white/35 xl:flex">
              <kbd className="rounded-md border border-white/15 bg-white/[0.05] px-1.5 py-0.5 font-bold">←</kbd>
              <kbd className="rounded-md border border-white/15 bg-white/[0.05] px-1.5 py-0.5 font-bold">→</kbd>
              to move
              <span className="ml-2" />
              <kbd className="rounded-md border border-white/15 bg-white/[0.05] px-1.5 py-0.5 font-bold">O</kbd>
              outline
            </p>
            <NavBtn onClick={onPrev} disabled={index === 0} label="Previous slide">
              <ArrowLeft className="h-4 w-4" />
            </NavBtn>
            <NavBtn onClick={onNext} disabled={index === total - 1} label="Next slide">
              <ArrowRight className="h-4 w-4" />
            </NavBtn>
            <NavBtn onClick={onToggleOverview} label="Outline view">
              <LayoutGrid className="h-4 w-4" />
            </NavBtn>
            <NavBtn onClick={toggleFullscreen} label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
              {isFullscreen
                ? <Minimize className="h-4 w-4" />
                : <Maximize className="h-4 w-4" />}
            </NavBtn>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- overview / outline mode ---------------- */

interface OverviewProps {
  open: boolean;
  slides: SlideDef[];
  index: number;
  onClose: () => void;
  onJump: (i: number) => void;
}

export function Overview({ open, slides, index, onClose, onJump }: OverviewProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50"
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-xl" onClick={onClose} />
          <div className="no-scrollbar relative z-10 mx-auto h-full max-w-[1400px] overflow-y-auto px-5 py-8 md:px-10 md:py-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-mute">
                  The outline — press O to toggle
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Ten slides. Zero filler.
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/55">
                  Maps 1:1 into PowerPoint, Canva or Prezi — every card below is a slide,
                  with its key points and its interactive segment tagged.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close outline"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid gap-4 pb-16 sm:grid-cols-2 xl:grid-cols-3">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.035, duration: 0.45, ease: EASE }}
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      onJump(i);
                      onClose();
                    }}
                    className="group relative overflow-hidden rounded-2xl border bg-ink-2/90 p-5 text-left transition-colors"
                    style={{ borderColor: active ? `${s.accent}88` : "rgba(245,243,238,0.1)" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="font-display text-3xl font-bold tabular-nums"
                        style={{ color: s.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {active && (
                        <span
                          className="rounded-full px-2.5 py-1 font-display text-[9px] font-bold uppercase tracking-[0.2em] text-ink"
                          style={{ background: s.accent }}
                        >
                          You are here
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug">{s.title}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs leading-snug text-white/55">
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: s.accent }}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div
                      className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                      style={{ borderColor: `${s.accent}44`, background: `${s.accent}0d` }}
                    >
                      <s.tag.icon className="h-3.5 w-3.5" style={{ color: s.accent }} />
                      <span
                        className="font-display text-[9px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: s.accent }}
                      >
                        {s.interaction}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className="text-stroke-soft pointer-events-none absolute -bottom-7 -right-3 select-none font-display text-8xl font-bold italic leading-none opacity-70"
                    >
                      {s.bgWord}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
