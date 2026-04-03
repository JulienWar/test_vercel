// components/sections/ContactInfo.tsx
import { Mail, Phone, MapPin } from 'lucide-react'

type ContactInfoProps = {
  email?: string
  phone?: string
  address?: string
}

export default function ContactInfo({ email, phone, address }: ContactInfoProps) {
  return (
    <div className="flex flex-col gap-space-4">
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-space-3 text-body text-text-secondary hover:text-text-primary transition-colors"
        >
          <Mail size={20} strokeWidth={1.5} />
          {email}
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-space-3 text-body text-text-secondary hover:text-text-primary transition-colors"
        >
          <Phone size={20} strokeWidth={1.5} />
          {phone}
        </a>
      )}
      {address && (
        <div className="flex items-start gap-space-3 text-body text-text-secondary">
          <MapPin size={20} strokeWidth={1.5} className="shrink-0 mt-0.5" />
          <span>{address}</span>
        </div>
      )}
    </div>
  )
}
