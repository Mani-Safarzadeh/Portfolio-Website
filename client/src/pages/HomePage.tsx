import AboutSection from '@/components/AboutSection'
import HeroIntro from '@/components/HeroIntro'
import HeroPhoto from '@/components/HeroPhoto'

const ABOUT_ID = 'about-me'

function HomePage() {
  return (
    <>
      {/* Text comes first in the HTML, so in RTL it sits on the right and the photo on the left. */}
      <section className="flex flex-col-reverse items-center gap-14 pt-14 pb-4 row:min-h-[min(calc(100svh-3.5rem),32rem)] row:flex-row row:justify-between row:gap-12">
        <HeroIntro aboutId={ABOUT_ID} />
        <HeroPhoto />
      </section>

      <AboutSection id={ABOUT_ID} />
    </>
  )
}

export default HomePage
