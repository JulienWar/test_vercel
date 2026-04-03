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
