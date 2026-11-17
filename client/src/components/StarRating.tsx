import { Star } from 'lucide-react'
import { MAX_RATING } from '@/data/reviewsData'

type StarRatingProps = {
  /** 0 to 5. Can have decimals (for the average): the last star fills partly. */
  value: number
  /** Size of each star in px. */
  size?: number
  className?: string
}

const STARS = Array.from({ length: MAX_RATING }, (_, i) => i)

function Row({ filled, size }: { filled: boolean; size: number }) {
  return (
    <span className="flex w-max gap-0.5">
      {STARS.map((i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={filled ? 'shrink-0 fill-amber-400 text-amber-400' : 'shrink-0 text-slate-300 dark:text-slate-600'}
        />
      ))}
    </span>
  )
}

/** Read-only stars. A second, filled row sits on top and is cut to the right width. */
function StarRating({ value, size = 16, className = '' }: StarRatingProps) {
  const clamped = Math.min(Math.max(value, 0), MAX_RATING)
  // Spacing between stars is tiny, so a plain percentage of the row is close enough.
  const percent = (clamped / MAX_RATING) * 100
  const label = `امتیاز ${clamped.toLocaleString('fa-IR', { maximumFractionDigits: 1 })} از ${MAX_RATING.toLocaleString('fa-IR')}`

  return (
    <span role="img" aria-label={label} className={`relative inline-flex ${className}`}>
      <Row filled={false} size={size} />
      <span className="absolute inset-y-0 inset-s-0 overflow-hidden" style={{ width: `${percent}%` }}>
        <Row filled size={size} />
      </span>
    </span>
  )
}

export default StarRating
