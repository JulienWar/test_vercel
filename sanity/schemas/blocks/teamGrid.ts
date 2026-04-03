import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamGrid',
  title: 'Équipe',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Titre de section', type: 'string' }),
    defineField({
      name: 'members', title: 'Membres', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Nom', type: 'string', validation: r => r.required() }),
          defineField({ name: 'role', title: 'Rôle', type: 'string' }),
          defineField({
            name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true },
            fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
          }),
        ],
      }],
    }),
  ],
  preview: { select: { title: 'sectionTitle' }, prepare: ({ title }) => ({ title: `Équipe: ${title || ''}` }) },
})
