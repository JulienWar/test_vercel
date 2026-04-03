# Site Vitrine Animé — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer un site vitrine Next.js 4 pages avec design system Figma, animations GSAP niveau award, CMS Sanity, et déploiement Vercel.

**Architecture:** Next.js 14 App Router avec Tailwind CSS mappé sur les tokens CSS du Figma SDS. Le contenu est géré via Sanity v3 (ISR), les animations via GSAP ScrollTrigger. Un `CLAUDE.md` permet aux DAs d'intervenir via Claude Code sans briefing.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · GSAP (Club) · Sanity v3 · Resend · Vercel · Jest + React Testing Library · Playwright

---

## Fichiers créés / modifiés

```
test_vercel/
├── CLAUDE.md
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── a-propos/page.tsx
│   ├── services/page.tsx
│   ├── contact/page.tsx
│   └── api/contact/route.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Icon.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── CardGrid.tsx
│   │   ├── TextBlock.tsx
│   │   ├── CtaBanner.tsx
│   │   ├── TeamGrid.tsx
│   │   └── ContactInfo.tsx
│   └── layout/
│       ├── Nav.tsx
│       └── Footer.tsx
├── lib/
│   ├── sanity.ts
│   ├── sanity.queries.ts
│   └── gsap/
│       ├── animations.ts
│       ├── scrollTriggers.ts
│       └── heroTimeline.ts
├── sanity/
│   ├── sanity.config.ts
│   └── schemas/
│       ├── index.ts
│       ├── documents/
│       │   ├── page.ts
│       │   └── siteSettings.ts
│       └── blocks/
│           ├── hero.ts
│           ├── textBlock.ts
│           ├── cardGrid.ts
│           ├── ctaBanner.ts
│           ├── teamGrid.ts
│           └── contactInfo.ts
├── styles/
│   └── tokens.css
├── __tests__/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── Card.test.tsx
│   │   ├── Nav.test.tsx
│   │   └── ContactForm.test.tsx
│   └── api/
│       └── contact.test.ts
└── e2e/
    ├── home.spec.ts
    ├── navigation.spec.ts
    └── contact.spec.ts
```

---

## Phase 1 — Scaffold & Configuration

### Task 1 : Initialisation du projet Next.js

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`

- [ ] **Step 1 : Initialiser le projet**

```bash
cd C:/Users/warin/Desktop/test_vercel
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

Répondre :
- Would you like to use `src/` directory? → **No**
- Would you like to use Turbopack? → **No**

- [ ] **Step 2 : Installer les dépendances**

```bash
npm install gsap @gsap/react sanity next-sanity @sanity/image-url resend
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @types/jest ts-jest @playwright/test
```

> **Note GSAP Club :** SplitText et MorphSVG nécessitent un abonnement GSAP Club. Si non disponible, remplacer SplitText par une implémentation manuelle (split sur les mots) et MorphSVG par des animations CSS clip-path.

- [ ] **Step 3 : Configurer Jest**

Créer `jest.config.ts` :

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEach: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
}

export default createJestConfig(config)
```

Créer `jest.setup.ts` :

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4 : Configurer Playwright**

```bash
npx playwright install --with-deps chromium
```

Créer `playwright.config.ts` :

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

- [ ] **Step 5 : Vérifier que le projet démarre**

```bash
npm run dev
```

Ouvrir http://localhost:3000 — la page Next.js par défaut doit s'afficher.

- [ ] **Step 6 : Commit**

```bash
git init
git remote add origin https://github.com/JulienWar/test_vercel.git
git add .
git commit -m "feat: initialisation Next.js 14 avec Tailwind, Jest, Playwright"
```

---

### Task 2 : Design tokens & Tailwind

**Files:**
- Create: `styles/tokens.css`
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx` (import tokens.css)

- [ ] **Step 1 : Créer `styles/tokens.css`**

```css
/* styles/tokens.css — Source: Figma Simple Design System (A4JtPsWMATxSVnAlKoUZMz) */
/* NE PAS MODIFIER directement — mettre à jour depuis Figma puis régénérer */

:root {
  /* ─── Couleurs Background ─── */
  --sds-color-background-default-default: #ffffff;
  --sds-color-background-brand-default: #2c2c2c;

  /* ─── Couleurs Text ─── */
  --sds-color-text-default-default: #1e1e1e;
  --sds-color-text-default-secondary: #757575;
  --sds-color-text-brand-on-brand: #f5f5f5;

  /* ─── Couleurs Border ─── */
  --sds-color-border-default-default: #d9d9d9;
  --sds-color-border-brand-default: #2c2c2c;
  --sds-color-border-neutral-secondary: #767676;

  /* ─── Couleurs Shadow ─── */
  --sds-color-black-100: rgba(12, 12, 13, 0.05);
  --sds-color-black-200: rgba(12, 12, 13, 0.10);

  /* ─── Typographie — Title Hero ─── */
  --sds-typography-title-hero-font-family: 'Inter', sans-serif;
  --sds-typography-title-hero-font-weight: 700;
  --sds-typography-title-hero-size: 72px;

  /* ─── Typographie — Title Page ─── */
  --sds-typography-title-page-font-family: 'Inter', sans-serif;
  --sds-typography-title-page-font-weight: 700;
  --sds-typography-title-page-size-base: 48px;

  /* ─── Typographie — Heading ─── */
  --sds-typography-heading-font-family: 'Inter', sans-serif;
  --sds-typography-heading-font-weight: 600;
  --sds-typography-heading-size-base: 24px;

  /* ─── Typographie — Subheading ─── */
  --sds-typography-subheading-font-family: 'Inter', sans-serif;
  --sds-typography-subheading-font-weight: 400;
  --sds-typography-subheading-size-medium: 20px;

  /* ─── Typographie — Body ─── */
  --sds-typography-body-font-family: 'Inter', sans-serif;
  --sds-typography-body-font-weight-regular: 400;
  --sds-typography-body-font-weight-bold: 700;
  --sds-typography-body-size-medium: 16px;
  --sds-typography-body-size-small: 14px;

  /* ─── Espacements ─── */
  --sds-size-space-100: 4px;
  --sds-size-space-200: 8px;
  --sds-size-space-300: 12px;
  --sds-size-space-400: 16px;
  --sds-size-space-600: 24px;
  --sds-size-space-800: 32px;
  --sds-size-space-1200: 48px;

  /* ─── Rayons ─── */
  --sds-size-radius-100: 4px;
  --sds-size-radius-200: 8px;
  --sds-size-radius-400: 16px;
  --sds-size-radius-full: 9999px;

  /* ─── Bordures ─── */
  --sds-size-stroke-border: 1px;

  /* ─── Ombres ─── */
  --sds-size-depth-0: 0px;
  --sds-size-depth-025: 1px;
  --sds-size-depth-100: 4px;
}
```

