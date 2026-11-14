import type { LucideIcon } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

// Full class names (not built from pieces) so Tailwind can find them.
const ACCENTS = {
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

type AboutCardProps = {
  title: string
  /** One entry per paragraph. */
  paragraphs: readonly string[]
  icon: LucideIcon
  accent: Accent
  /** h2 for the main card, h3 for the cards under the same section. */
  heading?: 'h2' | 'h3'
  /** Centered text in every size. Without it the card is centered on small screens and start-aligned from `lg`. */
  centered?: boolean
  /** Line up the text on both sides (right and left edge). */
  justify?: boolean
  /** Delay (ms) before the pop starts, to stagger neighbouring cards. */
  delay?: number
  className?: string
}

/**
 * Framed card: colored top line, soft corner glow, icon chip, title, thin divider and text.
 * It pops in when it scrolls into view and lifts a little on hover.
 */
function AboutCard({
  title,
  paragraphs,
  icon: Icon,
  accent,
  heading: Heading = 'h3',
  centered = false,
  justify = false,
  delay = 0,
  className = '',
}: AboutCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const look = ACCENTS[accent]
  const isMain = Heading === 'h2'

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:p-5 dark:border-slate-700/70 dark:bg-slate-900/50 ${look.hover} ${
        centered ? 'text-center' : 'text-center lg:text-start'
      } ${inView ? 'animate-pop' : 'opacity-0'} ${className}`}
    >
      {/* Colored line along the top edge. */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent ${look.line} to-transparent opacity-70`}
      />
      {/* Soft glow in the corner; it brightens on hover. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -end-12 -top-12 size-36 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35 dark:opacity-20 ${look.glow}`}
      />

      <div
        className={`relative flex flex-col items-center gap-2 ${centered ? '' : 'lg:flex-row lg:gap-3'}`}
      >
        <span
          className={`inline-flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 ${look.chip}`}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <Heading
          className={`font-title font-bold ${isMain ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}
        >
          {title}
        </Heading>
      </div>

      <div
        aria-hidden="true"
        className={`relative my-3 h-px w-full bg-linear-to-r from-transparent ${look.divider} to-transparent`}
      />

      <div
        className={`relative space-y-3 text-sm leading-7 text-pretty text-slate-600 md:text-base md:leading-8 dark:text-slate-300 ${
          justify ? 'text-justify' : ''
        }`}
      >
        {/* dir="auto": Persian stays RTL; Latin placeholder text keeps its punctuation in place. */}
        {paragraphs.map((text) => (
          <p key={text} dir="auto">
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}

export default AboutCard
