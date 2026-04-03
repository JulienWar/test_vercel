// components/sections/CardGrid.tsx
// Les cards sont animées en stagger par GSAP ScrollTrigger (data-gsap attrs requis)
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

type CardItem = {
  _key: string
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
}

type CardGridProps = {
  sectionTitle?: string
  cards: CardItem[]
}

export default function CardGrid({ sectionTitle, cards }: CardGridProps) {
  return (
    <section className="py-space-12 px-space-6" data-gsap="card-grid">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-8">
        {sectionTitle && (
          <h2 className="text-title-page font-bold text-text-primary leading-[1.2] tracking-[-0.02em]">
            {sectionTitle}
          </h2>
        )}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-6"
          data-gsap="card-grid-items"
        >
          {cards.map((card) => (
            <div key={card._key} data-gsap="card">
              <Card title={card.title} description={card.description}>
                {card.ctaLabel && card.ctaHref && (
                  <Button href={card.ctaHref}>{card.ctaLabel}</Button>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
