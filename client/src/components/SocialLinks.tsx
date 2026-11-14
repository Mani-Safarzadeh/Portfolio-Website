import type { ReactNode } from 'react'
import { Mail, Send } from 'lucide-react'

// Lucide has no brand logos, so these two are simple inline SVG paths (24x24 box).
const GITHUB_PATH =
  'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

type SocialLink = { label: string; href: string; icon: ReactNode }

// TODO: fill in the real links. An empty href shows the icon but does nothing yet.
const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: '', icon: <BrandIcon path={GITHUB_PATH} /> },
  { label: 'LinkedIn', href: '', icon: <BrandIcon path={LINKEDIN_PATH} /> },
  { label: 'تلگرام', href: '', icon: <Send size={18} aria-hidden="true" /> },
  { label: 'ایمیل', href: '', icon: <Mail size={18} aria-hidden="true" /> },
]

const linkClass =
  'inline-flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-violet-500 hover:bg-violet-600 hover:text-white focus-visible:border-violet-500 focus-visible:bg-violet-600 focus-visible:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:border-violet-400 dark:hover:bg-violet-500 dark:hover:text-white dark:focus-visible:bg-violet-500 dark:focus-visible:text-white'

type SocialLinksProps = { className?: string }

function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={className}>
      {SOCIAL_LINKS.map(({ label, href, icon }) => {
        const isExternal = href.startsWith('http')
        return (
          <li key={label}>
            <a
              href={href || undefined}
              aria-label={label}
              title={label}
              className={linkClass}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {icon}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
