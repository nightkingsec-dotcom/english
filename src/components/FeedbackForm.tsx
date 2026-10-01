import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, Star, X } from "lucide-react";
import { useState } from "react";
import { EASE } from "./ui";

interface FeedbackFormProps {
  open: boolean;
  accent: string;
  onClose: () => void;
}

const QUESTIONS = [
  {
    id: "overall",
    label: "Overall session rating",
    type: "stars" as const,
  },
  {
    id: "content",
    label: "How useful was the content?",
    type: "stars" as const,
  },
  {
    id: "delivery",
    label: "How engaging was the delivery?",
    type: "stars" as const,
  },
  {
    id: "best",
    label: "What was the best part of the session?",
    type: "text" as const,
    placeholder: "The jargon decoder was 🔥",
  },
  {
    id: "improve",
    label: "What could we do better next time?",
    type: "text" as const,
    placeholder: "More interactive segments, fewer slides…",
  },
  {
    id: "takeaway",
    label: "What's your #1 takeaway from today?",
    type: "text" as const,
    placeholder: "Assume positive intent before replying…",
  },
];

type Answers = Record<string, string | number>;

function StarRating({
  value,
  onChange,
  accent,
}: {
  value: number;
  onChange: (v: number) => void;
  accent: string;
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${s} star${s > 1 ? "s" : ""}`}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            className="h-8 w-8"
            fill={s <= display ? accent : "transparent"}
            strokeWidth={1.8}
            style={{ color: s <= display ? accent : "rgba(255,255,255,0.25)" }}
          />
        </button>
      ))}
    </div>
  );
}

export function FeedbackForm({ open, accent, onClose }: FeedbackFormProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (id: string, val: string | number) =>
    setAnswers((prev) => ({ ...prev, [id]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submit (store to localStorage for the demo)
    setTimeout(() => {
      try {
        const existing = JSON.parse(
          localStorage.getItem("ttw_feedback") ?? "[]"
        ) as Answers[];
        existing.push({ ...answers, _ts: Date.now() });
        localStorage.setItem("ttw_feedback", JSON.stringify(existing));
      } catch (_) {}
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleClose = () => {
    onClose();
    // Reset after exit animation
    setTimeout(() => {
      setSubmitted(false);
      setAnswers({});
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-xl"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="no-scrollbar relative z-10 w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-ink-2 shadow-2xl"
            style={{
              maxHeight: "90vh",
              boxShadow: `0 40px 120px -20px ${accent}33`,
            }}
          >
            {/* header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-white/[0.07] bg-ink-2/95 px-7 py-5 backdrop-blur"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: accent,
                      boxShadow: `0 0 12px ${accent}`,
                    }}
                  />
                  <span
                    className="font-display text-[10px] font-bold uppercase tracking-[0.32em]"
                    style={{ color: accent }}
                  >
                    Talk That Works · Feedback
                  </span>
                </div>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
                  How'd we do?
                </h2>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close feedback form"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-white/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* body */}
            <div className="px-7 pb-8 pt-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex flex-col items-center gap-5 py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                    >
                      <CheckCircle2
                        className="h-16 w-16"
                        style={{ color: accent }}
                      />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-2xl font-bold">
                        Thanks — you're the best
                        <span style={{ color: accent }}>.</span>
                      </h3>
                      <p className="mt-2 text-sm text-white/55">
                        Your feedback is saved. We'll read every word, we
                        promise.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-2 rounded-full px-7 py-3 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink"
                      style={{ background: accent }}
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {QUESTIONS.map((q, idx) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.05 + idx * 0.06,
                          duration: 0.45,
                          ease: EASE,
                        }}
                      >
                        <label className="mb-3 block font-display text-sm font-bold tracking-wide">
                          {q.label}
                          {q.type === "stars" && (
                            <span
                              className="ml-2 font-normal"
                              style={{ color: accent }}
                            >
                              {answers[q.id] ? `${answers[q.id]}/5` : ""}
                            </span>
                          )}
                        </label>
                        {q.type === "stars" ? (
                          <StarRating
                            value={(answers[q.id] as number) ?? 0}
                            onChange={(v) => set(q.id, v)}
                            accent={accent}
                          />
                        ) : (
                          <textarea
                            rows={3}
                            placeholder={q.placeholder}
                            value={(answers[q.id] as string) ?? ""}
                            onChange={(e) => set(q.id, e.target.value)}
                            className="w-full resize-none rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-paper placeholder:text-white/25 focus:border-white/30 focus:outline-none transition-colors"
                            style={
                              {
                                "--tw-ring-color": accent,
                              } as React.CSSProperties
                            }
                          />
                        )}
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4, ease: EASE }}
                      className="flex items-center justify-between gap-4 border-t border-white/[0.07] pt-6"
                    >
                      <p className="text-xs text-white/35">
                        Responses are saved locally — completely anonymous.
                      </p>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.03] active:scale-[0.97] disabled:opacity-60"
                        style={{
                          background: accent,
                          boxShadow: `0 10px 36px -8px ${accent}66`,
                        }}
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        {loading ? "Sending…" : "Submit feedback"}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
