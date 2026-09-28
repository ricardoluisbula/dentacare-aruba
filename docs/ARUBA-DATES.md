# Dates in Aruba — how to sign in and update them

The Aruba practice has no fixed weekly hours. The dates (and, optionally, the
hours) when the dentist works in Aruba are entered in a small private editor.
The Home and Contact pages then show the next confirmed dates, in Aruba time,
next to the WhatsApp link for appointment enquiries.

- No future dates → the website says **"Upcoming dates will be announced"**.
- A date without hours → shown as the date with **"Hours to be confirmed"**.
  Hours are never guessed.
- Past dates disappear from the website automatically (by Aruba's date).
- Every WhatsApp link carries the note that a message is an enquiry, not a
  booking — an appointment is only confirmed when the practice replies.

## Signing in

1. Go to **`https://<your-site>/admin`** (for example
   `https://dentacare-aruba.vercel.app/admin` once deployed). It is not linked
   from the website and is never indexed.
2. Enter the shared team password (`ADMIN_PASSWORD`, see below).
3. You stay signed in for 8 hours on that device, then sign in again.
   **Sign out** when using a shared computer.

At most 5 sign-in attempts per connection per 15 minutes; a correct password
resets the count. On the live website the count is kept in the shared
database, so it holds across every server; if the database cannot be reached,
sign-in is refused rather than allowed without the limit.

## Adding, editing and removing dates

- **Add dates**: choose the first date; for a run of days with the same hours
  also choose the last date. Enter *From* / *Until* in Aruba time, or leave
  both empty if the hours are not fixed yet. Click **Add dates**.
- **Edit**: click **Edit** on an entry, change it, **Save changes**.
- **Remove**: click **Remove** and confirm. It disappears from the website
  immediately.
- Overlapping entries are refused — edit the existing entry instead.
- If two people edit at once, the second save is refused with a message to
  reload, so nobody silently overwrites the other's change.

Changes appear on the Home and Contact pages immediately.

## One-time setup (before the editor works on the live website)

The editor needs two things on the hosting side. **Nothing is in the source
code**: no password, no secret, no database key.

### 1. The sign-in settings

In the hosting dashboard (Vercel → Project → Settings → Environment
Variables), add, for the Production and Preview environments:

| Name | Value |
| --- | --- |
| `ADMIN_PASSWORD` | A long password for the team (at least 12 characters; a passphrase of 4+ random words is ideal). Share it only with the people who update the dates. |
| `ADMIN_SESSION_SECRET` | A random string of at least 32 characters. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`. |

Then redeploy. Without both, sign-in stays switched off (there is no default
password). **On the live website, sign-in also stays switched off until the
database below is connected**, because the attempt limit must be shared by
every server. To change the password, change `ADMIN_PASSWORD` and redeploy. To
sign everyone out at once, change `ADMIN_SESSION_SECRET` and redeploy.

### 2. Somewhere to keep the dates — **your decision needed**

A website on Vercel cannot save files, so the dates need a small database.
**Nothing has been connected yet.** The smallest practical option:

**Upstash Redis, free tier, added through the Vercel Marketplace**
(Vercel → Project → Storage → Create → Upstash → Redis).

- **Cost: free.** The free tier includes 500,000 commands per month, 256 MB
  and one database. The site reads the calendar once per Home or Contact page
  view (so changes show immediately) and a few times per edit or sign-in —
  roughly 16,000 page views a day before the limit. If it were ever exceeded, the next tier is
  pay-as-you-go at $0.20 per 100,000 commands (no monthly fee). Prices from
  upstash.com/pricing/redis, checked 28 Sept 2026 — confirm on the page when
  signing up.
- It creates an Upstash account linked to your Vercel account and adds
  `KV_REST_API_URL` and `KV_REST_API_TOKEN` to the project automatically. The
  site detects them — no code change.
- The same database holds the sign-in attempt limit. Without it, sign-in on
  the live website stays switched off.

Until it is connected, the live site shows "Upcoming dates will be announced"
and the editor explains that saving is not available yet. On your own
computer (`npm run dev`), dates are saved to `.data/aruba-availability.json`
(git-ignored) so the editor can be tried out.

## For developers

- Data model, validation and display: `src/lib/availability/dates.ts`
- Storage (Redis / local file): `src/lib/availability/store.ts`
- Sign-in: `src/lib/admin/auth.ts`; editor: `src/app/admin/`
- Public display: `src/components/availability/`
- Tests: `src/lib/availability/dates.test.ts`, `src/lib/admin/auth.test.ts`,
  `e2e/dates-editor.spec.ts`
