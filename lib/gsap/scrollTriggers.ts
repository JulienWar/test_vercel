// lib/gsap/scrollTriggers.ts
// À appeler dans les composants via useGSAP() de @gsap/react
// Chaque fonction retourne une config ScrollTrigger prête à l'emploi
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { staggerReveal, fadeUp, parallax } from './animations'

gsap.registerPlugin(ScrollTrigger)

/**
 * Anime les cards d'une grille en stagger au scroll.
 * Cibler les éléments [data-gsap="card"] dans le container.
 */
export function initCardGridAnimation(container: HTMLElement) {
  const cards = container.querySelectorAll('[data-gsap="card"]')
  return staggerReveal(cards, 0.12)
}

/**
 * Anime un bloc texte + image au scroll.
 */
export function initTextBlockAnimation(container: HTMLElement) {
  const text = container.querySelector('[data-gsap="reveal-text"]')
  const image = container.querySelector('[data-gsap="reveal-image"]')

  if (text) {
    gsap.from(text, {
      x: -40, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: text, start: 'top 80%' },
    })
  }
  if (image) {
    gsap.from(image, {
      x: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: image, start: 'top 80%' },
    })
  }
}

/**
 * Parallaxe sur une image hero.
 */
export function initHeroParallax(imageEl: HTMLElement) {
  return gsap.to(imageEl, {
    ...parallax(imageEl, -15),
    scrollTrigger: {
      trigger: imageEl,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/**
 * Nav qui s'assombrit au scroll — géré en CSS dans Nav.tsx.
 * Cette fonction peut être utilisée pour des effets supplémentaires.
 */
export function initScrollProgress() {
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      document.documentElement.style.setProperty(
        '--scroll-progress',
        String(self.progress)
      )
    },
  })
}
