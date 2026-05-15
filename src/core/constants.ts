/**
 * Project-wide constants — semantic names for things that were previously
 * sprinkled around as raw literals (CSS color strings in TS, magic-number
 * timeouts, primary action IDs).
 *
 * Add new entries here when a value is repeated in 3+ places.
 */

/**
 * Semantic palette for log entries and dialogue lines. The values resolve to
 * the same CSS variables that the literals used before — visual is
 * unchanged. Picking by semantic now lets the theme change in one place.
 */
export const LOG_COLOR = {
  /** Positive outcome — completed action, gained item, intro slide. */
  success: 'var(--accent-teal)',
  /** Negative outcome — failed action, blocked by requirement, malus. */
  failure: 'var(--accent-red)',
  /** Notable / rewarding event — unlocks, milestones, awarded titles. */
  notable: 'var(--gold)',
  /** Quiet system note — focus stopped, item removed, low-importance state. */
  muted:   'var(--text-muted)',
  /** Same role as `muted` but reads slightly louder; used for some focus
   *  state messages. Kept as a separate slot until we decide it's the same. */
  dim:     'var(--text-dim)',
  /** Story / dialogue accent (chronicle entries, narrative beats). */
  story:   'var(--accent-ivory)',
  /** Plain default text colour — for non-themed neutral output. */
  default: 'var(--text-main)',
} as const;

export type LogColorKey = keyof typeof LOG_COLOR;

/**
 * Short UI animations whose durations are spread across setTimeout calls.
 * All durations are in milliseconds and intentionally line up with the
 * matching CSS animation/transition values.
 *
 * If you change one of these, also check the corresponding CSS keyframes /
 * transitions so the JS cleanup runs after the animation actually finishes.
 */
export const ANIM = {
  /** Quick button-flash highlight (devtools save buttons etc.). */
  flash: 400,
  /** Shake on failed action attempt. */
  shake: 400,
  /** Toast notification slide-out. */
  toast: 500,
  /** Generic short pulse / fade. */
  pulse: 600,
} as const;

/**
 * The three primary "rest / meditate / eat" actions, in F1/F2/F3 hotkey order.
 * Used by the input system for keybindings AND by main.view.html as the
 * x-for source for the top action bar — keep them in sync via this constant.
 */
export const PRIMARY_ACTIONS = ['act-rest', 'act-meditate', 'act-eat'] as const;
export type PrimaryActionId = (typeof PRIMARY_ACTIONS)[number];
