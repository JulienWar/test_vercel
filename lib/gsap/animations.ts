// lib/gsap/animations.ts
// Fonctions d'animation réutilisables — toujours appeler via gsap.context() dans les composants
// pour le cleanup automatique au démontage (gsap.context().revert())
import gsap from 'gsap'

/**
 * Fondu + slide depuis le bas.
 * @param target - sélecteur CSS ou élément DOM
 * @param delay - délai en secondes (défaut 0)
 */
export function fadeUp(target: gsap.TweenTarget, delay = 0) {
  return gsap.from(target, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'power3.out',
  })
}

/**
 * Apparition en cascade (stagger) pour une liste d'éléments.
 * @param targets - sélecteur CSS ou NodeList
 * @param staggerDelay - délai entre chaque élément (défaut 0.1s)
 */
export function staggerReveal(targets: gsap.TweenTarget, staggerDelay = 0.1) {
  return gsap.from(targets, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: staggerDelay,
    ease: 'power2.out',
  })
}

/**
 * Révélation par masque clip-path (de bas en haut).
 * @param target - sélecteur CSS ou élément DOM
 */
export function maskReveal(target: gsap.TweenTarget) {
  return gsap.from(target, {
    clipPath: 'inset(100% 0 0 0)',
    duration: 1,
    ease: 'power4.out',
  })
}

/**
 * Parallaxe au scroll — à combiner avec ScrollTrigger.
 * @param target - élément DOM
 * @param yPercent - déplacement vertical en % (défaut -20)
 */
export function parallax(target: gsap.TweenTarget, yPercent = -20) {
  return gsap.to(target, {
    yPercent,
    ease: 'none',
  })
}
