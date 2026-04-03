import { render, screen } from '@testing-library/react'
import Nav from '@/components/layout/Nav'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ href, children, className, 'aria-current': ariaCurrent }: { href: string; children: React.ReactNode; className?: string; 'aria-current'?: string }) {
    return <a href={href} className={className} aria-current={ariaCurrent}>{children}</a>
  }
})

describe('Nav', () => {
  it('affiche les 4 liens de navigation', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /accueil/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /à propos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('marque le lien actif avec aria-current="page"', () => {
    render(<Nav />)
    const homeLink = screen.getByRole('link', { name: /accueil/i })
    expect(homeLink).toHaveAttribute('aria-current', 'page')
  })
})
