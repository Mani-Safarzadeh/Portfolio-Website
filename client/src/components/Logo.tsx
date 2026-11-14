type LogoProps = { className?: string }

/**
 * "MSz" monogram drawn as geometric strokes (no font needed, so it looks the
 * same everywhere). "M" follows the text color; "S" and "z" share one accent
 * color. Keep it in sync with public/favicon.svg.
 */
function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 84 48"
      className={className}
      role="img"
      aria-label="MSz"
      fill="none"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 40V8L18 28L32 8V40" stroke="currentColor" />
      <g className="stroke-violet-600 dark:stroke-violet-400">
        <path d="M58 8H46Q40 8 40 14V18Q40 24 46 24H52Q58 24 58 30V34Q58 40 52 40H40" />
        <path d="M64 24H80L64 40H80" />
      </g>
    </svg>
  )
}

export default Logo
