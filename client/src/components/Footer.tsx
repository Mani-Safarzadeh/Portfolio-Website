import { Link } from 'react-router-dom'
import FooterColumn from '@/components/FooterColumn'
import Logo from '@/components/Logo'
import { NAV_ITEMS } from '@/data/navItems'
import { SOCIAL_LINKS, externalProps } from '@/data/socialLinks'

const textLinkClass =
  'inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-violet-600 focus-visible:text-violet-600 dark:text-slate-300 dark:hover:text-violet-300 dark:focus-visible:text-violet-300'

// Persian calendar year, e.g. ۱۴۰۵. It updates by itself every new year.
const YEAR = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date())

/**
 * Site footer: about text, page links and social links, then a copyright line.
 * Rendered once in App, so every page gets it.
 */
function Footer() {
  return (
    <footer className="relative mt-16 border-t border-slate-200 bg-white/60 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/60">
      {/* Colored line along the top edge, like the cards. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-500/70 to-transparent"
      />

      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* First in the HTML = on the right in RTL. */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <FooterColumn title="درباره من" className="sm:col-span-2 lg:col-span-1">
            <Logo className="mb-3 h-6 w-auto text-slate-900 dark:text-white" />
            <p className="text-sm leading-7 text-pretty text-slate-600 dark:text-slate-300">
              برنامه‌نویس بک‌اند و هوش مصنوعی، عضو <bdi className="whitespace-nowrap">arch-nc</bdi> و
              دانشجوی علوم کامپیوتر. اینجا از تجربه‌ها، مهارت‌ها و مقاله‌هایم می‌نویسم.
            </p>
          </FooterColumn>

          <FooterColumn title="لینک‌های مفید">
            <ul className="space-y-2">
              {NAV_ITEMS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={textLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="شبکه‌های اجتماعی">
            <ul className="space-y-2">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a href={href || undefined} className={textLinkClass} {...externalProps(href)}>
                    {icon(16)}
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <p className="mx-auto max-w-5xl px-4 py-3 text-center text-xs text-slate-500 md:text-sm dark:text-slate-400">
          کلیه حقوق مادی و معنوی سایت برای مانی صفرزاده محفوظ است. © {YEAR}
        </p>
      </div>
    </footer>
  )
}

export default Footer
