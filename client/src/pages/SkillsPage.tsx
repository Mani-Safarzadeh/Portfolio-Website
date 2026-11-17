import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Code2, Languages, Trophy } from 'lucide-react'
import CertificateCard from '@/components/CertificateCard'
import CertificateDialog from '@/components/CertificateDialog'
import FooterColumn from '@/components/FooterColumn'
import LanguageCard from '@/components/LanguageCard'
import SkillCard from '@/components/SkillCard'
import {
  CATEGORIES,
  CERTIFICATES,
  LANGUAGES,
  SKILLS,
  certificateImage,
  type SkillCategory,
} from '@/data/skillsData'
import { faNumber } from '@/hooks/useCountUp'

const strongest = SKILLS.reduce((best, skill) => (skill.level > best.level ? skill : best))

const FACTS = [
  { label: 'مهارت', value: faNumber(SKILLS.length), icon: Code2 },
  { label: 'زبان', value: faNumber(LANGUAGES.length), icon: Languages },
  { label: 'مدرک', value: faNumber(CERTIFICATES.length), icon: Award },
  { label: 'نقطه‌ی قوت', value: strongest.title, icon: Trophy },
]

const CERTIFICATE_ITEMS = CERTIFICATES.map((item) => ({ ...item, image: certificateImage(item.id) }))

const linkButtonClass =
  'inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-violet-500 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 md:text-base dark:border-slate-700 dark:text-slate-200 dark:hover:text-violet-300'

function SkillsPage() {
  const [category, setCategory] = useState<SkillCategory | 'all'>('all')
  const [openCertificate, setOpenCertificate] = useState<string | null>(null)

  const skills = category === 'all' ? SKILLS : SKILLS.filter((skill) => skill.category === category)
  const opened = CERTIFICATE_ITEMS.find((item) => item.id === openCertificate)

  return (
    <div className="space-y-12 py-10 pb-4">
      <header className="text-center">
        <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-700 md:text-sm dark:text-violet-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-violet-500" />
          </span>
          همیشه در حال یادگیری
        </span>
        <h1 className="mt-3 animate-rise font-title text-3xl font-bold [animation-delay:100ms] md:text-4xl lg:text-5xl">
          مهارت‌ها و{' '}
          <span className="bg-linear-to-l from-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-fuchsia-400">
            مدارک من
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl animate-rise text-base leading-8 text-pretty text-slate-600 [animation-delay:200ms] md:text-lg dark:text-slate-300">
          اینجا ابزارها و زبان‌هایی را می‌بینید که با آن‌ها کار می‌کنم، همراه با یک تخمین صادقانه از میزان تسلطم به هر
          کدام، زبان‌هایی که با آن‌ها ارتباط می‌گیرم و مدارکی که تا امروز گرفته‌ام.
        </p>

        <ul className="mt-5 flex animate-rise flex-wrap justify-center gap-2.5 [animation-delay:300ms]">
          {FACTS.map(({ label, value, icon: Icon }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs backdrop-blur-sm md:text-sm dark:border-slate-700/70 dark:bg-slate-900/50"
            >
              <Icon size={14} aria-hidden="true" className="text-violet-500" />
              <span className="text-slate-500 dark:text-slate-400">{label}:</span>
              <span dir="auto" className="font-medium">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </header>

      <FooterColumn title="مهارت‌های فنی و نرم">
        <div
          role="group"
          aria-label="دسته‌بندی مهارت‌ها"
          className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {CATEGORIES.map(({ id, label }) => {
            const active = category === id
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(id)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 md:text-sm ${
                  active
                    ? 'border-transparent bg-linear-to-l from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/20'
                    : 'border-slate-200 bg-white/60 text-slate-600 hover:border-violet-500/50 hover:text-violet-600 dark:border-slate-700/70 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:text-violet-300'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} {...skill} delay={(index % 3) * 100} />
          ))}
        </div>
      </FooterColumn>

      <FooterColumn title="زبان‌هایی که با آن‌ها ارتباط می‌گیرم">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {LANGUAGES.map((language, index) => (
            <LanguageCard key={language.native} {...language} delay={index * 120} />
          ))}
        </div>
      </FooterColumn>

      <FooterColumn title="مدارک و گواهی‌نامه‌ها">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATE_ITEMS.map((item, index) => (
            <CertificateCard
              key={item.id}
              {...item}
              onOpen={() => setOpenCertificate(item.id)}
              delay={(index % 3) * 100}
            />
          ))}
        </div>
      </FooterColumn>

      {opened?.image && (
        <CertificateDialog title={opened.title} image={opened.image} onClose={() => setOpenCertificate(null)} />
      )}

      <div className="flex flex-wrap items-center justify-center gap-3 text-center">
        <p className="w-full text-sm text-slate-600 md:text-base dark:text-slate-300">
          فکر می‌کنید این مهارت‌ها به کار پروژه‌ی شما می‌آید؟
        </p>
        <Link to="/contact" className={linkButtonClass}>
          تماس با من
        </Link>
        <Link to="/articles" className={linkButtonClass}>
          مقالات
        </Link>
      </div>
    </div>
  )
}

export default SkillsPage
