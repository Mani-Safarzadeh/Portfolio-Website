import HeroIntro from '@/components/HeroIntro'
import HeroPhoto from '@/components/HeroPhoto'

const ABOUT_ID = 'about-me'

function HomePage() {
  return (
    <>
      {/* Text comes first in the HTML, so in RTL it sits on the right and the photo on the left. */}
      <section className="flex flex-col-reverse items-center gap-14 pt-14 pb-12 row:min-h-[min(calc(100svh-3.5rem),36rem)] row:flex-row row:justify-between row:gap-12">
        <HeroIntro aboutId={ABOUT_ID} />
        <HeroPhoto />
      </section>

      <section id={ABOUT_ID} className="min-h-[calc(100svh-3.5rem)] scroll-mt-14 py-16">
        <h2 className="font-title text-2xl font-bold md:text-3xl">درباره من</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">این بخش به‌زودی تکمیل می‌شود.</p>
      </section>
    </>
  )
}

export default HomePage
