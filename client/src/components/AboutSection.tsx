import { GraduationCap, Heart, Lightbulb, Target, User, type LucideIcon } from 'lucide-react'
import AboutCard from '@/components/AboutCard'
import type { Accent } from '@/data/accents'

// One entry per paragraph.
const ABOUT_PARAGRAPHS = [
  'سال 1401 خیلی اتفاقی با برنامه‌نویسی آشنا شدم، یکی از سال بالایی هامون کارسوق آشنایی با برنامه‌نویسی برگزار کرد و من شرکت کردم و به ادامه همون کارسوق کلاس های پژوهشی مدرسه برای برنامه‌نویسی رو شرکت کردم و اولین تجربه برنامه‌نویسی و تفکر الگوریتمی رو با زبان C بدست آوردم.',
  'علاقه‌ی زیادی به مباحث برنامه‌نویسی پیدا کردم و به سراغ یادگیری سی پلاس پلاس، HTML، CSS و جاوااسکریپت و در نهایت پایتون و SQL رفتم، مدرک CS50P دانشگاه هاروارد رو گرفتم و بعد از تسلط به پایتون، برنامه‌نویسی بک‌اند با node.js رو یادگرفتم و اکنون در شرکت arch-nc فعالیت میکنم.',
] as const

type Topic = {
  title: string
  /** The text of this card only. Add more strings for more paragraphs. */
  paragraphs: readonly string[]
  icon: LucideIcon
  accent: Accent
}

// Each card has its own text: edit the `paragraphs` of the card you want.
const TOPICS: readonly Topic[] = [
  {
    title: 'اهداف شغلی',
    paragraphs: ['پیدا کردن تخصص در برنامه‌نویسی Agentic و پیاده سازی ایده های نوین'],
    icon: Target,
    accent: 'fuchsia',
  },
  {
    title: 'فلسفه‌ی کاری',
    paragraphs: ['پیدا کردن نقشه راه الگوریتمی مسائل و بخش بندی کردن آن ها به مسائل کوچک تر و قابل مدیریت تر'],
    icon: Lightbulb,
    accent: 'amber',
  },
  {
    title: 'علاقه‌مندی‌ها',
    paragraphs: ['حل مسائل الگوریتمی، بررسی و تحلیل سیستم ها، وایبکدینگ، کلش رویال'],
    icon: Heart,
    accent: 'teal',
  },
  {
    title: 'پس‌زمینه‌ی درسی',
    paragraphs: ['تحصیل کرده در مدرسه تیزهوشان رشت، رتبه 216 کنکور سراسری، دانشجوی علوم کامپیوتر'],
    icon: GraduationCap,
    accent: 'sky',
  },
]

type AboutSectionProps = {
  /** id used by the hero button to scroll here. */
  id: string
}

/**
 * "About me": one tall card (35% wide from `lg`, full width and on top below that)
 * and a 2x2 grid of topic cards (a single column on small screens).
 */
function AboutSection({ id }: AboutSectionProps) {
  return (
    <section id={id} className="flex scroll-mt-14 flex-col gap-4 pt-6 pb-12 lg:flex-row">
      {/* First in the HTML = on the right in RTL. */}
      <AboutCard
        title="درباره من"
        heading="h2"
        paragraphs={ABOUT_PARAGRAPHS}
        icon={User}
        accent="violet"
        justify
        className="lg:w-[35%] lg:shrink-0"
      />

      <div className="grid grid-cols-1 gap-4 lg:flex-1 lg:grid-cols-2">
        {TOPICS.map(({ title, paragraphs, icon, accent }, index) => (
          <AboutCard
            key={title}
            title={title}
            paragraphs={paragraphs}
            icon={icon}
            accent={accent}
            centered
            delay={index * 120}
          />
        ))}
      </div>
    </section>
  )
}

export default AboutSection
