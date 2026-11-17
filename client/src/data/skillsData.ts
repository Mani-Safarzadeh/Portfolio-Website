import { Brain, Database, MessagesSquare, Puzzle, Sparkles, type LucideIcon } from 'lucide-react'
import {
  siC,
  siCplusplus,
  siCss,
  siHtml5,
  siJavascript,
  siNodedotjs,
  siPython,
  siTailwindcss,
  siTypescript,
} from 'simple-icons'
import type { Accent } from '@/data/accents'

/** A brand logo (one SVG path from simple-icons) or a lucide icon for skills without a logo. */
export type SkillIcon = { kind: 'brand'; path: string } | { kind: 'lucide'; icon: LucideIcon }

const brand = (icon: { path: string }): SkillIcon => ({ kind: 'brand', path: icon.path })
const lucide = (icon: LucideIcon): SkillIcon => ({ kind: 'lucide', icon })

export type SkillCategory = 'language' | 'web' | 'data-ai' | 'soft'

export const CATEGORIES: readonly { id: SkillCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'language', label: 'زبان‌های برنامه‌نویسی' },
  { id: 'web', label: 'وب و بک‌اند' },
  { id: 'data-ai', label: 'داده و هوش مصنوعی' },
  { id: 'soft', label: 'مهارت‌های نرم' },
]

export type Skill = {
  title: string
  description: string
  /** 0 to 100. */
  level: number
  icon: SkillIcon
  accent: Accent
  category: SkillCategory
}

export const SKILLS: readonly Skill[] = [
  {
    title: 'JavaScript',
    description: 'زبان اصلی وب که صفحه‌ها را تعاملی می‌کند و با Node.js در سمت سرور هم اجرا می‌شود.',
    level: 60,
    icon: brand(siJavascript),
    accent: 'amber',
    category: 'language',
  },
  {
    title: 'Python',
    description: 'زبانی ساده و پرکاربرد برای اسکریپت‌نویسی، پردازش داده، هوش مصنوعی و ساخت ابزار.',
    level: 85,
    icon: brand(siPython),
    accent: 'sky',
    category: 'language',
  },
  {
    title: 'HTML',
    description: 'زبان نشانه‌گذاری که ساختار و محتوای هر صفحه‌ی وب را تعریف می‌کند.',
    level: 50,
    icon: brand(siHtml5),
    accent: 'fuchsia',
    category: 'web',
  },
  {
    title: 'CSS',
    description: 'زبان طراحی ظاهر صفحه؛ رنگ، چیدمان، فاصله‌ها، انیمیشن و واکنش‌گرایی.',
    level: 50,
    icon: brand(siCss),
    accent: 'violet',
    category: 'web',
  },
  {
    title: 'TypeScript',
    description: 'جاوااسکریپت به‌همراه نوع‌دهی ایستا؛ خطاها را پیش از اجرا پیدا می‌کند و کد بزرگ را قابل نگه‌داری‌تر می‌کند.',
    level: 50,
    icon: brand(siTypescript),
    accent: 'sky',
    category: 'language',
  },
  {
    title: 'C',
    description: 'زبانی سطح پایین و سریع که با آن حافظه، اشاره‌گرها و پایه‌های تفکر الگوریتمی را یاد گرفتم.',
    level: 50,
    icon: brand(siC),
    accent: 'teal',
    category: 'language',
  },
  {
    title: 'C++',
    description: 'نسخه‌ی شیءگرای C با کتابخانه‌ی استاندارد غنی؛ محبوب در برنامه‌نویسی رقابتی و سیستم‌های پرسرعت.',
    level: 40,
    icon: brand(siCplusplus),
    accent: 'violet',
    category: 'language',
  },
  {
    title: 'Node.js',
    description: 'محیط اجرای جاوااسکریپت در سرور برای ساخت API، بک‌اند و ابزارهای خط فرمان.',
    level: 60,
    icon: brand(siNodedotjs),
    accent: 'teal',
    category: 'web',
  },
  {
    title: 'SQL',
    description: 'زبان کار با پایگاه‌داده‌های رابطه‌ای؛ طراحی جدول، نوشتن کوئری، فیلتر و ترکیب داده‌ها.',
    level: 65,
    icon: lucide(Database),
    accent: 'sky',
    category: 'data-ai',
  },
  {
    title: 'TailwindCSS',
    description: 'فریم‌ورک CSS مبتنی بر کلاس‌های کاربردی برای ساخت سریع رابط‌های واکنش‌گرا و یکدست.',
    level: 55,
    icon: brand(siTailwindcss),
    accent: 'teal',
    category: 'web',
  },
  {
    title: 'GenAI',
    description: 'هوش مصنوعی مولد؛ استفاده از مدل‌های زبانی بزرگ برای تولید متن، کد و ساخت ابزارهای هوشمند.',
    level: 15,
    icon: lucide(Sparkles),
    accent: 'fuchsia',
    category: 'data-ai',
  },
  {
    title: 'Prompt Engineering',
    description: 'نوشتن دستورهای دقیق و ساختارمند برای مدل‌های زبانی تا پاسخ درست و قابل اعتماد بگیرند.',
    level: 65,
    icon: lucide(Brain),
    accent: 'violet',
    category: 'data-ai',
  },
  {
    title: 'حل مسئله',
    description: 'شکستن مسئله‌های بزرگ به بخش‌های کوچک، پیدا کردن الگوریتم مناسب و رسیدن به راه‌حل بهینه.',
    level: 90,
    icon: lucide(Puzzle),
    accent: 'amber',
    category: 'soft',
  },
  {
    title: 'مهارت ارتباطی',
    description: 'گفت‌وگوی روشن با هم‌تیمی‌ها و کارفرما، توضیح ایده‌های فنی به زبان ساده و کار تیمی.',
    level: 75,
    icon: lucide(MessagesSquare),
    accent: 'fuchsia',
    category: 'soft',
  },
]

