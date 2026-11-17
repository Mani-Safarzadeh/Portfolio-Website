import { useId, useState } from 'react'
import { Star } from 'lucide-react'
import { MAX_RATING, RATING_LABELS } from '@/data/reviewsData'

type StarRatingInputProps = {
  /** 0 means nothing chosen yet. */
  value: number
  onChange: (value: number) => void
  invalid?: boolean
  describedBy?: string
}

const CHOICES = Array.from({ length: MAX_RATING }, (_, i) => i + 1)

/**
 * Pick 1 to 5 stars. Built from native radio buttons, so arrow keys, focus and screen readers
 * work without extra code. Hovering previews the stars up to the pointer.
 */
function StarRatingInput({ value, onChange, invalid = false, describedBy }: StarRatingInputProps) {
  const name = useId()
  const [hover, setHover] = useState(0)
  const shown = hover || value
  const label = shown ? RATING_LABELS[shown] : 'ستاره بدهید'

  return (
    <div className="flex items-center gap-3">
      <div
        role="radiogroup"
        aria-label="امتیاز شما"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="flex gap-0.5"
        onMouseLeave={() => setHover(0)}
      >
        {CHOICES.map((n) => (
          <label
            key={n}
            onMouseEnter={() => setHover(n)}
            className="cursor-pointer rounded p-0.5 transition-transform hover:scale-110 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-violet-500"
          >
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            <span className="sr-only">{n.toLocaleString('fa-IR')} ستاره</span>
            <Star
              size={26}
              aria-hidden="true"
              className={`transition-colors ${
                n <= shown ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
              }`}
            />
          </label>
        ))}
      </div>
      <span aria-hidden="true" className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </div>
  )
}

export default StarRatingInput
