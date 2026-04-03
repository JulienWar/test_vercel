import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Informations de contact',
  type: 'object',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Téléphone', type: 'string' }),
    defineField({ name: 'address', title: 'Adresse', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Infos contact' }) },
})
