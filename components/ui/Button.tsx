import Link from 'next/link'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  href?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({
  children,
  onClick,
  disabled,
  href,
  type = 'button',
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-space-2 px-space-3 py-space-3 ' +
    'bg-brand text-on-brand border border-border-brand rounded-md ' +
    'text-body font-normal leading-none ' +
    'transition-transform duration-200 ' +
    'hover:scale-[1.02] hover:shadow-card ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ' +
    className

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
