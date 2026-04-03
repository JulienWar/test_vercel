// scripts/seed.mjs
// Remplit Sanity avec du contenu de démo
// Usage : node --env-file=.env.local scripts/seed.mjs

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function uploadImage(url, filename) {
  console.log(`  → Upload ${filename}...`)
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return client.assets.upload('image', buffer, { filename, contentType: 'image/jpeg' })
}

function imgRef(asset, alt = '') {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  }
}

async function main() {
  console.log('🌱 Seeding Sanity...\n')

  // ─── Upload des images ───────────────────────────────────────────────────
  console.log('📸 Upload des images...')
  const [heroImg, aboutImg, valuesImg, team1, team2, team3] = await Promise.all([
    uploadImage('https://picsum.photos/seed/vitrine-hero/1200/800', 'hero.jpg'),
    uploadImage('https://picsum.photos/seed/vitrine-about/900/600', 'about.jpg'),
    uploadImage('https://picsum.photos/seed/vitrine-values/900/600', 'values.jpg'),
    uploadImage('https://picsum.photos/seed/team-sophie/400/400', 'team-sophie.jpg'),
    uploadImage('https://picsum.photos/seed/team-thomas/400/400', 'team-thomas.jpg'),
    uploadImage('https://picsum.photos/seed/team-camille/400/400', 'team-camille.jpg'),
  ])
  console.log('✅ Images uploadées\n')

  // ─── Page Home ───────────────────────────────────────────────────────────
  await client.createOrReplace({
    _id: 'page-home',
    _type: 'page',
    title: 'Accueil — Studio Créatif',
    description: 'Nous créons des expériences digitales qui font la différence.',
    slug: { _type: 'slug', current: 'home' },
    blocks: [
      {
        _key: 'hero-home',
        _type: 'hero',
        title: "Créons ensemble quelque chose d'exceptionnel",
        subtitle: 'Studio créatif spécialisé en design digital, développement web et stratégie de marque.',
        ctaLabel: 'Découvrir nos services',
        ctaHref: '/services',
        variant: 'default',
        image: imgRef(heroImg, 'Studio créatif au travail'),
      },
      {
        _key: 'cardgrid-home',
        _type: 'cardGrid',
        sectionTitle: 'Ce que nous faisons',
        cards: [
          { _key: 'card-1', title: 'Design UI/UX', description: 'Des interfaces élégantes et intuitives qui convertissent et fidélisent vos utilisateurs.' },
          { _key: 'card-2', title: 'Développement Web', description: 'Des sites et applications performants, rapides et accessibles sur tous les appareils.' },
          { _key: 'card-3', title: 'Stratégie Digitale', description: 'Un accompagnement sur-mesure pour définir et exécuter votre présence en ligne.' },
        ],
      },
      {
        _key: 'textblock-home',
        _type: 'textBlock',
        title: 'Une agence à taille humaine',
        body: "Fondée en 2020, notre studio réunit des designers et développeurs passionnés. Nous croyons que le bon design est celui qui sert un objectif clair tout en offrant une expérience mémorable.\n\nNous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins, leur marché et leurs ambitions — puis nous traduisons tout cela en expériences digitales qui font la différence.",
        imagePosition: 'right',
        image: imgRef(aboutImg, "L'équipe au travail"),
      },
      {
        _key: 'ctabanner-home',
        _type: 'ctaBanner',
        title: 'Prêt à lancer votre prochain projet ?',
        ctaLabel: 'Parlons-en',
        ctaHref: '/contact',
      },
    ],
  })
  console.log('✅ Page Home')

  // ─── Page À propos ───────────────────────────────────────────────────────
  await client.createOrReplace({
    _id: 'page-a-propos',
    _type: 'page',
    title: 'À propos — Notre histoire',
    description: "Découvrez qui nous sommes, nos valeurs et l'équipe derrière le studio.",
    slug: { _type: 'slug', current: 'a-propos' },
    blocks: [
      {
        _key: 'hero-about',
        _type: 'hero',
        title: 'Qui sommes-nous',
        subtitle: "Un studio créatif indépendant, fondé sur la passion du design et de la technologie.",
        variant: 'dark',
      },
      {
        _key: 'textblock-histoire',
        _type: 'textBlock',
        title: 'Notre histoire',
        body: "Tout a commencé avec une conviction simple : le design doit servir les gens, pas l'inverse. En 2020, trois amis — un designer, un développeur et un stratège — ont décidé de créer le studio qu'ils auraient voulu trouver.\n\nAujourd'hui, nous avons accompagné plus de 40 clients dans leur transformation digitale, des startups en pleine croissance aux entreprises établies qui cherchent à se réinventer.",
        imagePosition: 'right',
        image: imgRef(aboutImg, 'Notre studio'),
      },
      {
        _key: 'textblock-valeurs',
        _type: 'textBlock',
        title: 'Nos valeurs',
        body: "Transparence, exigence et bienveillance sont les trois piliers de notre façon de travailler. Nous croyons que les meilleures collaborations naissent d'une relation de confiance mutuelle.\n\nChaque projet est unique. Nous n'appliquons pas de formule toute faite — nous prenons le temps de comprendre vos besoins spécifiques pour vous proposer les solutions les plus adaptées.",
        imagePosition: 'left',
        image: imgRef(valuesImg, 'Nos valeurs'),
      },
      {
        _key: 'team-about',
        _type: 'teamGrid',
        sectionTitle: "L'équipe",
        members: [
          { _key: 'member-1', name: 'Sophie Martin', role: 'Directrice Créative', photo: imgRef(team1, 'Sophie Martin') },
          { _key: 'member-2', name: 'Thomas Durand', role: 'Développeur Lead', photo: imgRef(team2, 'Thomas Durand') },
          { _key: 'member-3', name: 'Camille Lefèvre', role: 'Stratège Digitale', photo: imgRef(team3, 'Camille Lefèvre') },
        ],
      },
    ],
  })
  console.log('✅ Page À propos')

  // ─── Page Services ───────────────────────────────────────────────────────
  await client.createOrReplace({
    _id: 'page-services',
    _type: 'page',
    title: 'Services — Ce que nous proposons',
    description: 'Design, développement et stratégie digitale pour faire grandir votre marque.',
    slug: { _type: 'slug', current: 'services' },
    blocks: [
      {
        _key: 'hero-services',
        _type: 'hero',
        title: 'Nos services',
        subtitle: 'Des solutions sur-mesure pour chaque étape de votre projet digital.',
        variant: 'dark',
      },
      {
        _key: 'cardgrid-services',
        _type: 'cardGrid',
        sectionTitle: 'Ce que nous proposons',
        cards: [
          { _key: 'svc-1', title: 'Design UI/UX', description: 'Recherche utilisateur, wireframes, prototypes interactifs et design system. Nous créons des interfaces qui convertissent.', ctaLabel: 'Nous contacter', ctaHref: '/contact' },
          { _key: 'svc-2', title: 'Développement Web', description: 'Sites vitrine, applications web, e-commerce. Stack moderne (Next.js, React) pour des performances optimales.', ctaLabel: 'Nous contacter', ctaHref: '/contact' },
          { _key: 'svc-3', title: 'Identité Visuelle', description: 'Logo, charte graphique, déclinaisons print et digitales. Une identité forte et cohérente sur tous vos supports.', ctaLabel: 'Nous contacter', ctaHref: '/contact' },
          { _key: 'svc-4', title: 'Stratégie Digitale', description: 'Audit, recommandations, roadmap. Nous vous aidons à définir la stratégie la plus efficace pour atteindre vos objectifs.', ctaLabel: 'Nous contacter', ctaHref: '/contact' },
        ],
      },
      {
        _key: 'cta-services',
        _type: 'ctaBanner',
        title: 'Un projet en tête ? Parlons-en.',
        ctaLabel: 'Prendre contact',
        ctaHref: '/contact',
      },
    ],
  })
  console.log('✅ Page Services')

  console.log('\n🎉 Seeding terminé ! Rafraîchis localhost:3000 pour voir le résultat.')
}

main().catch((err) => {
  console.error('❌ Erreur :', err.message)
  process.exit(1)
})
