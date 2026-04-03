// components/sections/TextBlock.tsx
import Image from 'next/image'

type TextBlockProps = {
  title: string
  body: string
  image?: { url: string; alt: string }
  imagePosition?: 'left' | 'right'
}

export default function TextBlock({
  title,
  body,
  image,
  imagePosition = 'right',
}: TextBlockProps) {
  return (
    <section className="py-space-12 px-space-6" data-gsap="text-block">
      <div
        className={
          'max-w-7xl mx-auto grid gap-space-12 items-center ' +
          (image ? 'md:grid-cols-2' : '')
        }
      >
        {image && imagePosition === 'left' && (
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden" data-gsap="reveal-image">
            <Image src={image.url} alt={image.alt} fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-col gap-space-4" data-gsap="reveal-text">
          <h2 className="text-title-page font-bold text-text-primary leading-[1.2] tracking-[-0.02em]">
            {title}
          </h2>
          <p className="text-body text-text-secondary leading-relaxed whitespace-pre-line">{body}</p>
        </div>
        {image && imagePosition === 'right' && (
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden" data-gsap="reveal-image">
            <Image src={image.url} alt={image.alt} fill className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}
