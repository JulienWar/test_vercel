// components/sections/CtaBanner.tsx
import Button from '@/components/ui/Button'

type CtaBannerProps = {
  title: string
  ctaLabel: string
  ctaHref: string
}

export default function CtaBanner({ title, ctaLabel, ctaHref }: CtaBannerProps) {
  return (
    <section className="bg-brand py-space-12 px-space-6" data-gsap="cta-banner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-8">
        <h2 className="text-title-page font-bold text-on-brand leading-[1.2] tracking-[-0.02em]">
          {title}
        </h2>
        <Button
          href={ctaHref}
          className="!bg-surface !text-text-primary !border-surface hover:!bg-surface/90"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  )
}