export type SpokenLanguage = { title: string; native: string; note: string; level: number; accent: Accent }

export const LANGUAGES: readonly SpokenLanguage[] = [
  { title: 'فارسی', native: 'Persian', note: 'زبان مادری', level: 100, accent: 'violet' },
  { title: 'انگلیسی', native: 'English', note: 'خواندن، نوشتن و گفت‌وگوی فنی', level: 78, accent: 'teal' },
]

export type Certificate = {
  /** File name (without extension) in src/assets/certificates. */
  id: string
  title: string
  issuer: string
  accent: Accent
}

export const CERTIFICATES: readonly Certificate[] = [
  { id: 'diploma', title: 'دیپلم متوسطه', issuer: 'آموزش و پرورش', accent: 'violet' },
  { id: 'cs50-python', title: 'CS50 Python', issuer: 'دانشگاه هاروارد (HarvardX)', accent: 'fuchsia' },
  { id: 'cs50-scratch', title: 'CS50 Scratch', issuer: 'دانشگاه هاروارد (HarvardX)', accent: 'amber' },
  {
    id: 'ucmas-mental',
    title: 'آزمون مهارت محاسبات ذهنی - درجه‌ی ۱',
    issuer: 'UCMAS',
    accent: 'teal',
  },
  {
    id: 'ucmas-abacus',
    title: 'آزمون مهارت محاسبه با چرتکه - درجه‌ی ۳',
    issuer: 'UCMAS',
    accent: 'sky',
  },
]

// Any image dropped in src/assets/certificates is picked up here, keyed by its file name.
const certificateFiles = import.meta.glob<string>('../assets/certificates/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

/** URL of a certificate's picture, or undefined while the file is not there yet. */
export function certificateImage(id: string) {
  const match = Object.entries(certificateFiles).find(([path]) => path.split('/').pop()?.split('.')[0] === id)
  return match?.[1]
}
