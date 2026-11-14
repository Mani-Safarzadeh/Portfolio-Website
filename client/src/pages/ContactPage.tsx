import { Link } from 'react-router-dom'
import AboutCard from '@/components/AboutCard'
import ContactMethodCard from '@/components/ContactMethodCard'
import FaqItem from '@/components/FaqItem'
import FooterColumn from '@/components/FooterColumn'
import { CONTACT_METHODS, FACTS, FAQ, REASONS } from '@/data/contactData'
import { SOCIAL_LINKS } from '@/data/socialLinks'

const linkButtonClass =
  'inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-violet-500 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 md:text-base dark:border-slate-700 dark:text-slate-200 dark:hover:text-violet-300'

// Each contact card gets its link and icon from SOCIAL_LINKS, so URLs live in one place only.
const METHODS = CONTACT_METHODS.flatMap((method) => {
  const link = SOCIAL_LINKS.find((item) => item.label === method.label)
  return link ? [{ ...method, href: link.href, icon: link.icon(20) }] : []
})

function ContactPage() {
  return (
    <div className="space-y-12 py-10 pb-4">
      <header className="text-center">
        <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 md:text-sm dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          آماده‌ی همکاری
        </span>
        <h1 className="mt-3 animate-rise font-title text-3xl font-bold [animation-delay:100ms] md:text-4xl lg:text-5xl">
          بیایید{' '}
          <span className="bg-linear-to-l from-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-fuchsia-400">
            صحبت کنیم
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl animate-rise text-base leading-8 text-pretty text-slate-600 [animation-delay:200ms] md:text-lg dark:text-slate-300">
          پروژه‌ای در ذهن دارید، سؤالی دارید یا فقط می‌خواهید سلام کنید؟ از هر راهی که راحت‌ترید پیام بدهید.
        </p>

        <ul className="mt-5 flex animate-rise flex-wrap justify-center gap-2.5 [animation-delay:300ms]">
          {FACTS.map(({ label, value, icon: Icon }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs backdrop-blur-sm md:text-sm dark:border-slate-700/70 dark:bg-slate-900/50"
            >
              <Icon size={14} aria-hidden="true" className="text-violet-500" />
              <span className="text-slate-500 dark:text-slate-400">{label}:</span>
              <span className="font-medium">{value}</span>
            </li>
          ))}
        </ul>
      </header>

      <section aria-label="راه‌های تماس" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METHODS.map(({ label, hint, accent, featured, href, icon }, index) => (
          <ContactMethodCard
            key={label}
            label={label}
            hint={hint}
            href={href}
            icon={icon}
            accent={accent}
            delay={index * 100}
            className={featured ? 'sm:col-span-2' : ''}
          />
        ))}
      </section>

      <FooterColumn title="درباره‌ی چه چیزی می‌توانید پیام بدهید؟">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ title, text, icon, accent }, index) => (
            <AboutCard
              key={title}
              title={title}
              paragraphs={[text]}
              icon={icon}
              accent={accent}
              centered
              delay={index * 100}
            />
          ))}
        </div>
      </FooterColumn>

      <FooterColumn title="سؤال‌های متداول">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/50">
          {FAQ.map(({ question, answer }) => (
            <FaqItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </FooterColumn>

      <div className="flex flex-wrap items-center justify-center gap-3 text-center">
        <p className="w-full text-sm text-slate-600 md:text-base dark:text-slate-300">
          قبل از پیام دادن، کارهای من را هم ببینید:
        </p>
        <Link to="/skills" className={linkButtonClass}>
          مهارت‌ها
        </Link>
        <Link to="/articles" className={linkButtonClass}>
          مقالات
        </Link>
      </div>
    </div>
  )
}

export default ContactPage
