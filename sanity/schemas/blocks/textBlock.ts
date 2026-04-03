import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Bloc texte + image',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: r => r.required() }),
    defineField({ name: 'body', title: 'Texte', type: 'text', rows: 5 }),
    defineField({
      name: 'image', title: 'Image', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
    }),
    defineField({
      name: 'imagePosition', title: "Position de l'image", type: 'string',
      options: { list: [{ title: 'Gauche', value: 'left' }, { title: 'Droite', value: 'right' }], layout: 'radio' },
      initialValue: 'right',
    }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Texte: ${title}` }) },
})
