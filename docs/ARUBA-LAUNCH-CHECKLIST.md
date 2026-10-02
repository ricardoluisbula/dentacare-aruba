# Dentacare Aruba — information needed before launch

This site is a **draft**, built from the Dentacare Osdorp (Amsterdam) website's
code and design. It shows only details the practice has confirmed; every other
place shows a "To be confirmed" placeholder.

The site stays `noindex` (meta tag, `X-Robots-Tag` header, `robots.txt`
disallow, empty sitemap) until `SITE_IS_DRAFT` in `src/lib/site.ts` is set to
`false`. Only do that once everything below is confirmed.

## Confirmed (in the draft)

- [x] Address: Morgenster 35C, Aruba (with a Google Maps search link)
- [x] WhatsApp for messages: +31 6 45094057 (`https://wa.me/31645094057`, never a call link)
- [x] Instagram: the shared Dentacare profile (instagram.com/Dentacareosdorp)
- [x] Dentist: Sam Abdin — education (University of Groningen) and "practising dentistry in Amsterdam since 2009" (his own experience, not the Aruba practice's)
- [x] Treatments: the same treatments as Dentacare Osdorp, explanations reused without Amsterdam wording or prices
- [x] No fixed opening hours: dates are entered in the private editor (see [ARUBA-DATES.md](ARUBA-DATES.md))
- [x] Photos reused from the Dentacare Osdorp website (Smile Gallery, home page, treatments, emergency and prevention pages, Our Team): the portrait of Sam Abdin, the professional-cleaning photo and before-and-after cases **treated by Sam Abdin**. The site never says these cases were treated in Aruba. Photos showing the Amsterdam premises or signage, or carrying an Osdorp watermark, were not copied (see `src/lib/images.test.ts`).

## 1. Still needed: contact and setup

- [ ] Phone number for calls (if any)
- [ ] Clinic email address
- [ ] **Dates editor setup** — decide on the free Upstash Redis database and set `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` (see [ARUBA-DATES.md](ARUBA-DATES.md))
- [ ] Confirm the Google Maps search for "Morgenster 35C, Aruba" lands on the clinic; if not, supply the clinic's own Maps link
- [ ] Official practice name and legal entity name
- [ ] Contact-form inbox, if a contact form is wanted (removed from the draft)

## 2. Still needed: content

| Page | What we need |
| --- | --- |
| Our Team | Confirm the title to use (the draft says "Sam Abdin, Dentist" — not "Dr."), any further verified credentials (registration, languages), a biography, and other team members |
| Treatments | Review the reused explanations for Aruba; confirm the new emergency safety note (marked `ARUBA DRAFT` in the code) |
| About | The Aruba practice's story in your own words |
| Smile Gallery | The gallery shows before-and-after cases from the Dentacare Osdorp website, all treated by Sam Abdin. **Confirm that each patient's consent covers publication on this second (Aruba) website** — remove any case where it does not (`src/data/beforeAfterCases.ts`). Review the new gallery wording marked `ARUBA DRAFT` (e.g. "All cases shown were treated by Sam Abdin. Results differ from person to person."). Add Aruba cases later, with consent, if wanted |
| Reviews | Genuine reviews from Aruba patients (with permission) and their source |
| New Patients | Whether new patients are accepted; how to register; what to bring; accepted insurers |
| Fees & Insurance | Whether fees are published at all, and the Aruba fees if so (Osdorp prices were not copied) |
| Privacy / Cookies | Policies reviewed for Aruba law; contact for privacy questions; whether analytics will be used |

## 3. Images

- [ ] Hero photograph for the home page (landscape, at least 1672×941 px)
- [ ] Photos of the Aruba clinic: exterior, reception/waiting area, treatment room
- [ ] Approve reusing the Osdorp portrait of Sam Abdin (now on the home page and Our Team), or supply another
- [ ] Confirm patient consent covers this second website for every reused before-and-after case (Smile Gallery, home page, treatments hub, emergency page)
- [ ] Approve reusing the professional-cleaning photo (prevention page and treatments hub)
- [ ] Composite restorations card on the treatments hub has no photo (the reference used a Porcelain Veneers result, case-10, which would misrepresent composite work); supply a composite result if wanted
- [ ] Dental implants card on the treatments hub has no photo (the reference used a photo of the Amsterdam premises' instruments); supply one if wanted
- [ ] Approval of the gold wordmark and icon (`assets-source/`), or an official Aruba logo file

## 4. Decisions

- [ ] **Languages**: the draft is English only. Which languages should the site offer?
- [ ] **Domain**: the production domain (the code uses the placeholder `dentacare-aruba.invalid`)
- [ ] **Hosting**: which Vercel project/team deploys this repository
- [ ] **Analytics**: whether to use Google Analytics (consent banner already built in)

## 5. Launch steps (after the above is supplied)

1. Add phone/email to `src/lib/site.ts` and the Contact page/footer.
2. Replace the remaining `<DraftPage>` placeholders with real content.
3. Set `PRODUCTION_URL` in `src/lib/site.ts` and add the canonical-host redirect in `src/middleware.ts`.
4. Add `Dentist` JSON-LD with the confirmed details.
5. Set `SITE_IS_DRAFT = false`, add indexable routes to `src/app/sitemap.ts`, update `src/lib/draft.test.ts`.
6. `npm run lint && npx tsc --noEmit && npm test && npm run build && npm run test:e2e`.
