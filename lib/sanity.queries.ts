// lib/sanity.queries.ts
import { client } from './sanity'

const imageFields = `{
  "url": asset->url,
  alt
}`

const blockFields = `
  _type == 'hero' => {
    _type, title, subtitle, ctaLabel, ctaHref, variant,
    "image": image ${imageFields}
  },
  _type == 'textBlock' => {
    _type, title, body, imagePosition,
    "image": image ${imageFields}
  },
  _type == 'cardGrid' => {
    _type, sectionTitle,
    cards[] { _key, title, description, ctaLabel, ctaHref }
  },
  _type == 'ctaBanner' => { _type, title, ctaLabel, ctaHref },
  _type == 'teamGrid' => {
    _type, sectionTitle,
    members[] { _key, name, role, "photo": photo ${imageFields} }
  },
  _type == 'contactInfo' => { _type, email, phone, address }
`

export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title, description,
      blocks[]{ ${blockFields} }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{ siteName, navLinks, footerLegal, "logo": logo ${imageFields} }`,
    {},
    { next: { revalidate: 3600 } }
  )
}
