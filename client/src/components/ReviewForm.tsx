import { useRef, useState, type FormEvent } from 'react'
import { CircleCheck, PenLine, Send } from 'lucide-react'
import StarRatingInput from '@/components/StarRatingInput'
import { REVIEW_LIMITS, type NewReview } from '@/data/reviewsData'

/** The "add a review" button in the summary scrolls to these. */
export const REVIEW_FORM_ID = 'review-form'
export const REVIEW_NAME_ID = 'review-name'

type Errors = Partial<Record<keyof NewReview, string>>

function validate(name: string, text: string, rating: number): Errors {
  const errors: Errors = {}
  const { nameMin, nameMax, textMin, textMax } = REVIEW_LIMITS
  if (name.length < nameMin) errors.name = `نام را وارد کنید (حداقل ${nameMin.toLocaleString('fa-IR')} حرف).`
  else if (name.length > nameMax) errors.name = `نام نباید بیشتر از ${nameMax.toLocaleString('fa-IR')} حرف باشد.`
  if (text.length < textMin) errors.text = `نظر شما کوتاه است (حداقل ${textMin.toLocaleString('fa-IR')} حرف).`
  else if (text.length > textMax) errors.text = `نظر نباید بیشتر از ${textMax.toLocaleString('fa-IR')} حرف باشد.`
  if (rating < 1) errors.rating = 'یک تا پنج ستاره امتیاز بدهید.'
  return errors
}

const fieldClass =
  'w-full rounded-xl border bg-white/70 px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-violet-500 md:text-base dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500'

const okBorder = 'border-slate-200 dark:border-slate-700'
const errorBorder = 'border-rose-500 dark:border-rose-400'

type ReviewFormProps = {
  onSubmit: (review: NewReview) => void
  className?: string
}

/** Name, review text and 1 to 5 stars. Checks the values, then hands them to `onSubmit`. */
function ReviewForm({ onSubmit, className = '' }: ReviewFormProps) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const textRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const clean = { name: name.trim(), text: text.trim(), rating }
    const found = validate(clean.name, clean.text, clean.rating)
    setErrors(found)
    setSent(false)

    if (Object.keys(found).length > 0) {
      // Send keyboard and screen reader users to the first problem.
      if (found.name) document.getElementById(REVIEW_NAME_ID)?.focus()
      else if (found.text) textRef.current?.focus()
      return
    }

    onSubmit(clean)
    setName('')
    setText('')
    setRating(0)
    setSent(true)
  }

  // Typing in a field clears its old error and the "sent" message.
  function touched(field: keyof NewReview) {
    setSent(false)
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  return (
    <form
      id={REVIEW_FORM_ID}
      onSubmit={handleSubmit}
      noValidate
      className={`relative scroll-mt-20 overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm lg:p-5 dark:border-slate-700/70 dark:bg-slate-900/50 ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-violet-500 to-transparent opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-12 -top-12 size-36 rounded-full bg-violet-500 opacity-15 blur-3xl dark:opacity-20"
      />

      <div className="relative flex items-center gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/25 dark:text-violet-300">
          <PenLine size={18} aria-hidden="true" />
        </span>
        <h3 className="font-title text-base font-bold md:text-lg">نظر خودتان را بنویسید</h3>
      </div>

      <div
        aria-hidden="true"
        className="relative my-3 h-px w-full bg-linear-to-r from-transparent via-violet-500/60 to-transparent"
      />

      <div className="relative space-y-4">
        <div>
          <label htmlFor={REVIEW_NAME_ID} className="mb-1.5 block text-sm font-medium">
            نام
          </label>
          <input
            id={REVIEW_NAME_ID}
            type="text"
            dir="auto"
            autoComplete="name"
            maxLength={REVIEW_LIMITS.nameMax}
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              touched('name')
            }}
            placeholder="مثلاً: سارا احمدی"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'review-name-error' : undefined}
            className={`${fieldClass} ${errors.name ? errorBorder : okBorder}`}
          />
          {errors.name && <FieldError id="review-name-error">{errors.name}</FieldError>}
        </div>

        <div>
          <span id="review-rating-label" className="mb-1.5 block text-sm font-medium">
            امتیاز
          </span>
          <StarRatingInput
            value={rating}
            onChange={(value) => {
              setRating(value)
              touched('rating')
            }}
            invalid={Boolean(errors.rating)}
            describedBy={errors.rating ? 'review-rating-error' : undefined}
          />
          {errors.rating && <FieldError id="review-rating-error">{errors.rating}</FieldError>}
        </div>

        <div>
          <label htmlFor="review-text" className="mb-1.5 block text-sm font-medium">
            نظر شما
          </label>
          <textarea
            id="review-text"
            ref={textRef}
            dir="auto"
            rows={4}
            maxLength={REVIEW_LIMITS.textMax}
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              touched('text')
            }}
            placeholder="تجربه‌ی کار یا آشنایی‌تان با من را بنویسید..."
            aria-invalid={Boolean(errors.text)}
            aria-describedby={`review-text-count${errors.text ? ' review-text-error' : ''}`}
            className={`${fieldClass} resize-y ${errors.text ? errorBorder : okBorder}`}
          />
          <div className="mt-1 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              {errors.text && <FieldError id="review-text-error">{errors.text}</FieldError>}
            </div>
            <span id="review-text-count" dir="ltr" className="shrink-0 text-xs text-slate-500 tabular-nums dark:text-slate-400">
              {text.length.toLocaleString('fa-IR')} / {REVIEW_LIMITS.textMax.toLocaleString('fa-IR')}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-l from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 md:text-base"
        >
          ثبت نظر
          <Send
            size={16}
            aria-hidden="true"
            className="-scale-x-100 transition-transform group-hover:-translate-x-0.5"
          />
        </button>

        <p role="status" className="min-h-0 text-center text-sm">
          {sent && (
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-300">
              <CircleCheck size={16} aria-hidden="true" />
              ممنون! نظر شما ثبت شد.
            </span>
          )}
        </p>
      </div>
    </form>
  )
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-1.5 text-xs text-rose-600 md:text-sm dark:text-rose-400">
      {children}
    </p>
  )
}

export default ReviewForm
