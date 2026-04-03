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
