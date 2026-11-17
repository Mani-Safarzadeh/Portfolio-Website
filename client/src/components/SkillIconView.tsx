import type { SkillIcon } from '@/data/skillsData'

/** Draws a skill's icon in the current text color: a brand logo path or a lucide icon. */
function SkillIconView({ icon, size = 20 }: { icon: SkillIcon; size?: number }) {
  if (icon.kind === 'lucide') {
    const Icon = icon.icon
    return <Icon size={size} aria-hidden="true" />
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}

export default SkillIconView
