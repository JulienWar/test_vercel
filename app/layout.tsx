import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/tokens.css'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
