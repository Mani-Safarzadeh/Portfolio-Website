import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import ReviewCard from '@/components/ReviewCard'
import type { Review } from '@/data/reviewsData'

type ReviewsDialogProps = {
  reviews: readonly Review[]
  /** Called after the dialog has closed (close button, Esc key or click on the dark background). */
  onClose: () => void
}

/**
 * A pop-up with more reviews. It uses the browser's own <dialog>, so we get for free:
 * the dark background (::backdrop), Esc to close, keyboard focus kept inside, and
 * focus returning to the button that opened it.
 * The parent only renders this while it is open, so it opens itself when it appears.
 */
function ReviewsDialog({ reviews, onClose }: ReviewsDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()

    // The page behind must not scroll while the pop-up is open.
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = previous
    }
  }, [])

  return (
    <dialog
      ref={ref}
      aria-labelledby="more-reviews-title"
      onClose={onClose}
      // The dialog fills its whole box, so a click whose target is the dialog itself
      // can only have landed on the background around it.
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
      // m-auto: Tailwind's reset removes the browser's centering margin.
      className="m-auto max-h-[85svh] w-[min(100%-1.5rem,42rem)] animate-pop flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl open:flex backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 lg:px-5 dark:border-slate-700/70">
        <h2 id="more-reviews-title" className="font-title text-lg font-bold md:text-xl">
          نظرات بیشتر
          <span className="ms-2 text-sm font-normal text-slate-500 dark:text-slate-400">
            ({reviews.length.toLocaleString('fa-IR')} نظر)
          </span>
        </h2>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="بستن"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-violet-300"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      {/* Only this part scrolls; the title bar stays in place. */}
      <ul className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 lg:p-5">
        {reviews.map((review, index) => (
          <li key={review.id}>
            <ReviewCard review={review} delay={Math.min(index, 3) * 80} />
          </li>
        ))}
      </ul>
    </dialog>
  )
}

export default ReviewsDialog
