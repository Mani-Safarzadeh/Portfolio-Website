import { useId } from 'react'
import type { CSSProperties } from 'react'

type GlowPairProps = {
  style?: CSSProperties
  /** Two fill colors, one for each of the two overlapping shapes. */
  colors: [string, string]
  /** Two SVG paths (drawn in a 100x100 box), one for each shape. */
  paths: [string, string]
  className?: string
}

/**
 * Two overlapping, see-through blobs with a bright rim that fades toward the
 * middle, like soft glowing glass. Where they overlap, the colors mix.
 */
function GlowPair({ colors, paths, className, style }: GlowPairProps) {
  // useId returns ":r1:"; colons are awkward inside url(#...), so remove them.
  const id = useId().replace(/:/g, '')

  return (
    <svg viewBox="0 0 150 100" className={className} style={style} aria-hidden="true">
      <defs>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        {colors.map((color, i) => (
          // The gradient center sits on one side, so the opposite rim glows brightest.
          <radialGradient key={i} id={`${id}-g${i}`} cx={i === 0 ? 0.3 : 0.7} cy="0.3" r="0.85">
            <stop offset="0" stopColor={color} stopOpacity="0.05" />
            <stop offset="0.55" stopColor={color} stopOpacity="0.35" />
            <stop offset="1" stopColor={color} stopOpacity="1" />
          </radialGradient>
        ))}
      </defs>
      <g filter={`url(#${id}-soft)`}>
        <path d={paths[0]} fill={`url(#${id}-g0)`} />
        <path d={paths[1]} fill={`url(#${id}-g1)`} transform="translate(50 0)" />
      </g>
    </svg>
  )
}

export default GlowPair
