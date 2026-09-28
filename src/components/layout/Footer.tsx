"use client";

import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { ANALYTICS_CONFIGURED, openCookieSettings } from "@/lib/analytics";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { navLabel } from "@/lib/navKeys";
import { NEW_PATIENTS_PATH } from "@/lib/redirects";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

const LINK_CLASS =
  "-mx-1 rounded-sm px-1 transition-colors duration-200 hover:text-accent-deep dark:hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Footer() {
  const { t } = useTranslation();

  // ARUBA DRAFT: the "Visit" column keeps the reference site's layout, but
  // every value is a plain-text "to be confirmed" placeholder -- no link, no
  // tel:/mailto:, no map -- so nothing here can reach the Amsterdam clinic.
  // Replace each with the practice's confirmed detail (from siteConfig) once
  // supplied; see docs/ARUBA-LAUNCH-CHECKLIST.md.
  const visitRows = [
    { icon: MapPin, label: t.footer.addressLabel },
    { icon: Phone, label: t.footer.phoneLabel },
    { icon: Mail, label: t.footer.emailLabel },
    { icon: Clock, label: t.footer.hoursLabel },
  ];

  return (
    <footer className="relative mt-32 border-t border-surface-border bg-bg-elevated">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center self-start">
            <Logo className="h-10 w-auto" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">{t.footer.description}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fg">{t.footer.exploreHeading}</h3>
          <ul className="flex flex-col gap-3 text-sm text-fg-muted">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={LINK_CLASS}>
                  {navLabel(t, item.href)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={NEW_PATIENTS_PATH} className={LINK_CLASS}>
                {t.footer.newPatientsLink}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fg">{t.footer.visitHeading}</h3>
          <ul className="flex flex-col gap-3.5 text-sm text-fg-muted">
            {visitRows.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  <span className="block text-fg">{label}</span>
                  <span className="block italic">{t.draft.pending}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-surface-border py-6">
        <Container className="flex flex-col items-center gap-4">
          <nav aria-label={t.footer.legalNavLabel} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-fg-muted">
            <Link href="/privacy" className={LINK_CLASS}>
              {t.footer.privacyPolicyLink}
            </Link>
            <Link href="/cookies" className={LINK_CLASS}>
              {t.footer.cookiePolicyLink}
            </Link>
            <Link href="/pricing-info" className={LINK_CLASS}>
              {t.footer.pricingInfoLink}
            </Link>
            {/* Reopens the consent banner so the analytics choice can be changed
                or withdrawn at any time. Only present when the build has GA
                configured -- without it there is nothing to consent to. */}
            {ANALYTICS_CONFIGURED && (
              <button type="button" onClick={openCookieSettings} className={LINK_CLASS}>
                {t.common.cookieSettings}
              </button>
            )}
          </nav>

          <div className="flex w-full flex-col items-center justify-between gap-3 text-center text-xs text-fg-muted sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rightsReserved}
            </p>
            <p className="font-medium text-accent-deep dark:text-accent">{t.draft.notice}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
