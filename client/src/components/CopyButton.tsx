import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

type CopyButtonProps = { text: string; className?: string }

/** Copies `text` to the clipboard and shows a check mark for two seconds. */
function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return // Clipboard blocked (for example on plain http): nothing to confirm.
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/70 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-violet-500/50 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:text-violet-300 ${className}`}
    >
      {copied ? (
        <Check size={14} aria-hidden="true" className="text-emerald-500" />
      ) : (
        <Copy size={14} aria-hidden="true" />
      )}
      {copied ? 'کپی شد' : 'کپی'}
      <span className="sr-only" aria-live="polite">
        {copied ? 'ایمیل کپی شد' : ''}
      </span>
    </button>
  )
}

export default CopyButton
