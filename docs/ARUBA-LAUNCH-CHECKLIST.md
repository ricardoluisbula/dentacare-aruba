# Dentacare Aruba — information needed before launch

This site is a **draft**. It was built from the Dentacare Osdorp (Amsterdam)
website's code and design, but **none of the Amsterdam practice's facts were
carried over**: no address, phone, WhatsApp, email, opening hours, prices,
reviews, before-and-after cases, team, credentials, treatment claims, legal
text or "since 2009". Every place that needs Aruba information shows a
"To be confirmed" placeholder instead.

The site stays `noindex` (meta tag, `X-Robots-Tag` header, `robots.txt`
disallow, empty sitemap) until `SITE_IS_DRAFT` in `src/lib/site.ts` is set to
`false`. Only do that once everything below is confirmed.

## 1. Clinic identity and contact

- [ ] Official practice name (is it exactly "Dentacare Aruba"?) and legal entity name
- [ ] Street address, district and a Google Maps link
- [ ] Clinic phone number, and whether it takes calls, WhatsApp or both
- [ ] WhatsApp number (if different)
- [ ] Clinic email address
- [ ] Opening hours, including public holidays and emergency arrangements
- [ ] How appointments are booked (phone, WhatsApp, online form, booking system)
- [ ] Inbox that should receive website contact-form messages (the form and `/api/contact` route were removed from the draft)
- [ ] Social media profiles (Instagram, Facebook, …) and Google Business Profile link, if any

## 2. Content, page by page

| Page | What we need |
| --- | --- |
| Home | Headline/tagline you want (draft uses "Artistry in every smile"), a short introduction |
| About | The Aruba practice's story in your own words; when it opened or will open |
| Treatments | The confirmed list of treatments offered in Aruba, a short description of each, and whether emergency care is offered |
| Prevention & Hygiene | Check-up and hygiene services offered; recommended check-up intervals |
| Our Team | Name, role and biography for each team member; qualifications and registrations exactly as they appear officially |
| Smile Gallery | Before-and-after cases from **Aruba** patients, the treatment for each, and each patient's written consent |
| Reviews | Genuine reviews from Aruba patients (with permission) and their source |
| New Patients | Whether new patients are accepted; how to register; what to bring; accepted insurers |
| Fees & Insurance | Whether fees are published at all; accepted insurance and payment methods |
| Privacy / Cookies | Policies reviewed for Aruba law; contact for privacy questions; whether analytics will be used |

## 3. Images

- [ ] Hero photograph for the home page (landscape, at least 1672×941 px) — the Osdorp hero photo was **not** reused because it shows the Amsterdam clinic's signage
- [ ] Photos of the Aruba clinic: exterior, reception/waiting area, treatment room
- [ ] Professional portrait of each team member
- [ ] Before-and-after photo pairs (with consent), if a Smile Gallery is wanted
- [ ] Approval of the new gold wordmark and icon (`assets-source/logo-dentacare-aruba.svg`, `assets-source/icon-dentacare-aruba.svg`), or an official Aruba logo file (SVG preferred)

## 4. Decisions

- [ ] **Languages**: the draft is English only. Which languages should the site offer (e.g. Papiamento, Dutch, Spanish, English)? Who will supply or approve translations?
- [ ] **Domain**: the production domain (the code uses the placeholder `dentacare-aruba.invalid`)
- [ ] **Hosting**: which Vercel project/team deploys this repository
- [ ] **Analytics**: whether to use Google Analytics (requires consent banner, already built in)
- [ ] Should the reference site's MondCheck (online dental self-check) or emergency-repair pages have Aruba equivalents? Both were removed as Amsterdam-specific

## 5. Launch steps (after the above is supplied)

1. Add the confirmed details to `src/lib/site.ts` and restore the footer/contact links.
2. Replace each `<DraftPage>` with the real page content; restore the home sections.
3. Set `PRODUCTION_URL` in `src/lib/site.ts` and add the canonical-host redirect in `src/middleware.ts`.
4. Add `LocalBusiness`/`Dentist` JSON-LD with the confirmed details.
5. Set `SITE_IS_DRAFT = false`, add indexable routes to `src/app/sitemap.ts`, update `src/lib/draft.test.ts`.
6. `npm run lint && npx tsc --noEmit && npm test && npm run build && npm run test:e2e`.
