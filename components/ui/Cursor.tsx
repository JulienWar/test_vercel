'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.documentElement.style.cursor = 'none'

    const dot = dotRef.current!
    const ring = ringRef.current!

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <>
      {/* Dot — effet négatif : blanc sur fond sombre, noir sur fond clair */}
      <div
        ref={dotRef}
        style={{ mixBlendMode: 'difference' }}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      {/* Ring — effet négatif avec lag */}
      <div
        ref={ringRef}
        style={{ mixBlendMode: 'difference' }}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
    </>
  )
}
