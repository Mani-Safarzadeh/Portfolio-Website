import { Award, ImageOff, ZoomIn } from 'lucide-react'
import { ACCENTS } from '@/data/accents'
import type { Certificate } from '@/data/skillsData'
import { useInView } from '@/hooks/useInView'

type CertificateCardProps = Certificate & {
  /** Picture of the certificate; without it the card shows a "picture coming" frame. */
  image?: string
  onOpen: () => void
  delay?: number
}

/** A certificate: its picture on top (opens bigger on click), then title and issuer. */
function CertificateCard({ title, issuer, accent, image, onOpen, delay = 0 }: CertificateCardProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const look = ACCENTS[accent]

  return (
    <article
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/60 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-700/70 dark:bg-slate-900/50 ${look.hover} ${
        inView ? 'animate-pop' : 'opacity-0'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 z-10 h-0.5 bg-linear-to-r from-transparent ${look.line} to-transparent opacity-70`}
      />

      <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 bg-slate-100/70 dark:border-slate-700/70 dark:bg-slate-800/50">
        {image ? (
          <>
            <img
              src={image}
              alt={`تصویر مدرک ${title}`}
              loading="lazy"
              className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-slate-950/0 text-white opacity-0 transition duration-300 group-hover:bg-slate-950/40 group-hover:opacity-100"
            >
              <ZoomIn size={26} />
            </span>
          </>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-slate-400">
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute size-28 rounded-full opacity-20 blur-2xl ${look.glow}`}
            />
            <ImageOff size={26} aria-hidden="true" className="relative" />
            <span className="relative text-xs">تصویر مدرک به‌زودی</span>
          </div>
        )}
      </div>

      <div className="relative flex items-start gap-3 p-4">
        <span className={`inline-flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 ${look.chip}`}>
          <Award size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="font-title text-base leading-7 font-bold">
            {image ? (
              <button
                type="button"
                onClick={onOpen}
                className="rounded text-start after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              >
                {title}
              </button>
            ) : (
              title
            )}
          </h3>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{issuer}</p>
        </div>
      </div>
    </article>
  )
}

export default CertificateCard
