import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SocialLinks from '@/components/SocialLinks'
import TypedRoles from '@/components/TypedRoles'

const buttonClass =
  'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 md:text-base'

type HeroIntroProps = {
  /** id of the element the "About me" button scrolls to. */
  aboutId: string
}

/** The framed text block: status badge, title, roles, intro text, buttons and social links. */
function HeroIntro({ aboutId }: HeroIntroProps) {
  function scrollToAbout() {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    document
      .getElementById(aboutId)
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    // `@container` lets the title size itself from the card width (see the h1 below).
    <div className="@container w-full max-w-xl animate-pop lg:max-w-2xl rounded-2xl border border-slate-200 bg-white/50 p-5 text-center backdrop-blur-sm [animation-delay:100ms] lg:p-6 row:text-start dark:border-slate-700/70 dark:bg-slate-900/40">
      <div className="mb-2.5">
        <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 [animation-delay:150ms] md:text-sm dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          آماده‌ی همکاری
        </span>
      </div>

      {/* One line always. The size is the normal size, but never more than 8.4% of the card width. */}
      <h1 className="animate-rise font-title text-[length:min(1.875rem,8.4cqw)] leading-snug font-bold whitespace-nowrap [animation-delay:250ms] md:text-[length:min(2.25rem,8.4cqw)] lg:text-[length:min(3rem,8.4cqw)]">
        سلام، من{' '}
        <span className="bg-linear-to-l from-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-fuchsia-400">
          مانی صفرزاده
        </span>{' '}
        هستم
      </h1>

      <TypedRoles className="mt-1.5 flex h-7 animate-rise items-center justify-center text-lg font-medium text-violet-600 [animation-delay:350ms] row:justify-start dark:text-violet-300" />

      {/* Thin divider: violet at the start, fading out toward the end. */}
      <div
        aria-hidden="true"
        className="my-3 h-px w-full animate-rise bg-linear-to-l from-violet-500/70 via-slate-300 to-transparent [animation-delay:425ms] dark:via-slate-600"
      />

      <p className="animate-rise text-base leading-7 text-pretty text-slate-600 [animation-delay:500ms] md:text-lg dark:text-slate-300">
        برنامه‌نویس بک‌اند و هوش مصنوعی، عضو <bdi className="whitespace-nowrap">arch-nc</bdi>،
        دانشجوی علوم کامپیوتر با قدرت حل مسئله بالا و تشنه یادگیری، به وب‌سایت من خوش آمدید
      </p>

      <div className="mt-5 flex animate-rise flex-wrap justify-center gap-2.5 [animation-delay:650ms] row:justify-start">
        <button
          type="button"
          onClick={scrollToAbout}
          className={`${buttonClass} bg-linear-to-l from-violet-600 to-fuchsia-600 shadow-violet-500/30 focus-visible:outline-violet-500`}
        >
          درباره من
        </button>
        <Link
          to="/contact"
          className={`${buttonClass} group gap-2 bg-teal-600 shadow-teal-500/30 focus-visible:outline-teal-500`}
        >
          ارتباط با من
          {/* ArrowLeft points left, the reading direction in RTL; it sits after the text, on its left. */}
          <ArrowLeft
            size={18}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-0.5"
          />
        </Link>
      </div>

      <SocialLinks className="mt-4 flex animate-rise justify-center gap-2 [animation-delay:800ms] row:justify-start" />
    </div>
  )
}

export default HeroIntro
