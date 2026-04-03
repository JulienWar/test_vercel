import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cardGrid',
  title: 'Grille de cards',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Titre de section', type: 'string' }),
    defineField({
      name: 'cards', title: 'Cards', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string', validation: r => r.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'ctaLabel', title: 'Texte du bouton', type: 'string' }),
          defineField({ name: 'ctaHref', title: 'Lien du bouton', type: 'string' }),
        ],
      }],
    }),
  ],
  preview: { select: { title: 'sectionTitle' }, prepare: ({ title }) => ({ title: `Grille: ${title || 'sans titre'}` }) },
})
