import QRCode from "qrcode";
import { motion } from "framer-motion";
import { MessageSquareHeart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { FeedbackForm } from "../components/FeedbackForm";
import { AccentButton, Item, Kicker, type SlideProps } from "../components/ui";
import { NGROK_URL } from "../config";

// ── What the QR encodes ──────────────────────────────────────────────────────
// If NGROK_URL is set in src/config.ts, the QR encodes that public URL.
// Otherwise falls back to the current window origin (localhost).
const getFormUrl = () => {
  const base = NGROK_URL.trim()
    ? NGROK_URL.trim().replace(/\/$/, "")
    : typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:5173";
  return `${base}#feedback`;
};

// ── QR card ──────────────────────────────────────────────────────────────────
function QRCard({ accent }: { accent: string }) {
  const [svgString, setSvgString] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setSvgString("");
    setError(false);
    const url = getFormUrl();
    QRCode.toString(url, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 2,
      color: {
        dark: accent,
        light: "#0d0d0f",
      },
    })
      .then((svg) => setSvgString(svg))
      .catch(() => setError(true));
  }, [accent]);

  return (
    <div className="relative">
      {/* glow */}
      <div
        className="absolute inset-0 rounded-3xl blur-[40px]"
        style={{ background: accent, opacity: 0.22 }}
      />
      <div
        className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#0d0d0f] p-5"
        style={{ boxShadow: `0 28px 90px -18px ${accent}44` }}
      >
        {error ? (
          <div className="flex h-44 w-44 items-center justify-center text-xs text-white/40">
            QR unavailable
          </div>
        ) : svgString ? (
          <div
            className="h-44 w-44 overflow-hidden rounded-lg md:h-52 md:w-52"
            dangerouslySetInnerHTML={{ __html: svgString }}
          />
        ) : (
          /* skeleton shimmer */
          <div className="h-44 w-44 animate-pulse rounded-lg bg-white/[0.06] md:h-52 md:w-52" />
        )}
        <p
          className="mt-4 text-center font-display text-[10px] font-bold uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          Scan · or tap the button
        </p>
      </div>
    </div>
  );
}

// ── Slide ────────────────────────────────────────────────────────────────────
const STARS = [1, 2, 3, 4, 5];

export default function S11Feedback({ accent, kicker, tag }: SlideProps) {
  const [formOpen, setFormOpen] = useState(false);

  // Auto-open if someone navigated here via the QR hash link
  useEffect(() => {
    if (window.location.hash === "#feedback") {
      setFormOpen(true);
    }
    const onHash = () => {
      if (window.location.hash === "#feedback") setFormOpen(true);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        {/* ghost word */}
        <div
          aria-hidden
          className="text-stroke-soft pointer-events-none absolute -bottom-16 -left-6 select-none whitespace-nowrap font-display font-bold italic leading-none"
          style={{ fontSize: "clamp(10rem, 24vw, 30rem)" }}
        >
          TELL US
        </div>

        <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 pt-6 md:px-12 md:pt-8">
          <Kicker accent={accent}>{kicker}</Kicker>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{
              borderColor: `${accent}44`,
              color: accent,
              background: `${accent}0d`,
            }}
          >
            <tag.icon className="h-3.5 w-3.5" />
            {tag.label}
          </span>
        </header>

        <main className="relative z-10 flex flex-1 flex-col items-start justify-center gap-10 px-5 pb-24 md:flex-row md:items-center md:px-12">
          {/* left — copy & CTA */}
          <div className="flex-1">
            <Item i={1}>
              <h1 className="font-display font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2.8rem,8vw,7.5rem)]">
                HOW'D
                <br />
                <span className="text-stroke">WE</span> DO
                <span style={{ color: accent }}>?</span>
              </h1>
            </Item>

            <Item i={2} className="mt-6 max-w-lg">
              <p className="text-base leading-relaxed text-white/60 md:text-lg">
                Two minutes, zero corporate. Scan the QR or tap below — the
                form opens right here, no redirect.
              </p>
            </Item>

            {/* decorative stars */}
            <Item i={3} className="mt-8">
              <div className="flex items-center gap-2">
                {STARS.map((s) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.3 + s * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Star className="h-7 w-7" fill={accent} style={{ color: accent }} />
                  </motion.div>
                ))}
                <span className="ml-3 font-display text-sm font-bold tracking-wide text-white/35">
                  — or so we hope
                </span>
              </div>
            </Item>

            <Item i={4} className="mt-8">
              <AccentButton accent={accent} onClick={() => setFormOpen(true)}>
                <MessageSquareHeart className="h-4 w-4" />
                Give us feedback
              </AccentButton>
            </Item>
          </div>

          {/* right — QR */}
          <Item i={2} className="shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotate: 4 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="animate-float cursor-pointer"
              onClick={() => setFormOpen(true)}
              title="Open feedback form"
            >
              <QRCard accent={accent} />
            </motion.div>
          </Item>
        </main>
      </div>

      <FeedbackForm
        open={formOpen}
        accent={accent}
        onClose={() => setFormOpen(false)}
      />
    </>
  );
}
