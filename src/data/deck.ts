import type { ComponentType } from "react";
import {
  ArrowLeftRight,
  CircleHelp,
  Eye,
  GitBranch,
  Megaphone,
  MessageSquareHeart,
  PartyPopper,
  Repeat,
  Ticket,
  Users,
  Vote,
} from "lucide-react";
import type { SlideProps, SlideTag } from "../components/ui";
import S01Title from "../slides/S01Title";
import S02Why from "../slides/S02Why";
import S03Styles from "../slides/S03Styles";
import S04Decoder from "../slides/S04Decoder";
import S05Listen from "../slides/S05Listen";
import S06Quiz from "../slides/S06Quiz";
import S07Scenario from "../slides/S07Scenario";
import S08Team from "../slides/S08Team";
import S09Takeaways from "../slides/S09Takeaways";
import S10Thanks from "../slides/S10Thanks";
import S11Feedback from "../slides/S11Feedback";
// Local binding for the registry below. The `export ... from` on the next line
// only re-exports; it does not create local names.
import { CORAL, CYAN, GOLD, LIME, PINK, TANG, VIOLET } from "../lib/palette";

export { CORAL, CYAN, GOLD, LIME, PINK, TANG, VIOLET } from "../lib/palette";

export interface SlideDef {
  id: string;
  kicker: string;
  title: string;
  points: string[];
  interaction: string;
  bgWord: string;
  accent: string;
  tag: SlideTag;
  Component: ComponentType<SlideProps>;
}

export const slides: SlideDef[] = [
  {
    id: "title",
    kicker: "01 — AN INTERACTIVE SESSION",
    title: "Talk That Works",
    points: [
      "Cold open: why tone decides everything at work",
      "Meet the team & the 15-minute roadmap",
      "House rule: nobody gets to be a passive listener",
    ],
    interaction: "Opening pulse-check — keysmash energy check",
    bgWord: "HELLO",
    accent: LIME,
    tag: { icon: Megaphone, label: "Press → to start" },
    Component: S01Title,
  },
  {
    id: "why",
    kicker: "02 — WHY THIS MATTERS",
    title: "Why It Matters",
    points: [
      "86% of workplace failures blamed on poor communication",
      "Miscommunication burns real money — $37B a year",
      "Even 69% of managers dread basic conversations",
    ],
    interaction: "LIVE POLL — pick your biggest comm fear",
    bgWord: "WHY",
    accent: CYAN,
    tag: { icon: Vote, label: "Live poll" },
    Component: S02Why,
  },
  {
    id: "styles",
    kicker: "03 — THE FOUR STYLES",
    title: "The Four Styles",
    points: [
      "Passive · Aggressive · Passive-Aggressive · Assertive",
      "Same message, four wildly different deliveries",
      "Assertive = clear + kind. That's the whole game.",
    ],
    interaction: "CARD FLIP — spot the style, steal the fix",
    bgWord: "STYLE",
    accent: VIOLET,
    tag: { icon: Repeat, label: "Tap to flip" },
    Component: S03Styles,
  },
  {
    id: "decoder",
    kicker: "04 — DECODE THE JARGON",
    title: "Jargon Decoder",
    points: [
      "Corporate-speak is camouflage for simple thoughts",
      "“Per my last email” = please read the email",
      "Golden rule: say it like you'd say it to a friend",
    ],
    interaction: "REVEAL GAME — tap to translate the office-speak",
    bgWord: "DECODE",
    accent: TANG,
    tag: { icon: Eye, label: "Reveal game" },
    Component: S04Decoder,
  },
  {
    id: "listen",
    kicker: "05 — LISTEN & FEEDBACK",
    title: "Listen & The SBI Move",
    points: [
      "Listen to understand: pause → probe → paraphrase",
      "SBI feedback: Situation → Behavior → Impact",
      "Attack problems, never people",
    ],
    interaction: "MODE SWITCH — blame vs. SBI, live rewrite",
    bgWord: "LISTEN",
    accent: PINK,
    tag: { icon: ArrowLeftRight, label: "Mode switch" },
    Component: S05Listen,
  },
  {
    id: "quiz",
    kicker: "06 — MYTH VS FACT",
    title: "Myth vs Fact",
    points: [
      "Bust four sacred workplace myths in 90 seconds",
      "The 7-38-55 rule — with its actual nuance",
      "Retire the compliment sandwich",
    ],
    interaction: "QUIZ — lock answers, chase the 4/4",
    bgWord: "MYTHS",
    accent: GOLD,
    tag: { icon: CircleHelp, label: "Quiz time" },
    Component: S06Quiz,
  },
  {
    id: "scenario",
    kicker: "07 — SCENARIO SHOWDOWN",
    title: "The Group Chat Incident",
    points: [
      "Real case: the teammate who ghosted before deadline",
      "Public call-out vs. silent martyrdom vs. private DM",
      "Specific + private + an escape hatch wins",
    ],
    interaction: "YOU DECIDE — pick the reply + 60s huddle timer",
    bgWord: "CHOICE",
    accent: CORAL,
    tag: { icon: GitBranch, label: "You decide" },
    Component: S07Scenario,
  },
  {
    id: "team",
    kicker: "08 — THE TEAM",
    title: "Meet the Team",
    points: [
      "Ashib — host & narrative energy",
      "PAVAN — polls & data · Bharath — scenarios",
      "Pramod — quiz master · Jeevan S — deck & design",
    ],
    interaction: "PICK-A-MATE — spotlight each role",
    bgWord: "CREW",
    accent: "#b7a6ff",
    tag: { icon: Users, label: "The crew" },
    Component: S08Team,
  },
  {
    id: "takeaways",
    kicker: "09 — POCKET TAKEAWAYS",
    title: "Pocket Takeaways",
    points: [
      "Clarity beats cleverness, always",
      "Assume intent · match the medium · use SBI",
      "Pause, probe, paraphrase",
    ],
    interaction: "EXIT TICKET — the one-word checkout",
    bgWord: "RULES",
    accent: LIME,
    tag: { icon: Ticket, label: "Exit ticket" },
    Component: S09Takeaways,
  },
  {
    id: "thanks",
    kicker: "10 — THE FLOOR IS YOURS",
    title: "Your Turn — Q&A",
    points: [
      "The whole talk in one breath",
      "Questions, hot takes & inbox horror stories",
      "Steal these habits tomorrow morning",
    ],
    interaction: "CONFETTI BUTTON — press it, you earned it",
    bgWord: "Q&A",
    accent: CYAN,
    tag: { icon: PartyPopper, label: "Q&A" },
    Component: S10Thanks,
  },
  {
    id: "feedback",
    kicker: "11 — FEEDBACK",
    title: "How'd We Do?",
    points: [
      "Scan the QR code to open the feedback form",
      "One-minute survey — anonymous & quick",
      "Helps us shape the next session",
    ],
    interaction: "QR SCAN — two minutes, real talk",
    bgWord: "TELL US",
    accent: CYAN,
    tag: { icon: MessageSquareHeart, label: "Feedback" },
    Component: S11Feedback,
  },
];
