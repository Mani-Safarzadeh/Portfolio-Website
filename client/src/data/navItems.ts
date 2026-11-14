import { FileText, Mail, User, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavItem = { label: string; to: string; icon: LucideIcon }

/** Site pages. Shared by the navbar and the footer, so a new page only needs to be added here. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'معرفی', to: '/', icon: User },
  { label: 'مقالات', to: '/articles', icon: FileText },
  { label: 'مهارت‌ها', to: '/skills', icon: Wrench },
  { label: 'ارتباط با من', to: '/contact', icon: Mail },
]
