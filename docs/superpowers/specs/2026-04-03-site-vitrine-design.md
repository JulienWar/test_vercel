# Spec — Site vitrine animé avec CMS

**Date :** 2026-04-03
**Stack retenue :** Next.js 14 (App Router) · Tailwind CSS · GSAP · Sanity v3
**Figma :** `A4JtPsWMATxSVnAlKoUZMz` — Simple Design System
**GitHub :** `JulienWar/test_vercel`
**Déploiement :** Vercel

---

## 1. Contexte & objectif

Site vitrine multi-pages (4 pages) dont le contenu est entièrement géré via Sanity Studio (CMS headless). Le code est hébergé sur GitHub et déployé automatiquement sur Vercel. Des collègues DA peuvent modifier le site via Claude Code sans intervention du designer original — un `CLAUDE.md` à la racine documente le projet pour faciliter cela.

---

## 2. Architecture du projet

```
test_vercel/
├── CLAUDE.md                   # Contexte projet pour Claude Code (DAs)
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Layout global (nav + footer)
│   ├── page.tsx                # Home
│   ├── a-propos/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── ui/                     # Composants atomiques
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Icon.tsx
│   ├── sections/               # Blocs de page
│   │   ├── Hero.tsx
│   │   ├── CardGrid.tsx
│   │   ├── TextBlock.tsx
│   │   ├── CtaBanner.tsx
│   │   ├── TeamGrid.tsx
│   │   └── ContactInfo.tsx
│   └── layout/
│       ├── Nav.tsx
│       └── Footer.tsx
├── lib/
│   ├── sanity.ts               # Client Sanity + queries GROQ
│   └── gsap/
│       ├── animations.ts       # Fonctions réutilisables (fadeIn, stagger, reveal)
│       ├── scrollTriggers.ts   # Configs ScrollTrigger par section
│       └── heroTimeline.ts     # Timeline séquencée du Hero
├── sanity/
│   └── schemas/
│       ├── documents/
│       │   ├── page.ts
│       │   └── siteSettings.ts
│       └── blocks/
│           ├── hero.ts
│           ├── textBlock.ts
│           ├── cardGrid.ts
│           ├── ctaBanner.ts
│           ├── teamGrid.ts
│           └── contactInfo.ts
├── styles/
│   └── tokens.css              # Variables CSS issues du Figma
├── public/
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-04-03-site-vitrine-design.md
```

**Flux de données :** Sanity → `fetch` Next.js (ISR) → pages regénérées automatiquement via webhook Vercel (~30s après publication dans Studio).

---

## 3. Pages & contenu CMS

### Home
- `Hero` — titre principal, sous-titre, CTA (texte bouton + URL), image/visuel
- `CardGrid` — titre de section, grille 3-4 cards (icône, titre, description courte)
- `TextBlock` — titre + texte riche + image optionnelle (aperçu "À propos")
- `CtaBanner` — titre accrocheur + texte bouton + URL

### À propos
- `Hero` (variante sans image) — titre + chapeau, fond sombre brand
- `TextBlock` × n — blocs répétables (histoire, valeurs, mission) avec image optionnelle
- `TeamGrid` — optionnel : grille profils (photo, nom, rôle)

### Services
- `Hero` (variante sans image) — titre + chapeau, fond sombre brand
- `CardGrid` — cards répétables (titre, description, icône, lien optionnel)

