type AvatarProps = { className?: string }

/** Default profile picture: a grey circle with a head and shoulders, like a messenger with no photo. */
function Avatar({ className = '' }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-11 shrink-0 overflow-hidden rounded-full bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500 ${className}`}
    >
      <svg viewBox="0 0 40 40" className="size-full" fill="currentColor">
        <circle cx="20" cy="15" r="7" />
        <path d="M5 40c0-9.5 6.5-15 15-15s15 5.5 15 15z" />
      </svg>
    </span>
  )
}

export default Avatar
