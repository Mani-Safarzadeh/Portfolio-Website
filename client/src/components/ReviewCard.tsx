import { CalendarDays } from 'lucide-react'
import Avatar from '@/components/Avatar'
import StarRating from '@/components/StarRating'
import { ACCENTS, type Accent } from '@/data/accents'
import { formatReviewDate, type Review } from '@/data/reviewsData'
import { useInView } from '@/hooks/useInView'

const ACCENT_ORDER: readonly Accent[] = ['violet', 'fuchsia', 'teal', 'amber', 'sky']

/** The same review always gets the same color, even when new reviews are added before it. */
function accentFor(id: string): Accent {
  let sum = 0
  for (const char of id) sum += char.charCodeAt(0)
  return ACCENT_ORDER[sum % ACCENT_ORDER.length] ?? 'violet'
}

type ReviewCardProps = {
  review: Review
  /** Delay (ms) before the pop starts, to stagger neighbouring cards. */
  delay?: number
}

/** One review: default avatar, name, date, stars and the text. Same frame as the About cards. */
function ReviewCard({ review, delay = 0 }: ReviewCardProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const look = ACCENTS[accentFor(review.id)]
  const date = formatReviewDate(review.createdAt)

  return (
    <article
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:p-5 dark:border-slate-700/70 dark:bg-slate-900/50 ${look.hover} ${
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

      <header className="relative flex items-center gap-3">
        <Avatar />
        <div className="min-w-0 flex-1">
          <h3 dir="auto" className="truncate font-title text-base font-bold md:text-lg">
            {review.name}
          </h3>
          {date && (
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 md:text-sm dark:text-slate-400">
              <CalendarDays size={14} aria-hidden="true" />
              <time dateTime={review.createdAt}>{date}</time>
            </p>
          )}
        </div>
        <StarRating value={review.rating} />
      </header>

      <div
        aria-hidden="true"
        className={`relative my-3 h-px w-full bg-linear-to-r from-transparent ${look.divider} to-transparent`}
      />

      {/* dir="auto": Persian stays RTL; a review written in English reads left to right. */}
      <p
        dir="auto"
        className="relative text-sm leading-7 text-pretty break-words text-slate-600 md:text-base md:leading-8 dark:text-slate-300"
      >
        {review.text}
      </p>
    </article>
  )
}

export default ReviewCard
