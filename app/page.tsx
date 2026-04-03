// app/page.tsx
import { getPageBySlug } from '@/lib/sanity.queries'
import BlockRenderer from '@/components/BlockRenderer'

export const revalidate = 60

export default async function HomePage() {
  const page = await getPageBySlug('home')

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <p className="text-text-secondary">Contenu à configurer dans Sanity Studio.</p>
      </div>
    )
  }

  return <BlockRenderer blocks={page.blocks ?? []} />
}
