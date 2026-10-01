import confetti from "canvas-confetti";

export const CONFETTI_COLORS = [
  "#c8ff3d",
  "#4be1e6",
  "#9b8cff",
  "#ff8a3d",
  "#ff6fa5",
  "#f5f3ee",
];

/** Small celebratory pop at a viewport-relative position. */
export function pop(x = 0.5, y = 0.6, count = 80) {
  confetti({
    particleCount: count,
    spread: 72,
    startVelocity: 34,
    scalar: 0.9,
    ticks: 170,
    gravity: 0.9,
    origin: { x, y },
    colors: CONFETTI_COLORS,
    disableForReducedMotion: true,
  });
}

/** Big finale: side cannons + a top shower. */
export function cannons() {
  pop(0.08, 0.72, 90);
  pop(0.92, 0.72, 90);
  window.setTimeout(() => pop(0.5, 0.3, 140), 280);
  window.setTimeout(() => pop(0.3, 0.5, 60), 520);
  window.setTimeout(() => pop(0.7, 0.5, 60), 700);
}