- [ ] **Step 2 : Configurer `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: 'var(--sds-color-background-brand-default)',
        'on-brand': 'var(--sds-color-text-brand-on-brand)',
        'text-primary': 'var(--sds-color-text-default-default)',
        'text-secondary': 'var(--sds-color-text-default-secondary)',
        'border-default': 'var(--sds-color-border-default-default)',
        'border-brand': 'var(--sds-color-border-brand-default)',
        surface: 'var(--sds-color-background-default-default)',
      },
      borderRadius: {
        sm: 'var(--sds-size-radius-100)',
        md: 'var(--sds-size-radius-200)',
        lg: 'var(--sds-size-radius-400)',
        full: 'var(--sds-size-radius-full)',
      },
      spacing: {
        'space-1': 'var(--sds-size-space-100)',
        'space-2': 'var(--sds-size-space-200)',
        'space-3': 'var(--sds-size-space-300)',
        'space-4': 'var(--sds-size-space-400)',
        'space-6': 'var(--sds-size-space-600)',
        'space-8': 'var(--sds-size-space-800)',
        'space-12': 'var(--sds-size-space-1200)',
      },
      fontSize: {
        'title-hero': 'var(--sds-typography-title-hero-size)',
        'title-page': 'var(--sds-typography-title-page-size-base)',
        heading: 'var(--sds-typography-heading-size-base)',
        subheading: 'var(--sds-typography-subheading-size-medium)',
        body: 'var(--sds-typography-body-size-medium)',
        'body-sm': 'var(--sds-typography-body-size-small)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 4px var(--sds-color-black-200), 0 1px 4px var(--sds-color-black-100)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3 : Mettre à jour `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/tokens.css'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mon Site',
  description: 'Site vitrine',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-surface text-text-primary`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4 : Vérifier le build**

```bash
npm run build
```

Attendu : build sans erreur.

- [ ] **Step 5 : Commit**

```bash
git add styles/tokens.css tailwind.config.ts app/layout.tsx
git commit -m "feat: tokens CSS Figma + config Tailwind"
```

---

## Phase 2 — Composants UI

### Task 3 : Composant Button

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `__tests__/components/Button.test.tsx`

- [ ] **Step 1 : Écrire le test**

```tsx
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/ui/Button'

