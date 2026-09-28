# Dentacare Aruba — website (draft)

> **Draft, not a live clinic website.** No Aruba clinic details have been
> confirmed yet. The site is `noindex` everywhere and has no contact actions.
> See [docs/ARUBA-LAUNCH-CHECKLIST.md](docs/ARUBA-LAUNCH-CHECKLIST.md) for
> everything needed before launch.

Built with Next.js 15 (App Router), React 19, Tailwind CSS 4, Framer Motion and
Lenis. Structure, responsive layout, navigation, animations and reusable
components come from the Dentacare Osdorp website
(`ricardoluisbula/dentacare-osdorp`, `master` @ `6c5a1f7`), rebranded to
champagne gold (`#C6A664`) on ivory with dark typography.

## What differs from the Osdorp site

- **Brand**: new vector wordmark "Dentacare / ARUBA" (`src/components/layout/Logo.tsx`,
  sources in `assets-source/`); green/sage/olive palette replaced by gold and
  espresso tokens in `src/app/globals.css`; favicons and OG image regenerated
  with `node assets-source/generate-brand-assets.mjs`.
- **No Amsterdam facts**: address, phone, WhatsApp, email, hours, prices,
  reviews, patient cases, team, legal text and treatment content were removed.
  Inner pages render `DraftPage` placeholders listing the information needed.
- **No contact actions**: no `tel:`, `mailto:`, WhatsApp, maps or Instagram
  links; no contact form or `/api/contact` route; no floating WhatsApp button.
- **Removed Osdorp-only features**: MondCheck, emergency-repair and treatment
  detail pages, Dutch legal pages (terms, complaints, disclaimer).
- **English only** for now; the i18n routing is kept so languages can be added.
- **Draft guards**: `SITE_IS_DRAFT` in `src/lib/site.ts` drives `noindex`
  metadata, an `X-Robots-Tag` header, a disallow-all `robots.txt` and an empty
  sitemap. `src/lib/draft.test.ts` and `e2e/draft.spec.ts` fail if Amsterdam
  details or contact links reappear.

## Development

```bash
npm ci
npm run dev          # http://localhost:3000
npx tsc --noEmit     # type check
npm run lint
npm test             # unit tests (vitest)
npm run build
npm run test:e2e     # draft guards + review screenshots (needs `npm run build`)
```

`npm run test:e2e` writes desktop/mobile screenshots to `playwright-screenshots/`
(git-ignored).