### Contact
- Formulaire statique : nom, email, message — soumission via API Route Next.js → envoi email via **Resend** (service d'envoi transactionnel, tier gratuit 3000 emails/mois)
- `ContactInfo` — email, téléphone, adresse (éditables dans Sanity)

### Paramètres globaux (`siteSettings`)
- Logo, nom du site
- Liens de navigation
- Liens footer + mentions légales

**Nommage des champs Sanity :** tous les labels sont en français, lisibles par des non-techniques ("Titre principal", "Image de couverture", "Texte du bouton", etc.).

---

## 4. Design tokens — Figma → Code

Tous les tokens viennent directement du design system Figma (SDS). Aucune valeur inventée.

### `styles/tokens.css`

```css
:root {
  /* Couleurs — Background */
  --sds-color-background-default-default: #ffffff;
  --sds-color-background-brand-default: #2c2c2c;

  /* Couleurs — Text */
  --sds-color-text-default-default: #1e1e1e;
  --sds-color-text-default-secondary: #757575;
  --sds-color-text-brand-on-brand: #f5f5f5;

  /* Couleurs — Border */
  --sds-color-border-default-default: #d9d9d9;
  --sds-color-border-brand-default: #2c2c2c;
  --sds-color-border-neutral-secondary: #767676;

  /* Typographie */
  --sds-typography-title-hero-font-family: 'Inter', sans-serif;
  --sds-typography-title-hero-font-weight: 700;
  --sds-typography-title-hero-size: 72px;

  --sds-typography-title-page-font-family: 'Inter', sans-serif;
  --sds-typography-title-page-font-weight: 700;
  --sds-typography-title-page-size-base: 48px;

  --sds-typography-heading-font-family: 'Inter', sans-serif;
  --sds-typography-heading-font-weight: 600;
  --sds-typography-heading-size-base: 24px;

  --sds-typography-subheading-font-family: 'Inter', sans-serif;
  --sds-typography-subheading-font-weight: 400;
  --sds-typography-subheading-size-medium: 20px;

  --sds-typography-body-font-family: 'Inter', sans-serif;
  --sds-typography-body-font-weight-regular: 400;
  --sds-typography-body-font-weight-bold: 700;
  --sds-typography-body-size-medium: 16px;
  --sds-typography-body-size-small: 14px;

  /* Espacements */
  --sds-size-space-100: 4px;
  --sds-size-space-200: 8px;
  --sds-size-space-300: 12px;
  --sds-size-space-400: 16px;
  --sds-size-space-600: 24px;
  --sds-size-space-800: 32px;
  --sds-size-space-1200: 48px;

  /* Rayons */
  --sds-size-radius-100: 4px;
  --sds-size-radius-200: 8px;
  --sds-size-radius-400: 16px;
  --sds-size-radius-full: 9999px;

  /* Bordures */
  --sds-size-stroke-border: 1px;

  /* Ombres */
  --sds-size-depth-0: 0px;
  --sds-size-depth-025: 1px;
  --sds-size-depth-100: 4px;
  --sds-color-black-100: rgba(12, 12, 13, 0.05);
  --sds-color-black-200: rgba(12, 12, 13, 0.10);
}
```

### `tailwind.config.ts` (extrait)

```ts
theme: {
  extend: {
    colors: {
      brand: 'var(--sds-color-background-brand-default)',
      'on-brand': 'var(--sds-color-text-brand-on-brand)',
      'text-primary': 'var(--sds-color-text-default-default)',
      'text-secondary': 'var(--sds-color-text-default-secondary)',
      'border-default': 'var(--sds-color-border-default-default)',
    },
    borderRadius: {
      sm: 'var(--sds-size-radius-100)',
      md: 'var(--sds-size-radius-200)',
      lg: 'var(--sds-size-radius-400)',
      full: 'var(--sds-size-radius-full)',
    },
    spacing: {
      'space-1': 'var(--sds-size-space-100)',
      'space-2': 'var(--sds-size-space-200)',
      'space-3': 'var(--sds-size-space-300)',
      'space-4': 'var(--sds-size-space-400)',
      'space-6': 'var(--sds-size-space-600)',
      'space-8': 'var(--sds-size-space-800)',
      'space-12': 'var(--sds-size-space-1200)',
    },
  },
}
```

### Composants UI clés

**Button (primary)**
- Fond : `--sds-color-background-brand-default` (#2c2c2c)
- Texte : `--sds-color-text-brand-on-brand` (#f5f5f5)
- Border : 1px `--sds-color-border-brand-default`
- Padding : 12px (`space-300`)
- Gap icône/texte : 8px (`space-200`)
- Radius : 8px (`radius-200`)

**Card**
- Fond : blanc
- Border : 1px `#d9d9d9`
- Radius : 16px (`radius-400`)
- Padding : 24px (`space-600`)
- Ombre : `Drop Shadow/200` = `0 1px 4px rgba(12,12,13,0.10), 0 1px 4px rgba(12,12,13,0.05)`

---

## 5. Stratégie d'animation GSAP

### Couche 1 — Transitions de navigation
- Wipe horizontal ou fondu croisé entre routes Next.js
- Nav : transparent → fond blanc flouté au scroll

### Couche 2 — ScrollTrigger (animations au scroll)
- Titres : slide-up depuis le bas (`y: 40 → 0`, `opacity: 0 → 1`)
- Cards : apparition en stagger (délai 0.1s entre chaque)
- Images : révélation par masque clip-path
- Sections pin avec texte défilant

### Couche 3 — Micro-interactions
- Boutons : scale 1.02 + transition couleur au hover
- Cards : `translateY(-4px)` + ombre renforcée au hover
- Liens nav : underline animé au hover

### Couche 4 — Séquence Hero (signature, 1 fois/session)
1. Fond s'assombrit vers `#2c2c2c`
2. Titre apparaît lettre par lettre (SplitText)
3. Éléments secondaires glissent en séquence
4. Page s'ouvre sur le contenu

### Couche 5 — Effets avancés
- Formes SVG morphing en background des sections (MorphSVG)
- Parallaxe images au scroll
- Curseur personnalisé avec lag effect

### Architecture GSAP
```
lib/gsap/
├── animations.ts      # fadeIn(), staggerReveal(), maskReveal()
├── scrollTriggers.ts  # configs par section (hero, services, about...)
└── heroTimeline.ts    # timeline séquencée de la page d'accueil
```
Chaque animation est nettoyée (`gsap.context().revert()`) au démontage du composant.

---

## 6. Sanity Studio — Expérience éditeur

**Non-techniques (clients)** : champs simples, labels en français, indications de format image, pas d'options avancées visibles.

**Intermédiaires (consultants)** : drag & drop des blocs, activation/désactivation de sections, choix de variantes de mise en page.

**URL Studio :** `ton-projet.sanity.studio` (navigateur uniquement, aucune installation).

---

## 7. Déploiement

```
GitHub (main) → Vercel (production automatique)
GitHub (branches) → Vercel (URLs de preview)
Sanity webhook → Vercel ISR (~30s de délai de publication)
```

**Variables d'environnement Vercel :**
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN
SANITY_WEBHOOK_SECRET
```

**Tier gratuits au départ :** Vercel Hobby · Sanity Free (3 users, 10K docs) · GitHub

**Performance visée :** Lighthouse 90+ sur Performance, Accessibilité, SEO.

---

## 8. Collaboration DA via Claude Code

Un fichier `CLAUDE.md` est créé à la racine du repo. Il contient :
- La stack et la logique du projet
- Comment les tokens Figma sont organisés dans `styles/tokens.css`
- Où trouver les composants et sections
- Comment ajouter un bloc Sanity
- Comment modifier une animation GSAP sans casser les autres
- Les commandes de dev (`npm run dev`, `npm run build`)

Cela permet à n'importe quel DA équipé de Claude Code de prendre en main le projet sans briefing préalable.

---

## 9. Ce qui est hors scope

- Authentification utilisateur
- E-commerce / paiement
- Blog/actualités avec pagination
- Multi-langue
- Analytics (peut être ajouté après)
