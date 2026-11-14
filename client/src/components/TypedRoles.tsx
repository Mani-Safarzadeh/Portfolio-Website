import { useTypewriter } from '@/hooks/useTypewriter'

const ROLES = ['برنامه‌نویس بک‌اند', 'دانشجوی علوم ‌کامپیوتر', 'عضو arch-nc']

// Left-to-right mark: keeps a half-typed "arch-" from flipping its hyphen to the wrong side.
const LRM = '‎'

type TypedRolesProps = { className?: string }

function TypedRoles({ className }: TypedRolesProps) {
  const text = useTypewriter(ROLES)

  return (
    <p className={className}>
      {/* Screen readers get the full list once, not every typed letter. */}
      <span className="sr-only">{ROLES.join('، ')}</span>
      <span aria-hidden="true">
        {text}
        {LRM}
        <span className="ms-1 inline-block h-[1.1em] w-0.5 translate-y-[0.2em] animate-blink bg-current" />
      </span>
    </p>
  )
}

export default TypedRoles