describe('Button', () => {
  it('affiche son label', () => {
    render(<Button>Envoyer</Button>)
    expect(screen.getByRole('button', { name: 'Envoyer' })).toBeInTheDocument()
  })

  it('appelle onClick au clic', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Cliquer</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('est désactivé quand disabled=true', () => {
    render(<Button disabled>Désactivé</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('rend un lien quand href est fourni', () => {
    render(<Button href="/contact">Lien</Button>)
    expect(screen.getByRole('link', { name: 'Lien' })).toHaveAttribute('href', '/contact')
  })
})
```

- [ ] **Step 2 : Vérifier que le test échoue**

```bash
npx jest __tests__/components/Button.test.tsx
```

Attendu : FAIL — "Cannot find module '@/components/ui/Button'"

- [ ] **Step 3 : Implémenter Button**

```tsx
// components/ui/Button.tsx
import Link from 'next/link'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  href?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({
  children,
  onClick,
  disabled,
  href,
  type = 'button',
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-space-2 px-space-3 py-space-3 ' +
    'bg-brand text-on-brand border border-border-brand rounded-md ' +
    'text-body font-normal leading-none ' +
    'transition-transform duration-200 ' +
    'hover:scale-[1.02] hover:shadow-card ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ' +
    className

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
npx jest __tests__/components/Button.test.tsx
```

Attendu : PASS (4 tests)

- [ ] **Step 5 : Commit**

```bash
git add components/ui/Button.tsx __tests__/components/Button.test.tsx
git commit -m "feat: composant Button avec tests"
```

---

### Task 4 : Composant Card

**Files:**
- Create: `components/ui/Card.tsx`
- Create: `__tests__/components/Card.test.tsx`

- [ ] **Step 1 : Écrire le test**

```tsx
// __tests__/components/Card.test.tsx
import { render, screen } from '@testing-library/react'
import Card from '@/components/ui/Card'

describe('Card', () => {
  it('affiche le titre et la description', () => {
    render(<Card title="Service" description="Description du service" />)
    expect(screen.getByText('Service')).toBeInTheDocument()
    expect(screen.getByText('Description du service')).toBeInTheDocument()
  })

  it('affiche les enfants quand fournis', () => {
    render(<Card title="T" description="D"><span>CTA</span></Card>)
    expect(screen.getByText('CTA')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2 : Vérifier que le test échoue**

```bash
npx jest __tests__/components/Card.test.tsx
```

Attendu : FAIL

- [ ] **Step 3 : Implémenter Card**

```tsx
// components/ui/Card.tsx
type CardProps = {
  title: string
  description: string
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export default function Card({ title, description, icon, children, className = '' }: CardProps) {
  return (
    <div
      className={
        'flex flex-col gap-space-4 p-space-6 ' +
        'bg-surface border border-border-default rounded-lg shadow-card ' +
        'transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_4px_16px_var(--sds-color-black-200)] ' +
        className
      }
    >
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="flex flex-col gap-space-2">
        <h3 className="text-heading font-semibold text-text-primary leading-snug">{title}</h3>
        <p className="text-body text-text-secondary leading-relaxed">{description}</p>
      </div>
      {children && <div className="mt-auto">{children}</div>}
    </div>
  )
}
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
npx jest __tests__/components/Card.test.tsx
```

Attendu : PASS

- [ ] **Step 5 : Commit**

```bash
git add components/ui/Card.tsx __tests__/components/Card.test.tsx
git commit -m "feat: composant Card avec tests"
```

---

### Task 5 : Composant Icon

**Files:**
- Create: `components/ui/Icon.tsx`

- [ ] **Step 1 : Installer lucide-react**

```bash
npm install lucide-react
```

- [ ] **Step 2 : Créer `components/ui/Icon.tsx`**

```tsx
// components/ui/Icon.tsx
// Wrapper autour de lucide-react pour appliquer les couleurs SDS
import { LucideIcon } from 'lucide-react'

type IconProps = {
  icon: LucideIcon
  size?: number
  className?: string
}

export default function Icon({ icon: LucideIcon, size = 24, className = '' }: IconProps) {
  return (
    <span className={`inline-flex items-center justify-center text-text-primary ${className}`}>
      <LucideIcon size={size} strokeWidth={1.5} />
    </span>
  )
}
```

- [ ] **Step 3 : Commit**

```bash
git add components/ui/Icon.tsx
git commit -m "feat: composant Icon wrapper lucide-react"
```

---

## Phase 3 — Layout

### Task 6 : Navigation

**Files:**
- Create: `components/layout/Nav.tsx`
- Create: `__tests__/components/Nav.test.tsx`

- [ ] **Step 1 : Écrire le test**

```tsx
// __tests__/components/Nav.test.tsx
import { render, screen } from '@testing-library/react'
import Nav from '@/components/layout/Nav'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Nav', () => {
  it('affiche les liens de navigation', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /accueil/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /à propos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('marque le lien actif', () => {
    render(<Nav />)
    const homeLink = screen.getByRole('link', { name: /accueil/i })
    expect(homeLink).toHaveAttribute('aria-current', 'page')
  })
})
```

- [ ] **Step 2 : Vérifier que le test échoue**

```bash
npx jest __tests__/components/Nav.test.tsx
```

Attendu : FAIL

- [ ] **Step 3 : Implémenter Nav**

```tsx
// components/layout/Nav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      ref={navRef}
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
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
npx jest __tests__/components/Nav.test.tsx
```

Attendu : PASS

- [ ] **Step 5 : Commit**

```bash
git add components/layout/Nav.tsx __tests__/components/Nav.test.tsx
git commit -m "feat: Nav avec scroll effect et lien actif"
```

---

### Task 7 : Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1 : Créer `components/layout/Footer.tsx`**

```tsx
// components/layout/Footer.tsx
import Link from 'next/link'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-brand text-on-brand border-t border-border-brand">
      <div className="max-w-7xl mx-auto px-space-6 py-space-12 flex flex-col md:flex-row items-center justify-between gap-space-6">
        <span className="text-heading font-semibold">Logo</span>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-space-6" role="list">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-body-sm text-on-brand/70 hover:text-on-brand transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-body-sm text-on-brand/50">
          © {new Date().getFullYear()} — Tous droits réservés
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2 : Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: Footer"
```

---

## Phase 4 — Sections

### Task 8 : Section Hero

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1 : Créer `components/sections/Hero.tsx`**

```tsx
// components/sections/Hero.tsx
// Cette section est animée par lib/gsap/heroTimeline.ts
// Ne pas modifier les data-gsap-* — ils sont ciblés par GSAP
import Button from '@/components/ui/Button'
import Image from 'next/image'

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

  return (
    <section
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
                'text-subheading leading-[1.4] ' +
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
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden" data-gsap="hero-image">
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
```

- [ ] **Step 2 : Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: section Hero avec variantes default/dark"
```

---

### Task 9 : Section CardGrid

**Files:**
- Create: `components/sections/CardGrid.tsx`

- [ ] **Step 1 : Créer `components/sections/CardGrid.tsx`**

```tsx
// components/sections/CardGrid.tsx
// Les cards sont animées en stagger par lib/gsap/scrollTriggers.ts
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

type CardItem = {
  _key: string
  title: string
  description: string
  iconName?: string
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
            <Card
              key={card._key}
              title={card.title}
              description={card.description}
              data-gsap="card"
            >
              {card.ctaLabel && card.ctaHref && (
                <Button href={card.ctaHref}>{card.ctaLabel}</Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2 : Commit**

```bash
git add components/sections/CardGrid.tsx
git commit -m "feat: section CardGrid"
```

---

### Task 10 : Sections TextBlock, CtaBanner, TeamGrid, ContactInfo

**Files:**
- Create: `components/sections/TextBlock.tsx`
- Create: `components/sections/CtaBanner.tsx`
- Create: `components/sections/TeamGrid.tsx`
- Create: `components/sections/ContactInfo.tsx`

- [ ] **Step 1 : Créer `components/sections/TextBlock.tsx`**

```tsx
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
          (image ? 'md:grid-cols-2' : 'max-w-3xl')
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
```

- [ ] **Step 2 : Créer `components/sections/CtaBanner.tsx`**

```tsx
// components/sections/CtaBanner.tsx
import Button from '@/components/ui/Button'

type CtaBannerProps = {
  title: string
  ctaLabel: string
  ctaHref: string
}

export default function CtaBanner({ title, ctaLabel, ctaHref }: CtaBannerProps) {
  return (
    <section
      className="bg-brand py-space-12 px-space-6"
      data-gsap="cta-banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-8">
        <h2 className="text-title-page font-bold text-on-brand leading-[1.2] tracking-[-0.02em]">
          {title}
        </h2>
        <Button
          href={ctaHref}
          className="bg-surface text-text-primary border-surface hover:bg-surface/90"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 3 : Créer `components/sections/TeamGrid.tsx`**

```tsx
// components/sections/TeamGrid.tsx
import Image from 'next/image'

type TeamMember = {
  _key: string
  name: string
  role: string
  photo?: { url: string; alt: string }
}

type TeamGridProps = {
  sectionTitle?: string
  members: TeamMember[]
}

export default function TeamGrid({ sectionTitle, members }: TeamGridProps) {
  return (
    <section className="py-space-12 px-space-6" data-gsap="team-grid">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-8">
        {sectionTitle && (
          <h2 className="text-title-page font-bold text-text-primary leading-[1.2]">
            {sectionTitle}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-6">
          {members.map((member) => (
            <div key={member._key} className="flex flex-col items-center gap-space-3 text-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-border-default">
                {member.photo && (
                  <Image
                    src={member.photo.url}
                    alt={member.photo.alt}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="text-body font-semibold text-text-primary">{member.name}</p>
                <p className="text-body-sm text-text-secondary">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4 : Créer `components/sections/ContactInfo.tsx`**

```tsx
// components/sections/ContactInfo.tsx
import { Mail, Phone, MapPin } from 'lucide-react'

type ContactInfoProps = {
  email?: string
  phone?: string
  address?: string
}

export default function ContactInfo({ email, phone, address }: ContactInfoProps) {
  return (
    <div className="flex flex-col gap-space-4">
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-space-3 text-body text-text-secondary hover:text-text-primary transition-colors"
        >
          <Mail size={20} strokeWidth={1.5} />
          {email}
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-space-3 text-body text-text-secondary hover:text-text-primary transition-colors"
        >
          <Phone size={20} strokeWidth={1.5} />
          {phone}
        </a>
      )}
      {address && (
        <div className="flex items-start gap-space-3 text-body text-text-secondary">
          <MapPin size={20} strokeWidth={1.5} className="shrink-0 mt-0.5" />
          <span>{address}</span>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5 : Commit**

```bash
git add components/sections/
git commit -m "feat: sections TextBlock, CtaBanner, TeamGrid, ContactInfo"
```

---

## Phase 5 — Sanity CMS

### Task 11 : Configuration Sanity

**Files:**
- Create: `sanity/sanity.config.ts`
- Create: `.env.local`, `.env.example`

- [ ] **Step 1 : Créer un projet Sanity**

```bash
npx sanity@latest init --env .env.local
```

Suivre l'assistant :
- Create new project → nommer "test-vercel"
- Dataset → **production**
- Project output path → **sanity/**

- [ ] **Step 2 : Créer `.env.example`**

```bash
# .env.example — copier en .env.local et remplir les valeurs
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_WEBHOOK_SECRET=
RESEND_API_KEY=
CONTACT_EMAIL=
```

- [ ] **Step 3 : Ajouter `.env.local` au `.gitignore`**

Vérifier que `.gitignore` contient :
```
.env.local
```

- [ ] **Step 4 : Créer `sanity/sanity.config.ts`**

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Site Vitrine',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 5 : Commit**

```bash
git add sanity/ .env.example .gitignore
git commit -m "feat: configuration Sanity v3"
```

---

### Task 12 : Schémas Sanity — blocs

**Files:**
- Create: `sanity/schemas/blocks/hero.ts`
- Create: `sanity/schemas/blocks/textBlock.ts`
- Create: `sanity/schemas/blocks/cardGrid.ts`
- Create: `sanity/schemas/blocks/ctaBanner.ts`
- Create: `sanity/schemas/blocks/teamGrid.ts`
- Create: `sanity/schemas/blocks/contactInfo.ts`

- [ ] **Step 1 : Créer `sanity/schemas/blocks/hero.ts`**

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Bloc Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre principal',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaLabel',
      title: "Texte du bouton",
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Lien du bouton',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
    }),
    defineField({
      name: 'variant',
      title: 'Variante',
      type: 'string',
      options: {
        list: [
          { title: 'Fond clair', value: 'default' },
          { title: 'Fond sombre (brand)', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle' },
    prepare: ({ title, subtitle }) => ({ title: `Hero: ${title}`, subtitle }),
  },
})
```

- [ ] **Step 2 : Créer `sanity/schemas/blocks/textBlock.ts`**

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Bloc texte + image',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: r => r.required() }),
    defineField({ name: 'body', title: 'Texte', type: 'text', rows: 5 }),
    defineField({
      name: 'image', title: 'Image', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
    }),
    defineField({
      name: 'imagePosition', title: "Position de l'image", type: 'string',
      options: { list: [{ title: 'Gauche', value: 'left' }, { title: 'Droite', value: 'right' }], layout: 'radio' },
      initialValue: 'right',
    }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Texte: ${title}` }) },
})
```

- [ ] **Step 3 : Créer `sanity/schemas/blocks/cardGrid.ts`**

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cardGrid',
  title: 'Grille de cards',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Titre de section', type: 'string' }),
    defineField({
      name: 'cards', title: 'Cards', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string', validation: r => r.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'ctaLabel', title: 'Texte du bouton', type: 'string' }),
          defineField({ name: 'ctaHref', title: 'Lien du bouton', type: 'string' }),
        ],
      }],
    }),
  ],
  preview: { select: { title: 'sectionTitle' }, prepare: ({ title }) => ({ title: `Grille: ${title || 'sans titre'}` }) },
})
```

- [ ] **Step 4 : Créer `sanity/schemas/blocks/ctaBanner.ts`**

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaBanner',
  title: 'Bannière CTA',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre accrocheur', type: 'string', validation: r => r.required() }),
    defineField({ name: 'ctaLabel', title: 'Texte du bouton', type: 'string', validation: r => r.required() }),
    defineField({ name: 'ctaHref', title: 'Lien du bouton', type: 'string', validation: r => r.required() }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `CTA: ${title}` }) },
})
```

- [ ] **Step 5 : Créer `sanity/schemas/blocks/teamGrid.ts`**

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamGrid',
  title: 'Équipe',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Titre de section', type: 'string' }),
    defineField({
      name: 'members', title: 'Membres', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Nom', type: 'string', validation: r => r.required() }),
          defineField({ name: 'role', title: 'Rôle', type: 'string' }),
          defineField({
            name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true },
            fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
          }),
        ],
      }],
    }),
  ],
  preview: { select: { title: 'sectionTitle' }, prepare: ({ title }) => ({ title: `Équipe: ${title || ''}` }) },
})
```

- [ ] **Step 6 : Créer `sanity/schemas/blocks/contactInfo.ts`**

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Informations de contact',
  type: 'object',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Téléphone', type: 'string' }),
    defineField({ name: 'address', title: 'Adresse', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Infos contact' }) },
})
```

- [ ] **Step 7 : Commit**

```bash
git add sanity/schemas/blocks/
git commit -m "feat: schémas Sanity — blocs"
```

---

### Task 13 : Schémas Sanity — documents

**Files:**
- Create: `sanity/schemas/documents/page.ts`
- Create: `sanity/schemas/documents/siteSettings.ts`
- Create: `sanity/schemas/index.ts`

- [ ] **Step 1 : Créer `sanity/schemas/documents/page.ts`**

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre SEO', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description SEO', type: 'text', rows: 2 }),
    defineField({
      name: 'slug', title: 'URL (slug)', type: 'slug',
      options: { source: 'title' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'blocks', title: 'Blocs de contenu', type: 'array',
      of: [
        { type: 'hero' },
        { type: 'textBlock' },
        { type: 'cardGrid' },
        { type: 'ctaBanner' },
        { type: 'teamGrid' },
        { type: 'contactInfo' },
      ],
    }),
  ],
  preview: { select: { title: 'title', slug: 'slug.current' }, prepare: ({ title, slug }) => ({ title, subtitle: `/${slug}` }) },
})
```

- [ ] **Step 2 : Créer `sanity/schemas/documents/siteSettings.ts`**

```ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'siteName', title: 'Nom du site', type: 'string' }),
    defineField({
      name: 'logo', title: 'Logo', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
    }),
    defineField({
      name: 'navLinks', title: 'Liens de navigation', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Libellé', type: 'string' }),
          defineField({ name: 'href', title: 'URL', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'footerLegal', title: 'Mentions légales (footer)', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Paramètres du site' }) },
})
```

- [ ] **Step 3 : Créer `sanity/schemas/index.ts`**

```ts
import hero from './blocks/hero'
import textBlock from './blocks/textBlock'
import cardGrid from './blocks/cardGrid'
import ctaBanner from './blocks/ctaBanner'
import teamGrid from './blocks/teamGrid'
import contactInfo from './blocks/contactInfo'
import page from './documents/page'
import siteSettings from './documents/siteSettings'

export const schemaTypes = [
  // Documents
  page,
  siteSettings,
  // Blocs
  hero,
  textBlock,
  cardGrid,
  ctaBanner,
  teamGrid,
  contactInfo,
]
```

- [ ] **Step 4 : Commit**

```bash
git add sanity/schemas/
git commit -m "feat: schémas Sanity — documents + index"
```

---

### Task 14 : Client Sanity + queries GROQ

**Files:**
- Create: `lib/sanity.ts`
- Create: `lib/sanity.queries.ts`

- [ ] **Step 1 : Créer `lib/sanity.ts`**

```ts
// lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

- [ ] **Step 2 : Créer `lib/sanity.queries.ts`**

```ts
// lib/sanity.queries.ts
import { client } from './sanity'

const imageFields = `{
  "url": asset->url,
  alt
}`

const blockFields = `
  _type == 'hero' => {
    _type, title, subtitle, ctaLabel, ctaHref, variant,
    "image": image ${imageFields}
  },
  _type == 'textBlock' => {
    _type, title, body, imagePosition,
    "image": image ${imageFields}
  },
  _type == 'cardGrid' => {
    _type, sectionTitle,
    cards[] { _key, title, description, ctaLabel, ctaHref }
  },
  _type == 'ctaBanner' => { _type, title, ctaLabel, ctaHref },
  _type == 'teamGrid' => {
    _type, sectionTitle,
    members[] { _key, name, role, "photo": photo ${imageFields} }
  },
  _type == 'contactInfo' => { _type, email, phone, address }
`

export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title, description,
      blocks[]{ ${blockFields} }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{ siteName, navLinks, footerLegal, "logo": logo ${imageFields} }`,
    {},
    { next: { revalidate: 3600 } }
  )
}
```

- [ ] **Step 3 : Commit**

```bash
git add lib/sanity.ts lib/sanity.queries.ts
git commit -m "feat: client Sanity + queries GROQ"
```

---

## Phase 6 — Pages

### Task 15 : Rendu dynamique des blocs

**Files:**
- Create: `components/BlockRenderer.tsx`

- [ ] **Step 1 : Créer `components/BlockRenderer.tsx`**

```tsx
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
```

- [ ] **Step 2 : Commit**

```bash
git add components/BlockRenderer.tsx
git commit -m "feat: BlockRenderer — mappage blocs Sanity → composants"
```

---

### Task 16 : Pages Home, À propos, Services

**Files:**
- Modify: `app/page.tsx`
- Create: `app/a-propos/page.tsx`
- Create: `app/services/page.tsx`

- [ ] **Step 1 : Modifier `app/page.tsx`**

```tsx
// app/page.tsx
import { getPageBySlug } from '@/lib/sanity.queries'
import BlockRenderer from '@/components/BlockRenderer'

export const revalidate = 60

export default async function HomePage() {
  const page = await getPageBySlug('home')

  if (!page) {
    // Page de fallback tant que Sanity n'est pas configuré
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <p className="text-text-secondary">Contenu à configurer dans Sanity Studio.</p>
      </div>
    )
  }

  return <BlockRenderer blocks={page.blocks ?? []} />
}
```

- [ ] **Step 2 : Créer `app/a-propos/page.tsx`**

```tsx
// app/a-propos/page.tsx
import { getPageBySlug } from '@/lib/sanity.queries'
import BlockRenderer from '@/components/BlockRenderer'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('a-propos')
  return { title: page?.title ?? 'À propos', description: page?.description }
}

export default async function AProposPage() {
  const page = await getPageBySlug('a-propos')
  if (!page) return null
  return <BlockRenderer blocks={page.blocks ?? []} />
}
```

- [ ] **Step 3 : Créer `app/services/page.tsx`**

```tsx
// app/services/page.tsx
import { getPageBySlug } from '@/lib/sanity.queries'
import BlockRenderer from '@/components/BlockRenderer'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('services')
  return { title: page?.title ?? 'Services', description: page?.description }
}

export default async function ServicesPage() {
  const page = await getPageBySlug('services')
  if (!page) return null
  return <BlockRenderer blocks={page.blocks ?? []} />
}
```

- [ ] **Step 4 : Commit**

```bash
git add app/page.tsx app/a-propos/page.tsx app/services/page.tsx
git commit -m "feat: pages Home, À propos, Services connectées à Sanity"
```

---

### Task 17 : Page Contact + API Route

**Files:**
- Create: `app/contact/page.tsx`
- Create: `app/api/contact/route.ts`
- Create: `__tests__/components/ContactForm.test.tsx`
- Create: `__tests__/api/contact.test.ts`

- [ ] **Step 1 : Écrire le test de l'API contact**

```ts
// __tests__/api/contact.test.ts
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

// Mock Resend
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'mock-id', error: null }),
    },
  })),
}))

