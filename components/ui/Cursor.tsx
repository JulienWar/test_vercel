// components/ui/Cursor.tsx
// Curseur personnalisé avec lag effect GSAP — masqué sur mobile (touch devices)
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ne pas afficher sur les appareils touch
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
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-brand rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-brand rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
    </>
  )
}
