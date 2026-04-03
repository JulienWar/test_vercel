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
