// components/ui/Icon.tsx
// Wrapper autour de lucide-react pour appliquer les couleurs SDS
import { LucideIcon } from 'lucide-react'

type IconProps = {
  icon: LucideIcon
  size?: number
  className?: string
}

export default function Icon({ icon: LucideIconComp, size = 24, className = '' }: IconProps) {
  return (
    <span className={`inline-flex items-center justify-center text-text-primary ${className}`}>
      <LucideIconComp size={size} strokeWidth={1.5} />
    </span>
  )
}
