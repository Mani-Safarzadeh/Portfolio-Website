import { useState } from 'react'
import { MessageSquareQuote, PenLine, Plus } from 'lucide-react'
import ReviewCard from '@/components/ReviewCard'
import ReviewsDialog from '@/components/ReviewsDialog'
import ReviewForm, { REVIEW_FORM_ID, REVIEW_NAME_ID } from '@/components/ReviewForm'
import StarRating from '@/components/StarRating'
import { MAX_RATING, summarize } from '@/data/reviewsData'
import { useReviews } from '@/hooks/useReviews'

/** How many reviews sit on the page; the rest open in a pop-up. */
const VISIBLE_COUNT = 3

type ReviewsSectionProps = {
  /** id for in-page links. */
  id?: string
}

function goToForm() {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  document
    .getElementById(REVIEW_FORM_ID)
    ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
  document.getElementById(REVIEW_NAME_ID)?.focus({ preventScroll: true })
}

/**
 * What people say about me: average rating, the list of reviews and the form to add one.
 * One column on small screens (reviews, then the form); from `lg` the form sits next to the list.
 */
function ReviewsSection({ id }: ReviewsSectionProps) {
  const { reviews, addReview } = useReviews()
  const { count, average } = summarize(reviews)
  const [moreOpen, setMoreOpen] = useState(false)
  const visible = reviews.slice(0, VISIBLE_COUNT)
  const hidden = reviews.slice(VISIBLE_COUNT)

  return (
    <section id={id} aria-labelledby="reviews-title" className="scroll-mt-14 pb-16">
      <header className="text-center">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-600 ring-1 ring-fuchsia-500/25 dark:text-fuchsia-300">
          <MessageSquareQuote size={20} aria-hidden="true" />
        </span>
        <h2 id="reviews-title" className="mt-3 font-title text-2xl font-bold md:text-3xl">
          دیگران{' '}
          <span className="bg-linear-to-l from-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-fuchsia-400">
            درباره‌ی من
          </span>{' '}
          چه می‌گویند
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-pretty text-slate-600 md:text-base md:leading-8 dark:text-slate-300">
          با من کار کرده‌اید یا مرا می‌شناسید؟ نظر و امتیاز شما به بقیه کمک می‌کند بهتر با من آشنا شوند.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
        {/* First in the HTML = on the right in RTL. */}
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white/60 p-4 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:text-start lg:p-5 dark:border-slate-700/70 dark:bg-slate-900/50">
            {count > 0 ? (
              <div className="flex items-center gap-4">
                <span className="font-title text-4xl font-bold text-violet-600 tabular-nums md:text-5xl dark:text-violet-300">
                  {average.toLocaleString('fa-IR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </span>
                <div className="space-y-1">
                  <StarRating value={average} size={20} />
                  <p className="text-xs text-slate-500 md:text-sm dark:text-slate-400">
                    از {MAX_RATING.toLocaleString('fa-IR')} · بر اساس {count.toLocaleString('fa-IR')} نظر
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-600 md:text-base dark:text-slate-300">
                هنوز نظری ثبت نشده. اولین نفر باشید!
              </p>
            )}

            {/* The form is below the list on phones, so give a quick way down to it. */}
            <button
              type="button"
              onClick={goToForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-violet-500 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 md:text-base lg:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:text-violet-300"
            >
              <PenLine size={16} aria-hidden="true" />
              ثبت نظر
            </button>
          </div>

          <ul className="space-y-4">
            {visible.map((review, index) => (
              <li key={review.id}>
                <ReviewCard review={review} delay={Math.min(index, 3) * 100} />
              </li>
            ))}
          </ul>

          {hidden.length > 0 && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setMoreOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/60 px-5 py-2.5 text-sm font-medium text-slate-700 backdrop-blur-sm transition-colors hover:border-violet-500 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 md:text-base dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:text-violet-300"
              >
                <Plus size={16} aria-hidden="true" />
                نشان دادن نظرات بیشتر
                <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-xs text-violet-600 tabular-nums dark:text-violet-300">
                  {hidden.length.toLocaleString('fa-IR')}
                </span>
              </button>
            </div>
          )}
        </div>

        <ReviewForm onSubmit={addReview} className="lg:sticky lg:top-20" />
      </div>

      {moreOpen && <ReviewsDialog reviews={hidden} onClose={() => setMoreOpen(false)} />}
    </section>
  )
}

export default ReviewsSection
