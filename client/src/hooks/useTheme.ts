import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Storage can be blocked (private mode). Fall back to the system setting.
  }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Light/dark theme. It toggles the "dark" class on <html>, so any element
 * can react with Tailwind's `dark:` prefix. No other component needs this hook.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore: the theme still changes, it just won't be remembered.
    }
  }

  return { theme, toggleTheme }
}
