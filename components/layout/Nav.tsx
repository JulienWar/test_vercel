'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' +
        (scrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-border-default shadow-card'
          : 'bg-transparent')
      }
    >
      <nav className="max-w-7xl mx-auto px-space-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-heading font-semibold text-text-primary">
          Logo
        </Link>
        <ul className="flex items-center gap-space-8" role="list">
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    'relative text-body transition-colors duration-200 ' +
                    'after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] ' +
                    'after:bg-text-primary after:transition-all after:duration-300 ' +
                    (isActive
                      ? 'text-text-primary font-semibold after:w-full'
                      : 'text-text-secondary hover:text-text-primary after:w-0 hover:after:w-full')
                  }
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
