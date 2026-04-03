import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Bloc Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre principal',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaLabel',
      title: "Texte du bouton",
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Lien du bouton',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
    }),
    defineField({
      name: 'variant',
      title: 'Variante',
      type: 'string',
      options: {
        list: [
          { title: 'Fond clair', value: 'default' },
          { title: 'Fond sombre (brand)', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle' },
    prepare: ({ title, subtitle }) => ({ title: `Hero: ${title}`, subtitle }),
  },
})
