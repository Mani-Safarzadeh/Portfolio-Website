import { SOCIAL_LINKS, externalProps } from '@/data/socialLinks'

const linkClass =
  'inline-flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-violet-500 hover:bg-violet-600 hover:text-white focus-visible:border-violet-500 focus-visible:bg-violet-600 focus-visible:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:border-violet-400 dark:hover:bg-violet-500 dark:hover:text-white dark:focus-visible:bg-violet-500 dark:focus-visible:text-white'

type SocialLinksProps = { className?: string }

function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={className}>
      {SOCIAL_LINKS.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href || undefined}
            aria-label={label}
            title={label}
            className={linkClass}
            {...externalProps(href)}
          >
            {icon(18)}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
