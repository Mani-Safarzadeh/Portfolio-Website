import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

type CertificateDialogProps = {
  title: string
  image: string
  onClose: () => void
}

/** Full-size view of one certificate, on the browser's own <dialog> (same pattern as ReviewsDialog). */
function CertificateDialog({ title, image, onClose }: CertificateDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()

    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = previous
    }
  }, [])

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
      className="m-auto max-h-[90svh] w-[min(100%-1.5rem,56rem)] animate-pop flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl open:flex backdrop:bg-slate-950/75 backdrop:backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700/70">
        <h2 className="font-title text-base font-bold md:text-lg">{title}</h2>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="بستن"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-violet-300"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-auto bg-slate-100 p-3 dark:bg-slate-950">
        <img src={image} alt={`تصویر مدرک ${title}`} className="mx-auto h-auto max-w-full rounded-lg" />
      </div>
    </dialog>
  )
}

export default CertificateDialog
