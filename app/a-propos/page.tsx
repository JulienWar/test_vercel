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
