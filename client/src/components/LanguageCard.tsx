import { ACCENTS } from '@/data/accents'
import type { SpokenLanguage } from '@/data/skillsData'
import { faNumber, useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'

const RADIUS = 34
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type LanguageCardProps = SpokenLanguage & { delay?: number }

/** A language I speak: a ring that fills up to the level, with the number in its middle. */
function LanguageCard({ title, native, note, level, accent, delay = 0 }: LanguageCardProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const look = ACCENTS[accent]
  const shown = useCountUp(level, inView, 1400)
  const gradientId = `lang-ring-${native}`

  return (
    <article
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:p-5 dark:border-slate-700/70 dark:bg-slate-900/50 ${look.hover} ${
        inView ? 'animate-pop' : 'opacity-0'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent ${look.line} to-transparent opacity-70`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -end-12 -top-12 size-36 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35 dark:opacity-20 ${look.glow}`}
      />

      <div
        role="progressbar"
        aria-label={`میزان تسلط به زبان ${title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level}
        className="relative size-20 shrink-0 md:size-24"
      >
        <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-violet-500)" />
              <stop offset="100%" stopColor="var(--color-fuchsia-500)" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r={RADIUS} fill="none" strokeWidth="6" className="stroke-slate-200/80 dark:stroke-slate-800" />
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            stroke={`url(#${gradientId})`}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={inView ? CIRCUMFERENCE * (1 - level / 100) : CIRCUMFERENCE}
            style={{ transitionDelay: `${delay + 150}ms` }}
            className="transition-[stroke-dashoffset] duration-[1400ms] ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-title text-lg font-bold tabular-nums md:text-xl">
          {faNumber(shown)}
          <span className="text-xs font-normal text-slate-400">٪</span>
        </span>
      </div>

      <div className="relative min-w-0">
        <h3 className="font-title text-lg font-bold md:text-xl">{title}</h3>
        <p dir="ltr" className="text-right text-xs tracking-widest text-slate-400 uppercase">
          {native}
        </p>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{note}</p>
      </div>
    </article>
  )
}

export default LanguageCard
