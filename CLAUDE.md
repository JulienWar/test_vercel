# CLAUDE.md — Site Vitrine

Ce fichier est lu automatiquement par Claude Code. Il documente le projet pour que des DAs puissent intervenir sans briefing.

## Stack

- **Next.js 14** App Router — pas de Pages Router
- **TypeScript** partout
- **Tailwind CSS** avec tokens CSS Figma (`styles/tokens.css`)
- **GSAP** pour les animations — voir `lib/gsap/`
- **Sanity v3** pour le CMS — voir `sanity/`
- **Resend** pour les emails de contact
- **Vercel** pour le déploiement

## Tokens Figma

Tous les tokens sont dans `styles/tokens.css` — variables CSS `--sds-*`.
Tailwind les utilise via `tailwind.config.ts`. Ne JAMAIS hardcoder des couleurs ou tailles — toujours utiliser les tokens ou les classes Tailwind correspondantes.

Pour ajouter un token : l'ajouter dans `styles/tokens.css`, puis dans `tailwind.config.ts`.

## Composants

- `components/ui/` — Button, Card, Icon, Cursor — atomiques, réutilisables
- `components/sections/` — Hero, CardGrid, TextBlock, CtaBanner, TeamGrid, ContactInfo — blocs de page
- `components/layout/` — Nav, Footer
- `components/BlockRenderer.tsx` — mappe les blocs Sanity vers les composants React

## Ajouter un nouveau bloc de contenu

1. Créer le schéma dans `sanity/schemas/blocks/monBloc.ts`
2. L'ajouter dans `sanity/schemas/index.ts`
3. L'ajouter dans le champ `blocks` de `sanity/schemas/documents/page.ts`
4. Créer le composant dans `components/sections/MonBloc.tsx`
5. L'ajouter dans `components/BlockRenderer.tsx`

## Modifier une animation GSAP

- Animations de base : `lib/gsap/animations.ts`
- ScrollTrigger par section : `lib/gsap/scrollTriggers.ts`
- Séquence Hero (1 fois par session) : `lib/gsap/heroTimeline.ts`
- Les composants utilisent `useGSAP()` de `@gsap/react` + `gsap.context().revert()` au démontage
- Ne pas toucher aux `data-gsap="..."` dans le HTML — ils sont ciblés par GSAP

## Commandes

```bash
npm run dev        # Démarrer en local (http://localhost:3000)
npm run build      # Build de production
npm run lint       # Linter ESLint
npx jest           # Tests unitaires
npx playwright test # Tests E2E (nécessite npm run dev en parallèle)
npx sanity dev     # Démarrer Sanity Studio en local
```

## Variables d'environnement

Copier `.env.example` en `.env.local` et remplir les valeurs.
Ne JAMAIS commiter `.env.local`.

## Déploiement

Chaque push sur `main` déclenche un déploiement automatique sur Vercel.
Les branches créent des URLs de preview.
Sanity publie → webhook → Vercel regénère la page (ISR, ~30s).
