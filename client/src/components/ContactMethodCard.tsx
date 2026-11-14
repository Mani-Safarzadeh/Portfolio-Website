import type { ReactNode } from 'react'
import { ArrowUpLeft } from 'lucide-react'
import CopyButton from '@/components/CopyButton'
import { ACCENTS, type Accent } from '@/data/accents'
import { externalProps } from '@/data/socialLinks'
import { useInView } from '@/hooks/useInView'

type ContactMethodCardProps = {
  label: string
  hint: string
  href: string
  icon: ReactNode
  accent: Accent
  /** Delay (ms) before the pop starts, to stagger neighbouring cards. */
  delay?: number
  className?: string
}

/** What to show under the title: the address for email, the account name (last part of the URL) otherwise. */
function displayValue(href: string) {
  if (href.startsWith('mailto:')) return href.slice('mailto:'.length)
  return href.replace(/\/+$/, '').split('/').pop() ?? href
}

/**
 * Card for one way to reach me. The whole card is the link (the title's link stretches over it);
 * the copy button for email sits above that, so it stays clickable.
 */
function ContactMethodCard({ label, hint, href, icon, accent, delay = 0, className = '' }: ContactMethodCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const look = ACCENTS[accent]
  const value = displayValue(href)
  const isEmail = href.startsWith('mailto:')

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:p-5 dark:border-slate-700/70 dark:bg-slate-900/50 ${look.hover} ${
        inView ? 'animate-pop' : 'opacity-0'
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent ${look.line} to-transparent opacity-70`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -end-12 -top-12 size-36 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35 dark:opacity-20 ${look.glow}`}
      />

      <div className="relative flex items-start gap-3">
        <span
          className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${look.chip}`}
        >
          {icon}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-title text-base font-bold md:text-lg">
            <a
              href={href}
              className="rounded after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              {...externalProps(href)}
            >
              {label}
            </a>
          </h3>
          <p className="mt-0.5 text-sm leading-6 text-slate-600 dark:text-slate-300">{hint}</p>
          <p dir="ltr" className="mt-2 truncate text-right text-xs text-slate-500 md:text-sm dark:text-slate-400">
            {value}
          </p>
        </div>

        <ArrowUpLeft
          size={18}
          aria-hidden="true"
          className="mt-1 shrink-0 text-slate-400 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-500"
        />
      </div>

      {isEmail && (
        <div className="relative mt-3 flex">
          <CopyButton text={value} />
        </div>
      )}
    </div>
  )
}

export default ContactMethodCard
