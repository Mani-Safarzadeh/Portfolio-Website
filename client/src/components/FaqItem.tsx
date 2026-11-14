import { ChevronDown } from 'lucide-react'

type FaqItemProps = { question: string; answer: string }

/** One question. A native <details> gives keyboard and screen reader support for free. */
function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="group border-b border-slate-200 last:border-b-0 dark:border-slate-700/70">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium transition-colors marker:hidden hover:text-violet-600 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500 md:text-base dark:hover:text-violet-300 [&::-webkit-details-marker]:hidden">
        {question}
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <p className="px-4 pb-4 text-sm leading-7 text-pretty text-slate-600 md:text-base md:leading-8 dark:text-slate-300">
        {answer}
      </p>
    </details>
  )
}

export default FaqItem
