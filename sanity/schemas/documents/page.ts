import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre SEO', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description SEO', type: 'text', rows: 2 }),
    defineField({
      name: 'slug', title: 'URL (slug)', type: 'slug',
      options: { source: 'title' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'blocks', title: 'Blocs de contenu', type: 'array',
      of: [
        { type: 'hero' },
        { type: 'textBlock' },
        { type: 'cardGrid' },
        { type: 'ctaBanner' },
        { type: 'teamGrid' },
        { type: 'contactInfo' },
      ],
    }),
  ],
  preview: { select: { title: 'title', slug: 'slug.current' }, prepare: ({ title, slug }) => ({ title, subtitle: `/${slug}` }) },
})
