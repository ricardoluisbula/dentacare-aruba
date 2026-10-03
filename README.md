# Dentacare Aruba — website (draft)

> **Draft, not a live clinic website.** The site is `noindex` everywhere and
> shows only confirmed details (address, WhatsApp for messages, Instagram, the
> dentist, treatments). See
> [docs/ARUBA-LAUNCH-CHECKLIST.md](docs/ARUBA-LAUNCH-CHECKLIST.md) for what is
> still needed, and [docs/ARUBA-DATES.md](docs/ARUBA-DATES.md) for the private
> editor where the team enters the dates the dentist works in Aruba (`/admin`).

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
- **No Amsterdam practice facts**: its address, phones, email, hours, prices,
  reviews and legal text are not used. Treatment explanations are reused
  without Amsterdam wording or prices. The Smile Gallery and the home,
  treatments, emergency, prevention and team pages reuse photos from the
  Osdorp site — Sam Abdin's portrait, a professional-cleaning photo and
  before-and-after cases treated by Sam Abdin — without any claim that the
  cases were treated in Aruba; photos of the Amsterdam premises or with an
  Osdorp watermark are not used (`src/lib/images.test.ts`). Pages still
  waiting on content render `DraftPage` placeholders listing what is needed.
- **Contact**: WhatsApp *message* link to the Aruba number (never `tel:`),
  Morgenster 35C map link, Instagram. No phone, email or contact form yet.
- **Dates in Aruba**: no fixed hours; the team enters dates in `/admin`
  (password from environment variables, dates in Upstash Redis or a local file).
- **Removed Osdorp-only features**: MondCheck, Dutch legal pages (terms,
  complaints, disclaimer).
- **Languages**: English (default), Dutch (`/nl`), Spanish (`/es`) and Aruba Papiamento (`/pap`). UI text in `src/lib/i18n/dictionaries/`, page content in `src/content/<locale>/`; translations are machine-assisted and listed for review in `docs/translations/`.
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
