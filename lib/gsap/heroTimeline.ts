// lib/gsap/heroTimeline.ts
// Timeline d'entrée du Hero — jouée une seule fois par session (sessionStorage)
// Cible les éléments [data-gsap="hero-*"] dans le composant Hero.tsx
import gsap from 'gsap'

const SESSION_KEY = 'hero-animated'

export function initHeroTimeline(container: HTMLElement): gsap.core.Timeline | null {
  // Ne joue qu'une fois par session navigateur
  if (sessionStorage.getItem(SESSION_KEY)) {
    // Afficher directement sans animation
    gsap.set('[data-gsap="hero-content"]', { opacity: 1, y: 0 })
    gsap.set('[data-gsap="hero-image"]', { opacity: 1, x: 0 })
    return null
  }

  const title = container.querySelector('[data-gsap="hero-title"]')
  const subtitle = container.querySelector('[data-gsap="hero-subtitle"]')
  const cta = container.querySelector('[data-gsap="hero-cta"]')
  const image = container.querySelector('[data-gsap="hero-image"]')

  const tl = gsap.timeline({
    onComplete: () => sessionStorage.setItem(SESSION_KEY, '1'),
    defaults: { ease: 'power3.out' },
  })

  // 1. Masquer les éléments au départ
  gsap.set([title, subtitle, cta, image], { opacity: 0 })
  gsap.set(title, { y: 60 })
  gsap.set(subtitle, { y: 30 })
  gsap.set(cta, { y: 20 })
  gsap.set(image, { x: 40 })

  // 2. Séquence orchestrée
  tl
    .to(title, { opacity: 1, y: 0, duration: 1 }, 0.2)
    .to(subtitle, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
    .to(cta, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
    .to(image, { opacity: 1, x: 0, duration: 1 }, 0.4)

  return tl
}
