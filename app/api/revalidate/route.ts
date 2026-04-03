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
    const pathMap: Record<string, string> = {
      home: '/',
      'a-propos': '/a-propos',
      services: '/services',
    }
    const path = pathMap[slug] ?? `/${slug}`
    revalidatePath(path)
  } else {
    revalidatePath('/', 'layout')
  }

  return NextResponse.json({ revalidated: true })
}
