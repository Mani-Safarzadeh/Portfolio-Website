import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FileText, Mail, Menu, Moon, Sun, User, Wrench, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Logo from '@/components/Logo'
import { useTheme } from '@/hooks/useTheme'

type NavItem = { label: string; to: string; icon: LucideIcon }

const NAV_ITEMS: NavItem[] = [
  { label: 'معرفی', to: '/', icon: User },
  { label: 'مقالات', to: '/articles', icon: FileText },
  { label: 'مهارت‌ها', to: '/skills', icon: Wrench },
  { label: 'ارتباط با من', to: '/contact', icon: Mail },
]

// NavLink gives us `isActive` so the current page is highlighted.
const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-slate-100 md:text-xs dark:hover:bg-slate-800 ${
    isActive
      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
      : 'text-slate-700 dark:text-slate-200'
  }`

const iconButtonClass =
  'rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'

function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav aria-label="منوی اصلی" className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Start side (right in RTL): logo, then the links on desktop. */}
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="صفحه اصلی" onClick={() => setOpen(false)}>
              <Logo className="h-7 w-auto text-slate-900 dark:text-white" />
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
                <li key={to}>
                  <NavLink to={to} end className={linkClass}>
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* End side (left in RTL): theme switch, and the menu button on mobile. */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={iconButtonClass}
              aria-label={isDark ? 'حالت روز' : 'حالت شب'}
              onClick={toggleTheme}
            >
              {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
            </button>

            <button
              type="button"
              className={`${iconButtonClass} md:hidden`}
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile: links stacked vertically. */}
        {open && (
          <ul id="mobile-menu" className="flex flex-col gap-1 pb-3 md:hidden">
            {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <NavLink to={to} end className={linkClass} onClick={() => setOpen(false)}>
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Navbar
