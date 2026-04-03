type CardProps = {
  title: string
  description: string
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export default function Card({ title, description, icon, children, className = '' }: CardProps) {
  return (
    <div
      className={
        'flex flex-col gap-space-4 p-space-6 ' +
        'bg-surface border border-border-default rounded-lg shadow-card ' +
        'transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_4px_16px_var(--sds-color-black-200)] ' +
        className
      }
    >
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="flex flex-col gap-space-2">
        <h3 className="text-heading font-semibold text-text-primary leading-snug">{title}</h3>
        <p className="text-body text-text-secondary leading-relaxed">{description}</p>
      </div>
      {children && <div className="mt-auto">{children}</div>}
    </div>
  )
}
