import { BookOpen, Briefcase, Clock, Code2, Globe, Languages, MessageCircleQuestion } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Accent } from '@/data/accents'

/** Which social link becomes a contact card, and what it is best for. `label` must match SOCIAL_LINKS. */
export type ContactMethod = { label: string; hint: string; accent: Accent; featured?: boolean }

export const CONTACT_METHODS: readonly ContactMethod[] = [
  { label: 'ایمیل', hint: 'برای همکاری، پروژه و فرصت‌های شغلی', accent: 'violet', featured: true },
  { label: 'تلگرام', hint: 'سریع‌ترین راه برای یک سؤال کوتاه', accent: 'sky' },
  { label: 'LinkedIn', hint: 'ارتباط کاری و دیدن سوابق', accent: 'teal' },
  { label: 'GitHub', hint: 'کدها و پروژه‌های من', accent: 'fuchsia' },
  { label: 'اینستاگرام', hint: 'نگاهی غیررسمی‌تر به زندگی من', accent: 'amber' },
]

export type Reason = { title: string; text: string; icon: LucideIcon; accent: Accent }

export const REASONS: readonly Reason[] = [
  {
    title: 'همکاری در پروژه',
    text: 'ساخت بک‌اند، API و ابزارهای مبتنی بر هوش مصنوعی',
    icon: Briefcase,
    accent: 'violet',
  },
  {
    title: 'سؤال فنی',
    text: 'برنامه‌نویسی، الگوریتم، Node.js و پایتون',
    icon: MessageCircleQuestion,
    accent: 'fuchsia',
  },
  {
    title: 'مسیر یادگیری',
    text: 'از کجا شروع کنم؟ تجربه‌ی خودم را از C تا بک‌اند با شما در میان می‌گذارم',
    icon: BookOpen,
    accent: 'amber',
  },
  {
    title: 'بازخورد درباره‌ی سایت',
    text: 'ایده، پیشنهاد یا باگی دیدید؟ خوشحال می‌شوم بشنوم',
    icon: Code2,
    accent: 'teal',
  },
]

export type Fact = { label: string; value: string; icon: LucideIcon }

// Review these three lines: they are placeholders for your real answers.
export const FACTS: readonly Fact[] = [
  { label: 'زمان پاسخ', value: 'معمولاً ظرف ۱ تا ۲ روز', icon: Clock },
  { label: 'زبان‌ها', value: 'فارسی و انگلیسی', icon: Languages },
  { label: 'منطقه‌ی زمانی', value: 'ایران (UTC+3:30)', icon: Globe },
]

export type Faq = { question: string; answer: string }

export const FAQ: readonly Faq[] = [
  {
    question: 'برای پروژه‌های فریلنسری آزاد هستید؟',
    answer:
      'بسته به حجم کار و زمان‌بندی، بله. موضوع پروژه و بازه‌ی زمانی را برایم بنویسید تا با هم ببینیم.',
  },
  {
    question: 'روی چه فناوری‌هایی کار می‌کنید؟',
    answer:
      'بیشتر بک‌اند با Node.js و Express، پایتون، SQL و تایپ‌اسکریپت. در سمت فرانت‌اند هم با React و Tailwind کار می‌کنم. جزئیات در صفحه‌ی مهارت‌ها هست.',
  },
  {
    question: 'بهترین راه برای تماس چیست؟',
    answer: 'ایمیل برای موضوع‌های کاری و تلگرام برای سؤال‌های کوتاه. پیام اول را کامل بنویسید تا زودتر پاسخ بگیرید.',
  },
  {
    question: 'می‌توانم درباره‌ی مسیر برنامه‌نویسی از شما مشاوره بگیرم؟',
    answer: 'در حد تجربه‌ی خودم بله، با کمال میل. فقط توقع مشاوره‌ی رسمی نداشته باشید.',
  },
]
