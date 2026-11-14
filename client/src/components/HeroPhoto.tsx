import maniPhoto from '@/assets/mani.jpg'
import GlowPair from '@/components/GlowPair'

// Wobbly blob outlines (100x100 box). Each one has a few extra bumps and
// twists, so no shape is a plain circle or ellipse.
const BLOBS = {
  round:
    'M50 6C68 4 90 16 94 38C98 58 86 82 64 92C44 100 18 90 8 68C-2 46 10 24 28 14C35 9 42 7 50 6Z',
  twist:
    'M52 4C72 2 96 22 90 46C86 64 100 76 78 90C56 104 30 92 18 74C8 58 20 52 12 38C4 22 32 6 52 4Z',
  leaf: 'M14 52C10 26 36 4 62 8C88 12 98 36 88 60C80 80 56 96 36 90C22 86 16 70 14 52Z',
} as const

type DecorPair = {
  /** Where the pair sits. Small negative offsets keep most of it behind the photo. */
  position: string
  /** Width and tilt. */
  look: string
  colors: [string, string]
  paths: [string, string]
  /** Delay (ms) before it pops in. */
  delay: number
}

// Drawn before the photo, so the photo hides most of each pair and only a
// glowing edge peeks out.
const DECOR_PAIRS: DecorPair[] = [
  {
    position: '-top-5 -end-7',
    look: 'w-32 -rotate-12',
    colors: ['#e879f9', '#a78bfa'], // fuchsia, violet
    paths: [BLOBS.round, BLOBS.twist],
    delay: 350,
  },
  {
    position: '-bottom-5 -start-9',
    look: 'w-36 rotate-6',
    colors: ['#fcd34d', '#fdba74'], // gold, soft orange
    paths: [BLOBS.leaf, BLOBS.round],
    delay: 550,
  },
  {
    position: 'top-8 -start-7',
    look: 'w-24 -rotate-45',
    colors: ['#22d3ee', '#60a5fa'], // cyan, sky
    paths: [BLOBS.twist, BLOBS.leaf],
    delay: 750,
  },
  {
    position: 'bottom-10 -end-8',
    look: 'w-28 rotate-12',
    colors: ['#34d399', '#2dd4bf'], // green, teal
    paths: [BLOBS.round, BLOBS.twist],
    delay: 950,
  },
]

/** Round-cornered photo with a soft glow and glassy colored shapes peeking out from behind it. */
function HeroPhoto() {
  return (
    <div className="relative w-44 shrink-0 animate-pop [animation-delay:100ms] md:w-52 lg:w-64 row:w-56">
      <div
        aria-hidden="true"
        className="absolute inset-4 rounded-full bg-linear-to-br from-violet-500 via-fuchsia-500 to-cyan-400 opacity-40 blur-3xl dark:opacity-30"
      />

      {DECOR_PAIRS.map(({ position, look, colors, paths, delay }) => (
        <div
          key={position}
          className={`pointer-events-none absolute animate-pop ${position}`}
          style={{ animationDelay: `${delay}ms` }}
        >
          <GlowPair
            colors={colors}
            paths={paths}
            className={`animate-float ${look}`}
            style={{ animationDelay: `-${delay}ms` }}
          />
        </div>
      ))}

      <img
        src={maniPhoto}
        alt="مانی صفرزاده"
        width={720}
        height={900}
        className="relative aspect-10/11 w-full rounded-[50%_50%_48%_52%/50%_50%_50%_50%] object-cover object-top shadow-2xl ring-4 shadow-violet-500/20 ring-white/70 dark:ring-slate-800/70"
      />
    </div>
  )
}

export default HeroPhoto