describe('POST /api/contact', () => {
  it('retourne 200 avec des données valides', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Alice', email: 'alice@test.com', message: 'Bonjour' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })

  it('retourne 400 si le message est vide', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Alice', email: 'alice@test.com', message: '' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('retourne 400 si email est invalide', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Alice', email: 'pas-un-email', message: 'Bonjour' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 2 : Vérifier que le test échoue**

```bash
npx jest __tests__/api/contact.test.ts
```

Attendu : FAIL

- [ ] **Step 3 : Créer `app/api/contact/route.ts`**

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
  }

  if (message.trim().length === 0) {
    return NextResponse.json({ error: 'Message vide' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'contact@ton-domaine.com',
    to: process.env.CONTACT_EMAIL!,
    subject: `Message de ${name} — site vitrine`,
    text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
npx jest __tests__/api/contact.test.ts
```

Attendu : PASS (3 tests)

- [ ] **Step 5 : Créer `app/contact/page.tsx`**

```tsx
// app/contact/page.tsx
'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import ContactInfo from '@/components/sections/ContactInfo'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <>
      <Hero
        title="Parlons-en"
        subtitle="Une question, un projet ? Écrivez-nous."
        variant="dark"
      />
      <section className="py-space-12 px-space-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-space-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-4">
            <div className="flex flex-col gap-space-2">
              <label htmlFor="name" className="text-body font-semibold text-text-primary">Nom</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="border border-border-default rounded-md px-space-3 py-space-3 text-body text-text-primary outline-none focus:border-brand transition-colors"
                placeholder="Votre nom"
              />
            </div>
            <div className="flex flex-col gap-space-2">
              <label htmlFor="email" className="text-body font-semibold text-text-primary">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="border border-border-default rounded-md px-space-3 py-space-3 text-body text-text-primary outline-none focus:border-brand transition-colors"
                placeholder="vous@exemple.com"
              />
            </div>
            <div className="flex flex-col gap-space-2">
              <label htmlFor="message" className="text-body font-semibold text-text-primary">Message</label>
              <textarea
                id="message"
                required
                rows={6}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="border border-border-default rounded-md px-space-3 py-space-3 text-body text-text-primary outline-none focus:border-brand transition-colors resize-none"
                placeholder="Décrivez votre projet..."
              />
            </div>
            <div>
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Envoi...' : 'Envoyer'}
              </Button>
            </div>
            {status === 'success' && (
              <p className="text-body text-green-600">Message envoyé avec succès !</p>
            )}
            {status === 'error' && (
              <p className="text-body text-red-600">Une erreur est survenue. Réessayez.</p>
            )}
          </form>
          <div className="flex flex-col gap-space-6">
            <h2 className="text-heading font-semibold text-text-primary">Nous joindre</h2>
            <ContactInfo
              email="contact@exemple.com"
              phone="+33 1 23 45 67 89"
              address="Paris, France"
            />
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 6 : Commit**

```bash
git add app/contact/page.tsx app/api/contact/route.ts __tests__/api/contact.test.ts
git commit -m "feat: page Contact + API route email via Resend"
```

---

## Phase 7 — Animations GSAP

### Task 18 : Setup GSAP + animations de base

**Files:**
- Create: `lib/gsap/animations.ts`

- [ ] **Step 1 : Créer `lib/gsap/animations.ts`**

```ts
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
```

- [ ] **Step 2 : Commit**

```bash
git add lib/gsap/animations.ts
git commit -m "feat: GSAP animations de base (fadeUp, staggerReveal, maskReveal, parallax)"
```

---

### Task 19 : ScrollTrigger

**Files:**
- Create: `lib/gsap/scrollTriggers.ts`

- [ ] **Step 1 : Créer `lib/gsap/scrollTriggers.ts`**

```ts
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
```

- [ ] **Step 2 : Commit**

```bash
git add lib/gsap/scrollTriggers.ts
git commit -m "feat: GSAP ScrollTrigger — cardGrid, textBlock, parallax"
```

---

### Task 20 : Hero Timeline (séquence signature)

**Files:**
- Create: `lib/gsap/heroTimeline.ts`

- [ ] **Step 1 : Créer `lib/gsap/heroTimeline.ts`**

```ts
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
```

- [ ] **Step 2 : Intégrer la timeline dans `components/sections/Hero.tsx`**

Modifier `components/sections/Hero.tsx` — ajouter en haut du composant :

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { initHeroTimeline } from '@/lib/gsap/heroTimeline'
```

Et dans le corps du composant, avant le `return` :

```tsx
const containerRef = useRef<HTMLElement>(null)

useGSAP(() => {
  if (containerRef.current) {
    initHeroTimeline(containerRef.current)
  }
}, { scope: containerRef })
```

Et sur la balise `<section>` :

```tsx
<section ref={containerRef} data-gsap="hero" ...>
```

- [ ] **Step 3 : Commit**

```bash
git add lib/gsap/heroTimeline.ts components/sections/Hero.tsx
git commit -m "feat: GSAP Hero timeline — séquence signature, 1 fois par session"
```

---

### Task 21 : Curseur personnalisé + transitions de page

**Files:**
- Create: `components/ui/Cursor.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1 : Créer `components/ui/Cursor.tsx`**

```tsx
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
```

- [ ] **Step 2 : Ajouter Cursor dans `app/layout.tsx`**

```tsx
import Cursor from '@/components/ui/Cursor'

// Dans le <body> :
<body className={...}>
  <Cursor />
  <Nav />
  <main>{children}</main>
  <Footer />
</body>
```

- [ ] **Step 3 : Commit**

```bash
git add components/ui/Cursor.tsx app/layout.tsx
git commit -m "feat: curseur personnalisé GSAP avec lag effect"
```

---

## Phase 8 — Déploiement & Documentation

### Task 22 : Configuration Vercel + webhook Sanity

**Files:**
- Create: `vercel.json`
- Create: `app/api/revalidate/route.ts`

- [ ] **Step 1 : Créer `vercel.json`**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

- [ ] **Step 2 : Créer `app/api/revalidate/route.ts`**

```ts
// app/api/revalidate/route.ts
// Webhook Sanity → déclenche la regénération ISR des pages
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('sanity-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const slug = body?.result?.slug?.current

  if (slug) {
    // Revalider la page spécifique
    const pathMap: Record<string, string> = {
      home: '/',
      'a-propos': '/a-propos',
      services: '/services',
    }
    const path = pathMap[slug] ?? `/${slug}`
    revalidatePath(path)
  } else {
    // Revalider toutes les pages
    revalidatePath('/', 'layout')
  }

  return NextResponse.json({ revalidated: true })
}
```

- [ ] **Step 3 : Déployer sur Vercel**

```bash
# Installer Vercel CLI si nécessaire
npm i -g vercel

# Déployer et connecter au repo GitHub
vercel --prod
```

Configurer dans le dashboard Vercel les variables d'environnement :
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `SANITY_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`

- [ ] **Step 4 : Configurer le webhook dans Sanity**

Dans le dashboard Sanity (manage.sanity.io) :
- API → Webhooks → Add webhook
- URL : `https://ton-site.vercel.app/api/revalidate`
- Header : `sanity-webhook-secret: [valeur de SANITY_WEBHOOK_SECRET]`
- Trigger on : Create, Update, Delete

- [ ] **Step 5 : Commit**

```bash
git add vercel.json app/api/revalidate/route.ts
git commit -m "feat: config Vercel + webhook ISR Sanity"
```

---

### Task 23 : CLAUDE.md — documentation pour les DAs

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1 : Créer `CLAUDE.md`**

```markdown
# CLAUDE.md — Site Vitrine

Ce fichier est lu automatiquement par Claude Code. Il documente le projet pour que des DAs puissent intervenir sans briefing.

## Stack

- **Next.js 14** App Router — pas de Pages Router
- **TypeScript** partout
- **Tailwind CSS** avec tokens CSS Figma (`styles/tokens.css`)
- **GSAP** pour les animations — voir `lib/gsap/`
- **Sanity v3** pour le CMS — voir `sanity/`
- **Resend** pour les emails de contact
- **Vercel** pour le déploiement

## Tokens Figma

Tous les tokens sont dans `styles/tokens.css` — variables CSS `--sds-*`.
Tailwind les utilise via `tailwind.config.ts`. Ne JAMAIS hardcoder des couleurs ou tailles — toujours utiliser les tokens ou les classes Tailwind correspondantes.

Pour ajouter un token : l'ajouter dans `styles/tokens.css`, puis dans `tailwind.config.ts`.

## Composants

- `components/ui/` — Button, Card, Icon — atomiques, réutilisables
- `components/sections/` — Hero, CardGrid, TextBlock, CtaBanner, TeamGrid, ContactInfo — blocs de page
- `components/layout/` — Nav, Footer
- `components/BlockRenderer.tsx` — mappe les blocs Sanity vers les composants React

## Ajouter un nouveau bloc de contenu

1. Créer le schéma dans `sanity/schemas/blocks/monBloc.ts`
2. L'ajouter dans `sanity/schemas/index.ts`
3. L'ajouter dans le champ `blocks` de `sanity/schemas/documents/page.ts`
4. Créer le composant dans `components/sections/MonBloc.tsx`
5. L'ajouter dans `components/BlockRenderer.tsx`

## Modifier une animation GSAP

- Animations de base : `lib/gsap/animations.ts`
- ScrollTrigger par section : `lib/gsap/scrollTriggers.ts`
- Séquence Hero (1 fois par session) : `lib/gsap/heroTimeline.ts`
- Les composants utilisent `useGSAP()` de `@gsap/react` + `gsap.context().revert()` au démontage
- Ne pas toucher aux `data-gsap="..."` dans le HTML — ils sont ciblés par GSAP

## Commandes

```bash
npm run dev        # Démarrer en local (http://localhost:3000)
npm run build      # Build de production
npm run lint       # Linter ESLint
npx jest           # Tests unitaires
npx playwright test # Tests E2E (nécessite npm run dev en parallèle)
npx sanity dev     # Démarrer Sanity Studio en local
```

## Variables d'environnement

Copier `.env.example` en `.env.local` et remplir les valeurs.
Ne JAMAIS commiter `.env.local`.

## Déploiement

Chaque push sur `main` déclenche un déploiement automatique sur Vercel.
Les branches créent des URLs de preview.
Sanity publie → webhook → Vercel regénère la page (ISR, ~30s).
```

- [ ] **Step 2 : Commit**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md — documentation pour DAs via Claude Code"
```

---

### Task 24 : Tests E2E Playwright

**Files:**
- Create: `e2e/home.spec.ts`
- Create: `e2e/navigation.spec.ts`
- Create: `e2e/contact.spec.ts`

- [ ] **Step 1 : Créer `e2e/navigation.spec.ts`**

```ts
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

test('la navigation affiche les 4 liens', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /accueil/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /à propos/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /services/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /contact/i })).toBeVisible()
})

test('la navigation vers À propos fonctionne', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /à propos/i }).first().click()
  await expect(page).toHaveURL('/a-propos')
})

