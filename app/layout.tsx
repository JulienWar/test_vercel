import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/tokens.css'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Site Vitrine',
  description: 'Site vitrine professionnel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
