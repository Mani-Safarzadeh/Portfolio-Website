import SkillIconView from '@/components/SkillIconView'
import { ACCENTS } from '@/data/accents'
import type { Skill } from '@/data/skillsData'
import { faNumber, useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'

/** A word for the level, so the number has some meaning next to it. */
function levelLabel(level: number) {
  if (level >= 80) return 'پیشرفته'
  if (level >= 60) return 'مسلط'
  if (level >= 40) return 'متوسط'
  return 'در حال یادگیری'
}

type SkillCardProps = Skill & {
  /** Delay (ms) before the pop starts, to stagger neighbouring cards. */
  delay?: number
}

/**
 * One skill: icon chip, title, level word, a short description and a 0-100 bar.
 * The bar fills and the number counts up when the card scrolls into view.
 */
function SkillCard({ title, description, level, icon, accent, delay = 0 }: SkillCardProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const look = ACCENTS[accent]
  const shown = useCountUp(level, inView)

  return (
    <article
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:p-5 dark:border-slate-700/70 dark:bg-slate-900/50 ${look.hover} ${
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

      <div className="relative flex items-center gap-3">
        <span
          className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:-rotate-6 ${look.chip}`}
        >
          <SkillIconView icon={icon} />
        </span>
        <div className="min-w-0 flex-1">
          {/* dir="auto" keeps "C++" in order; text-right holds Latin names next to the icon. */}
          <h3 dir="auto" className="truncate text-right font-title text-base font-bold md:text-lg">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{levelLabel(level)}</p>
        </div>
        <span className="font-title text-lg font-bold tabular-nums text-slate-700 dark:text-slate-200">
          {faNumber(shown)}
          <span className="text-xs font-normal text-slate-400">٪</span>
        </span>
      </div>

      <p className="relative mt-3 flex-1 text-sm leading-7 text-pretty text-slate-600 dark:text-slate-300">
        {description}
      </p>

      <div
        role="progressbar"
        aria-label={`میزان تسلط به ${title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level}
        className="relative mt-4 h-2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800"
      >
        {/* Quarter marks, so the eye can read the bar without the number. */}
        <div aria-hidden="true" className="absolute inset-0 flex justify-evenly">
          {[1, 2, 3].map((mark) => (
            <span key={mark} className="h-full w-px bg-white/70 dark:bg-slate-950/60" />
          ))}
        </div>
        <div
          style={{ width: inView ? `${level}%` : '0%', transitionDelay: `${delay + 150}ms` }}
          className="relative h-full rounded-full bg-linear-to-l from-violet-500 to-fuchsia-500 shadow-[0_0_12px] shadow-fuchsia-500/50 transition-[width] duration-1000 ease-out"
        />
      </div>
    </article>
  )
}

export default SkillCard