test('la navigation vers Services fonctionne', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /services/i }).first().click()
  await expect(page).toHaveURL('/services')
})

test('la navigation vers Contact fonctionne', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /contact/i }).first().click()
  await expect(page).toHaveURL('/contact')
})
```

- [ ] **Step 2 : Créer `e2e/contact.spec.ts`**

```ts
// e2e/contact.spec.ts
import { test, expect } from '@playwright/test'

test('le formulaire de contact est visible', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByLabel('Nom')).toBeVisible()
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Message')).toBeVisible()
  await expect(page.getByRole('button', { name: /envoyer/i })).toBeVisible()
})

test('le formulaire valide les champs requis', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: /envoyer/i }).click()
  // Le navigateur bloque la soumission avec les champs vides (required)
  await expect(page).toHaveURL('/contact')
})
```

- [ ] **Step 3 : Créer `e2e/home.spec.ts`**

```ts
// e2e/home.spec.ts
import { test, expect } from '@playwright/test'

test('la page Home se charge sans erreur', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/.+/)
  // Pas d'erreur console critique
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  await page.waitForLoadState('networkidle')
  expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0)
})

test('le footer est visible', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('footer')).toBeVisible()
})
```

- [ ] **Step 4 : Lancer les tests E2E**

```bash
# Dans un terminal : npm run dev
# Dans un autre terminal :
npx playwright test
```

Attendu : tous les tests PASS.

- [ ] **Step 5 : Commit final**

```bash
git add e2e/
git commit -m "test: tests E2E Playwright — navigation, home, contact"
git push origin main
```

---

## Récapitulatif des commandes clés

```bash
# Dev
npm run dev

# Tests unitaires
npx jest
npx jest --watch           # mode watch
npx jest --coverage        # avec couverture

# Tests E2E (npm run dev doit tourner en parallèle)
npx playwright test
npx playwright test --ui   # interface visuelle

# Sanity Studio
npx sanity dev             # Studio sur http://localhost:3333

# Build & déploiement
npm run build
git push origin main       # déclenche Vercel automatiquement
```

---

## Notes importantes

- **GSAP Club** (SplitText, MorphSVG) : si non disponible, SplitText → split manuel par mots, MorphSVG → animations CSS clip-path
- **Sanity Studio URL** : `ton-projet.sanity.studio` — à configurer après création du projet Sanity
- **Resend** : créer un compte sur resend.com, vérifier le domaine d'envoi, récupérer la clé API
- **Inter font** : chargée via `next/font/google` — pas d'import CSS séparé nécessaire
