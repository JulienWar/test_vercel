// components/BlockRenderer.tsx
// Ce composant mappe chaque type de bloc Sanity vers son composant React
import Hero from '@/components/sections/Hero'
import CardGrid from '@/components/sections/CardGrid'
import TextBlock from '@/components/sections/TextBlock'
import CtaBanner from '@/components/sections/CtaBanner'
import TeamGrid from '@/components/sections/TeamGrid'
import ContactInfo from '@/components/sections/ContactInfo'

type Block = { _type: string; [key: string]: unknown }

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block._type) {
          case 'hero':
            return <Hero key={i} {...(block as any)} />
          case 'cardGrid':
            return <CardGrid key={i} {...(block as any)} />
          case 'textBlock':
            return <TextBlock key={i} {...(block as any)} />
          case 'ctaBanner':
            return <CtaBanner key={i} {...(block as any)} />
          case 'teamGrid':
            return <TeamGrid key={i} {...(block as any)} />
          case 'contactInfo':
            return (
              <section key={i} className="py-space-12 px-space-6">
                <div className="max-w-7xl mx-auto">
                  <ContactInfo {...(block as any)} />
                </div>
              </section>
            )
          default:
            return null
        }
      })}
    </>
  )
}
