import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Nom du site', type: 'string' }),
    defineField({
      name: 'logo', title: 'Logo', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
    }),
    defineField({
      name: 'navLinks', title: 'Liens de navigation', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Libellé', type: 'string' }),
          defineField({ name: 'href', title: 'URL', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'footerLegal', title: 'Mentions légales (footer)', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Paramètres du site' }) },
})
