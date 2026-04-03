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
