# Dentacare Aruba — launch checklist

The site is built from the Dentacare Osdorp (Amsterdam) website's code and
design and shows only details the practice has confirmed. Visible draft
labels, "(Draft)" page titles and placeholder rows have been removed;
unconfirmed details are simply not shown.

**The site stays out of search engines** (`noindex` meta tag, `X-Robots-Tag`
header, `robots.txt` disallow, empty sitemap) until `SITE_IS_DRAFT` in
`src/lib/site.ts` is set to `false`. Only do that once the domain and the
launch content below are ready. **Analytics stays disabled**
(`NEXT_PUBLIC_GA_MEASUREMENT_ID` unset); the policies say so.

## Confirmed and live in the site

- [x] Practice name: **Dentacare Aruba**
- [x] Address: Morgenster 35C, Aruba (with a Google Maps search link)
- [x] WhatsApp for messages: +31 6 45094057 (`https://wa.me/31645094057`, never a call link) — the only booking channel
- [x] Privacy contact: **Dentacare@hotmail.com** — shown only on the Privacy and Cookie policy pages, for privacy questions; never as a booking or general contact (enforced by tests)
- [x] Instagram: the shared Dentacare profile (instagram.com/Dentacareosdorp)
- [x] Dentist: Sam Abdin — education (University of Groningen) and "practising dentistry in Amsterdam since 2009" (his own experience, not the Aruba practice's)
- [x] Treatments: the same treatments as Dentacare Osdorp, explanations reused without Amsterdam wording or prices; "Composite Restorations" renamed "Composite Veneers"
- [x] No fixed opening hours: dates are entered in the private editor (see [ARUBA-DATES.md](ARUBA-DATES.md))
- [x] Photos reused from the Dentacare Osdorp website (Smile Gallery, home page, treatments, emergency and prevention pages, Our Team) — **approved for the Aruba website** (confirmed 2026-10-02). The site says the cases were treated by Sam Abdin and never that they were treated in Aruba. Photos showing the Amsterdam premises or signage, or carrying an Osdorp watermark, were not copied (see `src/lib/images.test.ts`).
- [x] Home page hero: a finished gold illustration (sun, sea, Dentacare tooth mark, address label); an Aruba clinic photo can replace it later without layout changes
- [x] Domain: **no custom domain yet**. The site keeps `noindex`; on Vercel Production its canonical URL is the project's `*.vercel.app` production URL (`VERCEL_PROJECT_PRODUCTION_URL`) until a domain is chosen.

## Dates editor (`/admin`)

- [x] Upstash Redis connected for **Production** and **Preview**
- [x] Preview: admin sign-in and date publishing tested and working
- [x] Production: `ADMIN_PASSWORD` and a fresh `ADMIN_SESSION_SECRET` saved
- [ ] **Production sign-in not yet tested** — after the Production deployment, sign in at `/admin`, publish (or confirm) the first dates, and check they appear on Home and Contact

## 1. Privacy and Cookie policies — drafted, review needed

Both pages (`/privacy`, `/cookies`, linked from the footer) now contain policy
text written from the site's actual behaviour (`src/data/policies.ts`). They
make no compliance claims and state no retention periods, registration
details or legal rights. Where a fact is missing, the clause is **left out**
and marked `REVIEW:` in `src/data/policies.ts`. `src/lib/policies.test.ts`
checks the text still matches the code.

Facts to supply or confirm before launch:

- [ ] **Legal entity**: legal form and any registration number of Dentacare Aruba (e.g. Chamber of Commerce) — omitted
- [ ] **Retention**: how long the practice keeps WhatsApp conversations and appointment details; how patient records are kept and who has access — omitted
- [ ] **Hosting logs**: how long Vercel keeps request logs on the project's plan — omitted
- [ ] **Processing locations**: the regions of the Vercel functions and the Upstash database, and any safeguards for processing outside Aruba — the policy only says they "may process information on servers outside Aruba"
- [ ] **Rights and complaints (legal review)**: which rights apply under Aruba's data protection rules, response times, and where a complaint can be made — the policy only says people can email to ask for access, correction or deletion
- [ ] **Photo consent wording**: confirm "published with the consent of the patients concerned" matches the approval obtained for each reused photo
- [ ] **Live-domain cookies**: confirm no hosting-platform cookies are set on the Production site (e.g. if Vercel Deployment Protection or the Vercel Toolbar is enabled for Production) — the policy only says the application's own code stores nothing else; hosting-platform behaviour is unverified
- [ ] **Effective date**: add once the policies are approved
- [ ] Legal review of both texts for Aruba

If analytics is ever enabled, update both policies first (consent banner,
`_ga`/`_ga_*` cookies, `dentacare-analytics-consent` setting).

## 2. Still needed: contact and setup

- [ ] Phone number for calls (if any) — the row is hidden until supplied
- [ ] Public contact email (if any) — the row is hidden; the privacy address is not used for bookings
- [ ] Confirm the Google Maps search for "Morgenster 35C, Aruba" lands on the clinic; if not, supply the clinic's own Maps link
- [ ] Contact-form inbox, if a contact form is wanted (removed from the site)

## 3. Still needed: content (pages exist but are not linked anywhere)

| Page | What we need before linking it again |
| --- | --- |
| About | The Aruba practice's story in your own words; photos of the Aruba clinic |
| Reviews | Genuine reviews from Aruba patients (with permission) and their source; the Google Business Profile link, if any |
| New Patients | Whether new patients are accepted; how to register; what to bring; accepted insurers |
| Fees & Insurance | Whether fees are published at all, and the Aruba fees if so (Osdorp prices were not copied); accepted insurance and payment methods |

These pages show a short "being prepared" note if someone opens their URL
directly. Link them again (`siteConfig.nav` in `src/lib/site.ts`, footer) once
their content is in.

## 4. Practice sign-off

- [ ] **Translation review**: the Dutch, Spanish and Papiamento texts are machine-assisted and **not professionally verified**. Each needs review by a fluent speaker -- for Papiamento, a fluent **Aruba** speaker -- with priority on clinical and policy wording: [docs/translations/REVIEW-nl.md](translations/REVIEW-nl.md), [REVIEW-es.md](translations/REVIEW-es.md), [REVIEW-pap.md](translations/REVIEW-pap.md). Papiamento day and month names for the dates are set in `src/lib/availability/dates.ts` and also need confirming.

- [ ] Clinical wording marked `ARUBA DRAFT` in the code, especially the emergency safety note, the rewritten emergency FAQs and the gallery wording
- [ ] Our Team: the title to use ("Sam Abdin, Dentist" — not "Dr."), any further verified credentials, a biography, other team members
- [ ] Approve the gold wordmark and icon (`assets-source/`), or supply an official logo

## 5. Decisions

- [ ] **Domain**: choose a custom domain (the code uses the placeholder `dentacare-aruba.invalid` outside Vercel)
- [x] **Languages**: English (default, unprefixed URLs), Dutch (`/nl`), Spanish (`/es`) and Aruba Papiamento (`/pap`), with a language selector on every page
- [x] **Analytics**: disabled for now

## 6. Optional improvements

- Photos for the Composite Veneers and Dental Implants cards (currently gold icon panels)
- Aruba clinic photographs (hero, About page)
- `Dentist` structured data for search results, once the details are final
- HSTS `preload` once the domain is settled

## 7. Launch steps (after the above is supplied)

1. Complete the policy facts above and add the effective date.
2. Add phone/email (if any) to `src/lib/site.ts` and the Contact page/footer.
3. Replace the remaining `<DraftPage>` pages (About, Reviews, New Patients, Fees & Insurance) with real content and link them again.
4. Choose the domain: set `PRODUCTION_URL` in `src/lib/site.ts` (or `NEXT_PUBLIC_SITE_URL` for Production) and add the canonical-host redirect in `src/middleware.ts`.
5. Add `Dentist` JSON-LD with the confirmed details.
6. Set `SITE_IS_DRAFT = false`, add indexable routes to `src/app/sitemap.ts`, update `src/lib/draft.test.ts` and `src/lib/launchPrep.test.ts`.
7. `npm run lint && npx tsc --noEmit && npm test && npm run build && npm run test:e2e`.
8. Test Production sign-in at `/admin` and publish the first dates.
