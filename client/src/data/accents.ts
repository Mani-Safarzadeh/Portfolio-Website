// Full class names (not built from pieces) so Tailwind can find them.
export const ACCENTS = {
  violet: {
    chip: 'bg-violet-500/10 text-violet-600 ring-violet-500/25 dark:text-violet-300',
    glow: 'bg-violet-500',
    line: 'via-violet-500',
    divider: 'via-violet-500/60',
    hover: 'hover:border-violet-500/40 hover:shadow-violet-500/15',
  },
  fuchsia: {
    chip: 'bg-fuchsia-500/10 text-fuchsia-600 ring-fuchsia-500/25 dark:text-fuchsia-300',
    glow: 'bg-fuchsia-500',
    line: 'via-fuchsia-500',
    divider: 'via-fuchsia-500/60',
    hover: 'hover:border-fuchsia-500/40 hover:shadow-fuchsia-500/15',
  },
  teal: {
    chip: 'bg-teal-500/10 text-teal-600 ring-teal-500/25 dark:text-teal-300',
    glow: 'bg-teal-500',
    line: 'via-teal-500',
    divider: 'via-teal-500/60',
    hover: 'hover:border-teal-500/40 hover:shadow-teal-500/15',
  },
  amber: {
    chip: 'bg-amber-500/10 text-amber-600 ring-amber-500/25 dark:text-amber-300',
    glow: 'bg-amber-500',
    line: 'via-amber-500',
    divider: 'via-amber-500/60',
    hover: 'hover:border-amber-500/40 hover:shadow-amber-500/15',
  },
  sky: {
    chip: 'bg-sky-500/10 text-sky-600 ring-sky-500/25 dark:text-sky-300',
    glow: 'bg-sky-500',
    line: 'via-sky-500',
    divider: 'via-sky-500/60',
    hover: 'hover:border-sky-500/40 hover:shadow-sky-500/15',
  },
} as const

export type Accent = keyof typeof ACCENTS
