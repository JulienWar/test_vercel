'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { initHeroTimeline } from '@/lib/gsap/heroTimeline'

type HeroProps = {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  image?: { url: string; alt: string }
  variant?: 'default' | 'dark'
}

export default function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  image,
  variant = 'default',
}: HeroProps) {
  const isDark = variant === 'dark'
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (containerRef.current) {
      initHeroTimeline(containerRef.current)
    }
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className={
        'relative min-h-screen flex items-center pt-16 overflow-hidden ' +
        (isDark ? 'bg-brand text-on-brand' : 'bg-surface text-text-primary')
      }
      data-gsap="hero"
    >
      <div className="max-w-7xl mx-auto px-space-6 w-full grid md:grid-cols-2 gap-space-12 items-center py-space-12">
        <div className="flex flex-col gap-space-6" data-gsap="hero-content">
          <h1
            className="text-title-hero font-bold leading-[1.2] tracking-[-0.03em]"
            data-gsap="hero-title"
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={
                'text-subheading leading-relaxed ' +
                (isDark ? 'text-on-brand/80' : 'text-text-secondary')
              }
              data-gsap="hero-subtitle"
            >
              {subtitle}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <div data-gsap="hero-cta">
              <Button href={ctaHref}>{ctaLabel}</Button>
            </div>
          )}
        </div>
        {image && (
          <div
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
            data-gsap="hero-image"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
