import type { ReactNode } from 'react'

type FooterColumnProps = {
  title: string
  children: ReactNode
  className?: string
}

/** One footer block: a small violet bar, a title and the content below it. */
function FooterColumn({ title, children, className = '' }: FooterColumnProps) {
  return (
    <section className={className}>
      <h2 className="flex items-center gap-2 font-title text-base font-bold md:text-lg">
        <span
          aria-hidden="true"
          className="h-4 w-1 rounded-full bg-linear-to-b from-violet-500 to-fuchsia-500"
        />
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

export default FooterColumn
