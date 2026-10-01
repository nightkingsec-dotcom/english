/**
 * Palette constants live in their own module with NO dependencies.
 *
 * This is deliberate: `data/deck.ts` imports the slide components, and the
 * slides need these colors at module-evaluation time. If the colors lived in
 * `deck.ts` we'd have a circular import, and the slides would read them before
 * initialization (temporal dead zone) -> ReferenceError -> blank screen.
 */

export const LIME = "#c8ff3d";
export const CYAN = "#4be1e6";
export const VIOLET = "#9b8cff";
export const TANG = "#ff8a3d";
export const PINK = "#ff6fa5";
export const GOLD = "#ffd23d";
export const CORAL = "#ff5d5d";

export const CONFETTI_COLORS = [LIME, CYAN, VIOLET, TANG, PINK, "#f5f3ee"];
