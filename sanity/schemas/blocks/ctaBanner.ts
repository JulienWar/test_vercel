import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaBanner',
  title: 'Bannière CTA',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre accrocheur', type: 'string', validation: r => r.required() }),
    defineField({ name: 'ctaLabel', title: 'Texte du bouton', type: 'string', validation: r => r.required() }),
    defineField({ name: 'ctaHref', title: 'Lien du bouton', type: 'string', validation: r => r.required() }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `CTA: ${title}` }) },
})
