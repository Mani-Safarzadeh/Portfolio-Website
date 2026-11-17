export type Review = {
  id: string
  name: string
  text: string
  /** Whole number, 1 to 5. */
  rating: number
  /** ISO date, for example "2026-10-02". Shown in the Persian calendar. */
  createdAt: string
}

/** What the form sends. The server (later) will add `id` and `createdAt`. */
export type NewReview = Pick<Review, 'name' | 'text' | 'rating'>

// Keep these in sync with the server validation when the API is built.
export const REVIEW_LIMITS = {
  nameMin: 2,
  nameMax: 40,
  textMin: 10,
  textMax: 500,
} as const

export const MAX_RATING = 5

/** A word for each star count, shown next to the stars in the form. */
export const RATING_LABELS: Record<number, string> = {
  1: 'ضعیف',
  2: 'نیاز به بهبود',
  3: 'متوسط',
  4: 'خوب',
  5: 'عالی',
}

/** Example reviews until they come from the server. */
export const INITIAL_REVIEWS: readonly Review[] = [
  {
    id: 'seed-arshia',
    name: 'ارشیا صادقی',
    text: 'مانی از اون آدم‌هاست که مسئله رو قبل از نوشتن کد خوب تجزیه می‌کنه. کار کردن باهاش خیلی راحته، هم دقیقه و هم همیشه حاضره کمک کنه.',
    rating: 5,
    createdAt: '2026-10-28T12:00:00Z',
  },
  {
    id: 'seed-armin',
    name: 'آرمین باهلی',
    text: 'از دوران مدرسه می‌شناسمش. پشتکار و علاقه‌اش به برنامه‌نویسی و یادگیری چیزهای جدید واقعاً قابل تحسینه و همیشه تو حل مسئله‌ها سنگ تمام می‌ذاره.',
    rating: 5,
    createdAt: '2026-10-12T12:00:00Z',
  },
  {
    id: 'seed-alireza',
    name: 'علیرضا پوشانی',
    text: 'تو یه پروژه‌ی تیمی باهاش همکاری داشتم. کدهاش تمیز و مرتب بود و ارتباطش با تیم عالی. فقط ای کاش کمی بیشتر مستندسازی می‌کرد!',
    rating: 4,
    createdAt: '2026-09-19T12:00:00Z',
  },
  // ---- Placeholder reviews, only to test the "more reviews" pop-up. Delete when the API is ready. ----
  {
    id: 'sample-1',
    name: 'کاربر نمونه ۱',
    text: 'این یک نظر نمونه است. متن آن فقط برای آزمایش چیدمان نوشته شده و نظر واقعی نیست.',
    rating: 5,
    createdAt: '2026-08-30T12:00:00Z',
  },
  {
    id: 'sample-2',
    name: 'کاربر نمونه ۲',
    text: 'این یک نظر نمونه‌ی طولانی‌تر است تا ببینیم چند خط شدن متن، ارتفاع کادر و فاصله‌ها را در دسکتاپ و موبایل به هم می‌ریزد یا نه. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.',
    rating: 3,
    createdAt: '2026-08-14T12:00:00Z',
  },
  {
    id: 'sample-3',
    name: 'کاربر نمونه ۳',
    text: 'نظر نمونه‌ی کوتاه.',
    rating: 4,
    createdAt: '2026-07-22T12:00:00Z',
  },
  {
    id: 'sample-4',
    name: 'کاربر نمونه ۴',
    text: 'این هم یک نظر نمونه‌ی دیگر با امتیاز پایین‌تر، برای دیدن میانگین و ستاره‌های خالی.',
    rating: 2,
    createdAt: '2026-06-05T12:00:00Z',
  },
  {
    id: 'sample-5',
    name: 'Sample User 5',
    text: 'This is a placeholder review written in English, to check that left-to-right text and a long unbroken word like Supercalifragilisticexpialidocious_Supercalifragilisticexpialidocious fit inside the card.',
    rating: 5,
    createdAt: '2026-05-18T12:00:00Z',
  },
]

const dateFormat = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long' })

/** "2026-10-28" -> "۶ آبان ۱۴۰۵" (the fa-IR locale uses the Persian calendar and digits). */
export function formatReviewDate(iso: string) {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '' : dateFormat.format(date)
}

/** Average rating and number of reviews. The average is 0 when there are no reviews. */
export function summarize(reviews: readonly Review[]) {
  const count = reviews.length
  if (count === 0) return { count, average: 0 }
  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  return { count, average: total / count }
}
